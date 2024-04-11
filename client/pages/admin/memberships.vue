<template>
  <div>
    <v-skeleton-loader
        v-if="loading"
        :dark="usableTheme"
        type="table"
    ></v-skeleton-loader>

    <v-data-table
        v-else
        dense
        :items="list"
        :search="search"
        :dark="usableTheme"
        :headers="headers"
        no-data-text="Нет данных"
        :class="'custom-table ' + usableBlock"
        :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        itemsPerPageText: 'Кол-во элементов',
        itemsPerPageOptions: [10, 25, 50, 100, -1],
      }"
    >
      <template v-slot:item.user.phone="{ item }">
        <td class="text-start text-no-wrap">
          {{ item.user["phone"] }}
        </td>
      </template>

      <template v-slot:item.user.firstName="{ item }">
        <td class="text-start text-no-wrap">
          {{ getUserFullName(item.user) }}
        </td>
      </template>

      <template v-slot:item.user.created="{ item }">
        <td class="text-start text-no-wrap">
          {{ normalizeCreated(item.user["created"]) }}
        </td>
      </template>

      <template v-slot:item.created="{ item }">
        <td class="text-start text-no-wrap">
          {{ normalizeCreated(item["created"]) }}
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-btn :href="'/profile/' + item.user.id" target="_blank" icon small>
            <v-icon small color="primary darken-1">
              mdi-link-variant
            </v-icon>
          </v-btn>

          <v-btn icon small @click="dialog.accept = !dialog.accept">
            <v-icon small color="primary darken-1">
              mdi-check
            </v-icon>
          </v-btn>

          <action-dialog
              v-model="dialog.accept"
              :text="'Вы действительно хотите принять <br /> пользователя <b>' + getUserFullName(item.user) + '</b> в агентство?'"
              @isConfirm="acceptItem(item)"
          ></action-dialog>

          <v-btn icon small>
            <v-icon small color="error darken-1">
              mdi-close
            </v-icon>
          </v-btn>

          <action-dialog
              v-model="dialog.reject"
              :text="'Вы действительно хотите не принимать <br /> пользователя <b>' + getUserFullName(item.user) + '</b> в агентство?'"
              @isConfirm="rejectItem(item)"
          ></action-dialog>

        </div>
      </template>
    </v-data-table>

    <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :timeout="2000"
        outlined
        text
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axiosAuthConfig from "~/assets/script/functions/axiosAuthConfig";
import { normalizeDate } from "~/assets/script/functions/norlamizeDate";
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component({
  layout: "admin"
})
export default class Memberships extends Vue {
  loading: boolean = true;
  search: string = "";

  dialog: Record<string, boolean> = {
    accept: false,
    reject: false
  };

  snackbar: boolean = false;
  snackbarColor: string = "";
  snackbarMessage: string = "";

  list: any = [];
  headers: any = [
    { text: "id", value: "id" },
    { text: "Имя Фамилия", value: "user.firstName" },
    { text: "Телефон", value: "user.phone" },
    { text: "Дата регистрации", value: "user.created" },
    { text: "Дата создания", value: "created" },
    { text: "", value: "actions", sortable: false }
  ];

  async created() {
    await this.getList()
  }

  async getList() {
    if (process.client) {
      let authToken = localStorage.getItem("token");

      if (!authToken) {
        return null;
      }

      const agency = this.$store.state.user.user.agency;

      await this.$axios
          .post(
              "/api/agency/invite/list/",
              { agency: agency },
              {
                ...axiosAuthConfig(authToken, "", "crm_client")
              }
          )
          .then((data) => {
            if (data.data?.message) {
              this.setSnackbarValues("error darken-1", data.data.message);
              console.log(data.data.error);
              return;
            }

            this.list = data.data;
            this.loading = false;
          });
    }
  }

  async acceptItem(item: any) {
    if (process.client) {
      let authToken = localStorage.getItem("token");

      if (!authToken) {
        return null;
      }
      await this.$axios
          .post("/api/agency/invite/accept/" + item.hash, {}, {
            ...axiosAuthConfig(authToken, "", "crm_client")
          })
          .then((data) => {
            if (data.data?.message) {
              this.setSnackbarValues("error darken-1", data.data.message);
              console.log(data.data.error);
              return;
            }

            this.setSnackbarValues("success darken-1", 'Пользователь принят в агентство!');
            this.getList()
          })
          .finally(() => {
            this.dialog.accept = false
          })
    }
  }

  async rejectItem(item: any) {

  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true;
    this.snackbarColor = color;
    this.snackbarMessage = message;
  }

  normalizeCreated(date: any) {
    return normalizeDate(date);
  }

  getUserFullName(item: any) {
    return item["firstName"] + " " + item["lastName"];
  }

  get usableBlock() {
    return new ColorTheme().block();
  }

  get usableTheme() {
    return new ColorTheme().isDark();
  }
}
</script>