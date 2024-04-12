<template>
  <div class="auth-container">
    <div :class="'auth-card ' + (usableTheme ? 'dark' : 'light')">
      <v-form
          ref="valid"
          v-model="valid"
          @submit.prevent
          :class="'auth-form' + ' ' + usableBlock"
      >
        <h2 class="auth-title mt-2 mb-8">Регистрация агентства</h2>

        <div class="auth-form__textField">
          <v-text-field
              label="Название агентства"
              v-model="model.title"
              :rules="[rules.required]"
              :disabled="disabled"
              :dark="usableTheme"
              outlined
          />
        </div>

        <div class="auth-form__textField">
          <v-text-field
              label="ИНН"
              v-model="model.inn"
              :rules="[rules.required]"
              :disabled="disabled"
              :dark="usableTheme"
              outlined
              counter
          />
        </div>

        <div class="auth-form__textField">
          <v-text-field
              label="Email"
              v-model="model.email"
              :rules="[rules.required]"
              :disabled="disabled"
              :dark="usableTheme"
              type="email"
              outlined
          />
        </div>

        <div class="auth-form__textField">
          <v-text-field
              label="Адрес"
              @click="addressFormDialog = !addressFormDialog"
              v-model="addressInput"
              :rules="[rules.required]"
              :disabled="disabled"
              :dark="usableTheme"
              type="text"
              outlined
              readonly
          />
        </div>

        <action-dialog v-model="addressFormDialog"
                       title="Добавление адреса"
                       text=""
                       cancel-text="Отмена"
                       confirm-text="Добавить"
                       @isConfirm="addressFormDialog = !addressFormDialog">
          <div class="mt-3">
            <div class="auth-form__textField">
              <v-autocomplete
                  label="Регион"
                  :items="regionList"
                  item-value="id"
                  item-text="title"
                  v-model="model.address.regionId"
                  :rules="[rules.required]"
                  :disabled="disabled"
                  :dark="usableTheme"
                  type="email"
                  outlined
              />
            </div>

            <div class="auth-form__textField">
              <v-autocomplete
                  label="Город"
                  :items="getCityList"
                  item-value="id"
                  item-text="title"
                  v-model="model.address.cityId"
                  :rules="[rules.required]"
                  :disabled="disabled"
                  :dark="usableTheme"
                  type="email"
                  outlined
              />
            </div>

            <div class="d-flex">
              <div class="auth-form__textField mr-1">
                <v-text-field
                    label="Улица"
                    v-model="model.address.street"
                    :rules="[rules.required]"
                    :disabled="disabled"
                    :dark="usableTheme"
                    type="text"
                    outlined
                />
              </div>
              <div class="auth-form__textField ml-1">
                <v-text-field
                    label="Дом"
                    v-model="model.address.number"
                    :rules="[rules.required]"
                    :disabled="disabled"
                    :dark="usableTheme"
                    type="text"
                    outlined
                />
              </div>
            </div>
          </div>
        </action-dialog>

        <div class="auth-form__textField">
          <v-autocomplete
              v-model="model.legalForm"
              :rules="[rules.required]"
              :disabled="disabled"
              label="Правовая форма"
              color="primary darken-1"
              :items="legalForms"
              :dark="usableTheme"
              deletable-chips
              outlined
              chips
          ></v-autocomplete>
        </div>

        <v-btn
            class="radius-small primary darken-1 white--text mb-3"
            :dark="usableTheme"
            @click="createAgency"
            :disabled="!valid || disabled"
            :loading="loading"
            elevation="0"
            small
            block
        >
          Создать агентство
        </v-btn>

        <v-btn
            class="radius-small primary darken-1 white--text mb-3"
            :dark="usableTheme"
            :disabled="disabled"
            @click="$router.push('/auth/agency/find')"
            elevation="0"
            small
            block
        >
          Запросить приглашение у агентства
        </v-btn>
      </v-form>

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
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { ColorTheme } from "~/assets/script/functions/colorTheme";
import axiosAuthConfig from "~/assets/script/functions/axiosAuthConfig";

@Component({
  layout: "auth"
})
export default class Create extends Vue {
  valid: boolean = false;
  addressInput: string = "";
  addressFormDialog: boolean = false;
  legalForms: any = [];

  regionList: any = [];
  cityList: any = [];

  model: any = {
    title: "",
    inn: "",
    email: "",
    legalForm: "",
    address: {
      region: "",
      regionId: "",
      city: "",
      cityId: "",
      street: "",
      number: ""
    }
  };

