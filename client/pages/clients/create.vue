<template>
  <div>
    <card class="mb-3">
      <h3 :class="usableText">Добавление клиента</h3>

      <div class="createClient__group mt-3">
        <div class="create__title">Фио клиента</div>
        <div class="mr-3">
          <v-text-field
              v-model="model.fullName"
              :dark="usableTheme"
              :disabled="disabled"
              type="text"
              outlined
              counter
              dense
          />
        </div>
      </div>

      <div class="createClient__group mt-3">
        <div class="create__title">Телефон</div>
        <div class="mr-3">
          <v-text-field
              v-model="model.phone"
              :dark="usableTheme"
              :disabled="disabled"
              type="text"
              outlined
              counter
              dense
          />
        </div>
      </div>

      <div class="createClient__group mt-3">
        <div class="create__title">Компания</div>
        <div class="mr-3">
          <v-text-field
              v-model="model.company"
              :dark="usableTheme"
              :disabled="disabled"
              type="text"
              outlined
              counter
              dense
          />
        </div>
      </div>

      <div class="create__group">
        <div class="create__title">Комментарий</div>
        <div class="mr-3">
          <v-textarea
              v-model="model.comment"
              :dark="usableTheme"
              :disabled="disabled"
              type="text"
              rows="2"
              outlined
              counter
              dense
          />
        </div>
      </div>

      <div class="create__group mb-3">
        <v-btn
            :color="usableColor"
            :loading="loading"
            :disabled="disabled"
            @click="createItem"
            outlined
            small
        >
          Создать
        </v-btn>
        <v-btn
            color="error darken-1"
            @click="$router.push('/clients')"
            :disabled="disabled"
            outlined
            small
        >
          Отмена
        </v-btn>
      </div>
    </card>

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
import { Vue, Component } from "vue-property-decorator"
import { ColorTheme } from "~/assets/script/functions/colorTheme"
import axiosAuthConfig from "~/assets/script/functions/axiosAuthConfig"

@Component({})
export default class Create extends Vue {
  loading: boolean = false
  disabled: boolean = false

  snackbar: boolean = false
  snackbarColor: string = ""
  snackbarMessage: string = ""

  model: any = {
    fullName: "",
    phone: "",
    company: "",
    comment: ""
  };

  async createItem() {
    const user = JSON.parse(JSON.stringify(this.$store.state.user.user))
    const agency = user.agency

    if (process.client) {
      let authToken = localStorage.getItem("token")

      if (!authToken) {
        return null
      }

      this.loading = true
      this.disabled = true

      await this.$axios
        .post("/api/client/create/", {
              user: user,
              agency: agency,
              client: this.model
            },
            {
              ...axiosAuthConfig(authToken, "", "crm_client")
            }
        )
        .then((data => {
          if (data.data?.message) {
            this.setSnackbarValues("error darken-1", data.data.message);
            this.disabled = false
            this.loading = false
            return
          }

          this.setSnackbarValues("success darken-1", 'Успешно!')
          this.loading = false

          setTimeout(() => {
            this.$router.push('/clients')
          }, 1000)
        }))
    }
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true;
    this.snackbarColor = color;
    this.snackbarMessage = message;
  }

  get usableText() {
    return new ColorTheme().text();
  }

  get usableColor() {
    return new ColorTheme().color();
  }

  get usableTheme() {
    return new ColorTheme().isDark();
  }
}
</script>
