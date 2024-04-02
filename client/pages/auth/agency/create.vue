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
import { Vue, Component } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component({
  layout: 'auth',
})
export default class Create extends Vue {
  valid: boolean = false
  legalForms: any = []

  model: any = {
    title: '',
    inn: '',
    email: '',
    legalForm: '',
  }

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  loading: boolean = false
  disabled: boolean = false

  rules = {
    email: (v: any) =>
      !!(v || '').match(/@/) ||
      'Введите действительный адрес электронной почты',

    match: (match: any) => (v: any) =>
      (!!v && v) === match || 'Пароли должны совпадать',

    length: (len: any) => (v: any) =>
      (v || '').length >= (len ?? 8) ||
      `Недопустимая длина символов, требуется ${len} символов`,

    maxValue: (len: any) => (v: any) =>
      (v || '') < len ||
      `Недопустимое значение, максимальное значение - ${len}`,

    password: (v: any) =>
      !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      'Пароль должен содержать заглавную букву, цифру и специальный символ.',

    required: (v: any) => !!v || 'Это поле обязательно к заполнению',
  }

  async created() {
    await this.$axios.get('/api/agency/legal-form/list').then((data: any) => {
      const list = []
      const DATA = Object.entries(data.data)
      for (let i = 0; i < DATA.length; i++) {
        let item = DATA[i]
        list.push({
          value: item[0],
          text: item[1],
        })
      }

      this.legalForms = list
    })
  }

  async createAgency() {
    const user = JSON.parse(JSON.stringify(this.$store.state.user.user))
    const startCreate = async () => {
      this.loading = true
      this.disabled = true
      await this.$axios
        .post('/api/agency/create/', {
          agency: this.model,
          user: user,
        })
        .then((data: any) => {
          if (data.data?.message) {
            this.setSnackbarValues('error darken-1', data.data.message)
            this.disabled = false
            this.loading = false
            return
          }

          let {agency, user} = data.data

          this.$store.dispatch('user/userValues', {
            payload: user,
          })

          this.setSnackbarValues('success darken-1', 'Успешно')

          this.disabled = false
          this.loading = false

          setTimeout(() => {
            this.$router.push('/profile/' + user.id)
          }, 500)

        })
    }
    //@ts-ignore
    this.$refs.valid.validate() && (await startCreate())
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