  snackbar: boolean = false;
  snackbarColor: string = "";
  snackbarMessage: string = "";

  loading: boolean = false;
  disabled: boolean = false;

  rules = {
    email: (v: any) =>
        !!(v || "").match(/@/) ||
        "Введите действительный адрес электронной почты",

    match: (match: any) => (v: any) =>
        (!!v && v) === match || "Пароли должны совпадать",

    length: (len: any) => (v: any) =>
        (v || "").length >= (len ?? 8) ||
        `Недопустимая длина символов, требуется ${len} символов`,

    maxValue: (len: any) => (v: any) =>
        (v || "") < len ||
        `Недопустимое значение, максимальное значение - ${len}`,

    password: (v: any) =>
        !!(v || "").match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        "Пароль должен содержать заглавную букву, цифру и специальный символ.",

    required: (v: any) => !!v || "Это поле обязательно к заполнению"
  };

  async created() {
    if (process.client) {

      let authToken = localStorage.getItem("token");

      if (!authToken) {
        return null;
      }

      await this.submitRegion();

      await this.$axios.get("/api/agency/legal-form/list", {
        ...axiosAuthConfig(authToken, "", "crm_client")
      })
          .then((data: any) => {
            const list = [];
            const DATA = Object.entries(data.data);
            for (let i = 0; i < DATA.length; i++) {
              let item = DATA[i];
              list.push({
                value: item[0],
                text: item[1]
              });
            }

            this.legalForms = list;
          });
    }
  }

  async createAgency() {
    const user = JSON.parse(JSON.stringify(this.$store.state.user.user));
    const startCreate = async () => {
      this.loading = true;
      this.disabled = true;

      if (process.client) {
        let authToken = localStorage.getItem("token");

        if (!authToken) {
          return null;
        }

        await this.$axios
            .post("/api/agency/create/",
                {
                  agency: this.model,
                  user: user
                },
                {
                  ...axiosAuthConfig(authToken, "", "crm_client")
                }
            )
            .then((data: any) => {
              if (data.data?.message) {
                this.setSnackbarValues("error darken-1", data.data.message);
                this.disabled = false;
                this.loading = false;
                return;
              }

              let { agency, user } = data.data;

              this.$store.dispatch("user/userValues", {
                payload: user
              });

              this.setSnackbarValues("success darken-1", "Успешно");

              this.disabled = false;
              this.loading = false;

              setTimeout(() => {
                this.$router.push("/profile/" + user.id);
              }, 500);

            });
      }
    };
    //@ts-ignore
    this.$refs.valid.validate() && (await startCreate());
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true;
    this.snackbarColor = color;
    this.snackbarMessage = message;
  }

  async submitRegion() {
    await this.$axios
        .get("/api/file/region-list/")
        .then((data) => {
          this.regionList = data.data;
        })
        .catch((e) => {
          console.log(e);
        });
  }


  @Watch("addressFormDialog")
  changeAddressModel() {
    const { regionId, cityId, street, number } = this.model.address;
    if (regionId.length > 0 && cityId.length > 0 && street.length > 0 && number.length > 0) {
      this.addressInput = this.regionTypeText + ", " + this.cityTypeText + ", " + street + ", " + number;
      this.model.address.city = this.cityTypeText;
      this.model.address.region = this.regionTypeText;
      return;
    }
    this.addressInput = "";
    this.model.address.city = "";
    this.model.address.region = "";
  }

  @Watch("model.address.regionId")
  async submitCity() {
    if (this.model.address.regionId) {
      await this.$axios
          .get("/api/file/city-list/?regions=" + this.model.address.regionId)
          .then((data) => {
            this.cityList = data.data;
          })
          .catch((e) => {
            console.log(e);
          });
    }
  }

  get getCityList() {
    return this.cityList[0]?.cityList ?? [];
  }

  get regionTypeText() {
    const { regionId } = this.model.address;
    const needRegion = this.regionList.filter((item: any) => item.id === regionId);
    return needRegion[0]?.title ?? "";
  }

  get cityTypeText() {
    const { cityId } = this.model.address;
    const needCity = this.getCityList.filter((item: any) => item.id === cityId);
    return needCity[0]?.title ?? "";
  }

  get usableBlock() {
    return new ColorTheme().block();
  }

  get usableTheme() {
    return new ColorTheme().isDark();
  }
}
</script>
