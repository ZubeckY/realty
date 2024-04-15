<template>
  <div>
    <card class="mb-3">
      <h3 :class="usableText">Добавление лида</h3>

      <div class="create__group mt-3">
        <div class="create__title">Стадия выполнения</div>
        <div class="mr-3">
          <v-autocomplete
            v-model="model.stage"
            :dark="usableTheme"
            :disabled="disabled"
            item-value="value"
            item-text="text"
            type="text"
            clearable
            outlined
            chips
            dense
          >
            <template v-slot:selection></template>
          </v-autocomplete>
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Район</div>
        <div class="mr-3">
          <v-autocomplete
            v-model="model.district"
            :dark="usableTheme"
            :disabled="disabled"
            :items="districtList"
            item-value="id"
            item-text="title"
            type="text"
            clearable
            outlined
            chips
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Микрорайон</div>
        <div class="mr-3">
          <v-autocomplete
            v-model="model.microDistrict"
            :dark="usableTheme"
            :disabled="disabled"
            :items="microDistrictList"
            item-value="id"
            item-text="title"
            type="text"
            clearable
            outlined
            chips
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Способ оплаты</div>
        <div class="mr-3">
          <v-autocomplete
            v-model="model.paymentMethod"
            :dark="usableTheme"
            :disabled="disabled"
            :items="paymentMethodList"
            item-value="value"
            item-text="text"
            type="text"
            clearable
            outlined
            chips
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Тип недвижимости</div>
        <div class="mr-3">
          <v-autocomplete
            v-model="model.realtyType"
            :dark="usableTheme"
            :disabled="disabled"
            :items="realtyTypeList"
            item-value="value"
            item-text="text"
            type="text"
            clearable
            outlined
            chips
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Готовность</div>
        <div class="mr-3">
          <v-autocomplete
            v-model="model.objectReadiness"
            :dark="usableTheme"
            :disabled="disabled"
            :items="objectReadinessList"
            item-value="value"
            item-text="text"
            type="text"
            clearable
            outlined
            chips
            dense
          >
          </v-autocomplete>
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Цель покупки</div>
        <div class="mr-3">
          <v-text-field
            v-model="model.purposeOfPurchase"
            :dark="usableTheme"
            :disabled="disabled"
            type="text"
            outlined
            counter
            dense
          />
        </div>
      </div>

      <div class="create__group mt-3" v-if="showSetUsers">
        <div class="create__title">Менеджер</div>
        <div class="mr-3">
          <todo-user
            v-model="model.manager"
            :disabled="disabled"
          />
        </div>
      </div>

      <div class="create__group mt-3" v-if="showSetUsers">
        <div class="create__title">Исполнитель</div>
        <div class="mr-3">
          <todo-user
            v-model="model.user"
            :disabled="disabled"
          />
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Комментарий</div>
        <div class="mr-3">
          <v-textarea
            v-model="model.comment"
            :dark="usableTheme"
            :disabled="disabled"
            type="text"
            rows="3"
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
          @click="createOne"
          outlined
          small
        >
          Создать
        </v-btn>
        <v-btn
          color="error darken-1"
          @click="$router.push('/news')"
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
      <span v-html="snackbarMessage"></span>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { realtyTypeText } from '~/assets/script/models/RealtyType'
import getAuthToken from "~/assets/script/functions/getAuthToken";
import axiosAuthConfig from "~/assets/script/functions/axiosAuthConfig";

@Component({})
export default class Create extends Vue {
  loading: boolean = false
  disabled: boolean = false

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  showSetUsers: boolean = false

  districtList: any = []
  microDistrictList: any = []

  objectReadinessList: any = [
    {
      text: 'Дизайнерский ремонт',
      value: 'Дизайнерский ремонт',
    },
    {
      text: 'Предчистовая отделка',
      value: 'Предчистовая отделка',
    },
    {
      text: 'Ремонт',
      value: 'Ремонт',
    },
    {
      text: 'Не важно',
      value: 'Не важно',
    },
  ]

  paymentMethodList: any = [
    {
      text: 'Наличный расчёт',
      value: 'Наличный расчёт',
    },
    {
      text: 'Безналичный расчёт',
      value: 'Безналичный расчёт',
    },
    {
      text: 'Рассрочка',
      value: 'Рассрочка',
    },
    {
      text: 'Ипотека',
      value: 'Ипотека',
    },
    {
      text: 'Другой',
      value: 'Другой',
    },
  ]

  model: any = {
    realtyType: '',
    district: '',
    microDistrict: '',
    objectReadiness: '',
    purposeOfPurchase: '',
    paymentMethod: '',
    stage: '',
    comment: '',
    client: '',
    manager: '',
    user: '',
  }

  async created() {
    this.checkUserCreated()
    await this.initDistrictList()
    await this.initMicroDistrictList()
  }


  async createOne() {

    if (process.client) {
      let authToken = getAuthToken();

      if (!authToken) {
        return null;
      }

      this.loading = true;
      this.disabled = true;

      const user = this.$store.state.user.user;
      const agency = this.$store.state.user.user.agency;

      await this.$axios
        .post(
          "/api/lead/create/",
          {
            lead: this.model,
            agency,
            user,
          },
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

          this.setSnackbarValues("success darken-1", "Успешно");
          setTimeout(() => {
            this.$router.push("/leads");
          }, 1000);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          this.loading = false;
          this.disabled = false;
        });
    }
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }


  checkUserCreated() {
    if (!this.currentRoleHigh) {
      this.model.user = this.currentUser
      this.model.manager = this.currentUser
      this.showSetUsers = false
      return
    }
    this.showSetUsers = true
  }

  get realtyTypeList() {
    const list = Object.entries(realtyTypeText)
    const result = []

    for (let i = 0; i < list.length; i++) {
      result.push({
        text: list[i][1],
        value: list[i][0],
      })
    }

    return result
  }

  async initDistrictList() {
    await this.$axios
      .get('/api/file/district-list/?regions=23&cities=krasnodar', {})
      .then((data) => {
        this.districtList = data.data[0].cityList[0].districtList.filter(
          (item: any) => ['район', 'округ'].includes(item.type)
        )
      })
  }

  async initMicroDistrictList() {
    await this.$axios
      .get('/api/file/district-list/?regions=23&cities=krasnodar', {})
      .then((data) => {
        this.microDistrictList = data.data[0].cityList[0].districtList.filter(
          (item: any) => ['м-он'].includes(item.type)
        )
      })
  }

  get currentUser() {
    return this.$store.state.user.user
  }

  get currentUserRole() {
    return this.currentUser.role
  }

  get currentRoleHigh() {
    return ['admin', 'rop', 'office_manager'].includes(this.currentUserRole)
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableColor() {
    return new ColorTheme().color()
  }

  get usableText() {
    return new ColorTheme().text()
  }
}
</script>
