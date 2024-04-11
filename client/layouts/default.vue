<template>
  <v-app>
    <section class="main">
      <div class="main-background" :style="currentBackgroundImage"></div>
      <div class="main-container" v-if="loading">
        <div class="d-flex justify-center align-center myFullScreen">
          <v-progress-circular
              color="primary darken-1"
              :size="80"
              :rotate="-90"
              :value="loaderValue"
              :indeterminate="loaderLoading"
          />
        </div>
      </div>
      <div class="main-container" v-else-if="disabledPage">
        <header-component>
          <component :is="currentHeader"></component>
        </header-component>

        <div class="d-flex myFullScreen">
          <menu-buttons v-model="profileLinks" />
          <div class="overflow-y-auto pa-2" style="width: 100%">
            <Nuxt class="pr-2" />
          </div>

          <action-dialog
              v-model="isUnknown"
              :popup="true"
              :persistent="true"
              title="Упс. Похоже Вас нет в агентствах!"
              text="Мы не нашли Вас ни в одном из наших агентств, выберите действие"
          >
            <v-btn
                @click="$router.push('/auth/agency/create')"
                :color="usableColor"
                class="mt-3"
                outlined
                block
                small
            >
              Я хочу создать агентство
            </v-btn>
            <v-btn
                @click="$router.push('/auth/agency/find')"
                :color="usableColor"
                class="mt-3"
                outlined
                block
                small
            >
              Я хочу вступить в агентство
            </v-btn>
          </action-dialog>
        </div>
      </div>
    </section>

    <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :timeout="2000"
        outlined
        text
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { TimesOfDay } from "~/assets/script/functions/timesOfDay";
import checkAuth from "~/assets/script/functions/checkAuth";
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component
export default class Default extends Vue {
  loading: boolean = true;
  loaderValue: number = 0;
  loaderLoading: boolean = true;

  snackbar: boolean = false;
  snackbarColor: string = "";
  snackbarMessage: string = "";

  profileLinks: any = [];
  currentHeader: string = "";
  isUnknown: boolean = false;

  user: any = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    agency: {
      id: 0
    }
  };


  async created() {
    if (process.client) {
      let user = JSON.parse(JSON.stringify(this.$store.state.user.user));
      let checkUser = await checkAuth(user);

      if (!checkUser) {
        return this.$router.push("/auth/login");
      }

      this.user = checkUser;
      await this.$store.dispatch("user/userValues", {
        payload: checkUser
      });

      this.checkMyAgency();

      if (!this.disabledPage) {
        return window.location.href = "/profile/" + this.user.id
      }

      this.initMenu();
      this.myRouterController();

      const sessionID = sessionStorage.getItem("home_key_id");

      if (!sessionID) {
        this.loaderValue = 0;
        this.loaderLoading = false;

        sessionStorage.setItem("home_key_id", "" + Date.now());

        setTimeout(() => {
          this.loaderValue = 100;
        }, 300);

        setTimeout(() => {
          this.loading = false;
        }, 900);

        setTimeout(() => {
          this.setSnackbarValues("success, darken-1", this.getGreetingMessage);
        }, 1200);

      } else {
        this.loaderValue = 100;
        this.loading = false;
      }
    }
  }

  checkMyAgency() {
    let agencyInclude = !!this.user.agency;

    if (this.user.role != "unknown") {
      if (!agencyInclude) {
        this.user.agency = {};
        this.isUnknown = true;
      }
    } else {
      this.isUnknown = true;
    }
  }

  initMenu() {
    const profileLinks = JSON.parse(
        JSON.stringify(this.$store.getters["menu/getMenu"])
    );

    for (let i = 0; i < profileLinks.length; i++) {
      const profileLink = profileLinks[i];
      const access = profileLink.access;

      const conditionManager = (access: any) => {
        if (typeof access == "string") {
          const conditionsList = access.split(",");

          let rolesContain: boolean = false;
          let agencyContain: boolean = false;

          for (let j = 0; j < conditionsList.length; j++) {
            let condition = conditionsList[j];

            if (condition.includes("agency")) {
              agencyContain = !!this.user.agency;
            } else {
              agencyContain = true;
            }

            if (condition.includes("role=")) {
              const roleListString = condition.split("role=")[1];
              const roleList = roleListString.split("&");
              if (!roleList.includes("admin")) {
                roleList.push("admin");
              }

              rolesContain = roleList.includes(this.user.role);
            } else {
              rolesContain = true;
            }
          }

          return rolesContain && agencyContain;
        } else {
          return access;
        }
      };

      const itemIncludes = conditionManager(access);

      if (itemIncludes) {
        this.profileLinks.push(profileLink);
      }
    }
  }

  @Watch("$route")
  myRouterController() {
    this.checkMenu();
    this.setHeader();
  }

  checkMenu() {
    const { name, path }: any = this.$router.currentRoute;
    const i = this.findIndexElement(path);

    const profileLinks: any = this.profileLinks;
    const element = profileLinks[i];

    if (!element) {
      const { position } = profileLinks.reduce(
          (prev: any, cur: any) => (cur.position > prev.position ? cur : prev),
          { position: -Infinity }
      );
      const newPosition = position + 10;

      if (path == "/") {
        this.$router.push("/news");
      } else {
        profileLinks.push({
          position: newPosition,
          icon: "mdi-file-link-outline",
          title: "Новая страница",
          link: path,
          access: true,
          showItem: true,
          routeName: name,
          headerComponent: ""
        });
      }

      return (this.profileLinks = profileLinks);
    }
  }

  setHeader() {
    const { path }: any = this.$router.currentRoute;
    const i = this.findIndexElement(path);

    if (path == "/") return (this.currentHeader = "header-default-empty");

    return (this.currentHeader =
        this.profileLinks[i]["headerComponent"] ?? "header-default-empty");
  }

  findIndexElement(value: string) {
    let i = -1;

    if (!value.includes("profile")) {
      i = this.profileLinks.findIndex(
          (el: Record<string, unknown>) => el.link === value
      )
    } else {
      i = this.profileLinks.findIndex(
          (el: any) => el.link.includes("profile")
      )
    }

    return i
  }

  get currentBackgroundImage() {
    const wallpapers = this.$store.state.user.settings.wallpapers;

    let result =
        `background-image: url('` +
        require("~/static/" + wallpapers + "/" + TimesOfDay().time + ".png") +
        `')`;

    setInterval(() => {
      result =
          `background-image: url('` +
          require("~/static/" + wallpapers + "/" + TimesOfDay().time + ".png") +
          `')`;
    }, 30 * 60 * 1000);

    return result;
  }

  get userName() {
    return JSON.parse(JSON.stringify(this.user.firstName));
  }

  get getGreetingMessage() {
    return TimesOfDay().greetings + " " + this.userName;
  }

  get usableColor() {
    return new ColorTheme().color();
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true;
    this.snackbarColor = color;
    this.snackbarMessage = message;
  }

  get disabledPage() {
    const { path } = this.$router.currentRoute
    const condition = this.user.agency.id > 0 && this.user.role != 'unknown'

    if (!condition){
      return !condition && (path.includes('/profile') || path == '/news')
    }


    return condition
  }
}
</script>
