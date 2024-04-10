<template>
  <div>
    <v-skeleton-loader
        v-if="loading"
        :dark="usableTheme"
        type="table"
    ></v-skeleton-loader>

    <v-data-table
        v-else
        :dark="usableTheme"
        :headers="headers"
        :items="list"
        :search="search"
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
        dense
    >
      <template v-slot:item.user.phone="{ item }">
        <td class="text-start text-no-wrap">
          {{ item.user.phone }}
        </td>
      </template>

      <template v-slot:item.user.firstName="{ item }">
        <td class="text-start text-no-wrap">
          {{ item.user.firstName }} {{ item.user.lastName }}
        </td>
      </template>

      <template v-slot:item.created="{ item }">
        <td class="text-start text-no-wrap">
          {{ normalizeCreated(item.user["created"]) }}
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <v-btn :href="'/profile/' + item.user.id" target="_blank" icon small>
            <v-icon small color="primary darken-1">
              mdi-link-variant
            </v-icon>
          </v-btn>

          <v-btn icon small>
            <v-icon small color="primary darken-1">
              mdi-pencil
            </v-icon>
          </v-btn>

          <v-btn icon small>
            <v-icon small color="error darken-1">
              mdi-delete
            </v-icon>
          </v-btn>

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
  layout: 'admin'
})
export default class Memberships extends Vue {
  loading: boolean = true;
  search: string = "";

  snackbar: boolean = false;
  snackbarColor: string = "";
  snackbarMessage: string = "";

  list: any = [];
  headers: any = [
    { text: "id", value: "id" },
    { text: "Имя Фамилия", value: "user.firstName" },
    { text: "Телефон", value: "user.phone" },
    { text: "Дата регистрации", value: "user.created" },
    { text: "", value: "actions", sortable: false }
  ];

  async created() {
    if (process.client) {
      let authToken = localStorage.getItem("token");
      const agencyID = JSON.parse(
          JSON.stringify(this.$store.state.user.user.agency.id)
      );

      if (!authToken) {
        return null;
      }

      const agency = this.$store.state.user.user.agency

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

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true;
    this.snackbarColor = color;
    this.snackbarMessage = message;
  }

  normalizeCreated(date: any) {
    return normalizeDate(date);
  }

  get usableBlock() {
    return new ColorTheme().block();
  }

  get usableTheme() {
    return new ColorTheme().isDark();
  }
}
</script>