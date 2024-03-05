<template>
  <v-app :class="themes[activeTheme]['background']">
    <v-main>
      <div class="main-container">
        <header-component>
          <component :is="currentHeader"></component>
        </header-component>

        <div class="d-flex" style="width: 100%; height: calc(100vh - 55px)">
          <menu-buttons v-model="profileLinks" class="pt-1" />

          <div class="overflow-y-auto pl-2 py-2" style="width: 100%;">
            <Nuxt class="pr-2" />
          </div>
        </div>

      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Default extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;
  profileLinks = [];
  currentHeader: string = "";

  created() {
    this.profileLinks = JSON.parse(JSON.stringify(this.$store.getters["menu/getMenu"]));
  }

  mounted() {
    this.myRouterController();
  }

  @Watch("$route")
  myRouterController() {
    this.checkMenu();
    this.setHeader();
  }

  checkMenu() {
    const { name, path }: any = this.$router.currentRoute;
    const i = this.findIndexElement(name);

    const profileLinks = this.profileLinks
    const element = profileLinks[i];

    if (!element) {
      const { position } = profileLinks.reduce((prev, cur) => cur.position > prev.position ? cur : prev, { position: -Infinity });
      const newPosition = position + 10;

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

      return this.profileLinks = profileLinks
    }

  }

  setHeader() {
    const { name }: any = this.$router.currentRoute;
    const i = this.findIndexElement(name);
    return this.currentHeader = this.profileLinks[i]["headerComponent"] ?? "header-default-empty";
  }

  changeHeader(value: string) {
    this.currentHeader = value;
  }

  findIndexElement(value: string) {
    return this.profileLinks.findIndex((el: Record<string, unknown>) => el.routeName === value);
  }

}
</script>
