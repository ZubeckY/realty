<template>
  <div class="auth-container">
    <div :class="'auth-card ' + (usableTheme ? 'dark' : 'light')">
      <v-form
        ref="valid"
        v-model="valid"
        lazy-validation
        @submit.prevent="stepper"
        :class="'auth-form ' + (usableTheme ? ' dark' : ' light')"
      >
        <h2 class="auth-title mt-2 mb-8">Регистрация</h2>

        <div class="d-flex">
          <div class="auth-form__textField">
            <v-text-field
              label="Имя"
              v-model="model.firstName"
              :rules="[rules.required]"
              :dark="usableTheme"
              outlined
            />
          </div>

          <div class="mx-2"></div>

          <div class="auth-form__textField">
            <v-text-field
              label="Фамилия"
              v-model="model.lastName"
              :rules="[rules.required]"
              :dark="usableTheme"
              outlined
            />
          </div>
        </div>

        <div class="auth-form__textField">
          <v-text-field
            label="Введите email"
            v-model="model.email"
            :rules="[rules.email, rules.required]"
            :dark="usableTheme"
            type="email"
            outlined
          />
        </div>

        <div class="auth-form__textField">
          <v-text-field
            label="Пароль"
            v-model="model.password"
            :rules="[rules.password, rules.length(8), rules.required]"
            :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.password ? 'text' : 'password'"
            @click:append="show.password = !show.password"
            :dark="usableTheme"
            outlined
            counter
          />
        </div>

        <v-btn
          class="radius-small primary darken-1 white--text"
          :dark="usableTheme"
          :disabled="!valid"
          @click="stepper"
          elevation="0"
          small
          block
        >
          Регистрация
        </v-btn>

        <!--          <div class="auth-bySocial mt-4">-->
        <!--            <div class="auth-bySocial__container">-->
        <!--              <card-->
        <!--                class="auth-bySocial__card"-->
        <!--                v-for="(item, key) in authServices"-->
        <!--                :key="'auth-link-' + key"-->
        <!--              >-->
        <!--                <div-->
        <!--                  class="auth-bySocial__card-container"-->
        <!--                  @click="tryRegBySocial(item.icon)"-->
        <!--                >-->
        <!--                  <div class="auth-bySocial__icon">-->
        <!--                    <img :src="getItemIcon(item.icon)" :alt="item.icon" />-->
        <!--                  </div>-->

        <!--                  <div class="auth-bySocial__text">-->
        <!--                    Продолжить с {{ item.text }}-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </card>-->
        <!--            </div>-->
        <!--          </div>-->

        <div class="auth-checkbox__wrapper mt-4">
          <v-checkbox
            class="auth-checkbox"
            color="primary darken-1"
            v-model="model.IAgreeToPrivacyPolicy"
            :rules="[rules.required]"
            :dark="usableTheme"
            hide-details
            dense
          >
            <template v-slot:label>
              <div>
                Согласие на
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a target="_blank" href="" @click.stop v-on="on">
                      обработку персональных данных
                    </a>
                  </template>
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
        </div>

        <div class="auth-checkbox__wrapper mb-4">
          <v-checkbox
            class="auth-checkbox"
            color="primary darken-1"
            v-model="model.IAgreeToTermsOfUse"
            :rules="[rules.required]"
            :dark="usableTheme"
            hide-details
            dense
          >
            <template v-slot:label>
              <div>
                Согласие на
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <a
                      target="_blank"
                      href="https://vuetifyjs.com"
                      @click.stop
                      v-on="on"
                    >
                      пользовательские соглашения
                    </a>
                  </template>
                </v-tooltip>
              </div>
            </template>
          </v-checkbox>
        </div>

        <div class="auth-actions mb-2">
          <span class="auth-actions__title">Есть аккаунт? </span>
          <a
            href="/auth/login"
            class="auth-link primary--text text--darken-1"
          >
            Зайдите в него прямо сейчас!
            <v-icon color="primary darken-1" small
              >mdi-arrow-top-right-thin
            </v-icon>
          </a>
        </div>
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
import { Component, Vue } from 'vue-property-decorator'
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component({
  layout: 'auth',
})
export default class Reg extends Vue {
  valid: boolean = false
  step: number = 1

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  show: Record<string, any> = {
    password: false,
  }

  model: Record<string, any> = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    IAgreeToTermsOfUse: false,
    IAgreeToPrivacyPolicy: false,
  }

  authServices: any = [
    {
      text: 'VK',
      icon: 'vk',
    },
    {
      text: 'Yandex',
      icon: 'yandex',
    },
    {
      text: 'Google',
      icon: 'google',
    },
  ]

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

  async stepper() {
    await this.tryReg()
  }

  tryRegBySocial(value: string) {
    console.log(value)
  }

  async tryReg() {
    if (process.client) {
      //@ts-ignore
      this.$refs.valid.validate() &&
        (await this.$axios
          .post('/api/auth/reg/', {
            model: this.model,
          })
          .then((data: any) => {
            if (data.data?.message) {
              this.setSnackbarValues('error darken-1', data.data.message)
              console.log(data.data.error)
              return
            }

            this.setSnackbarValues('success darken-1', 'Успешно')

            setTimeout(() => {
              localStorage.setItem('hash', data.data?.linkHash)
              this.$router.push('/auth/activate/' + data.data?.linkHash)
            }, 300)
          }))
    }
  }

  get getTimeBackground() {
    return TimesOfDay().time
  }

  getItemIcon(icon: string) {
    return require('@/static/logo/' + icon + '.svg')
  }

  get currentBackgroundImage() {
    const wallpapers = this.$store.state.user.settings.wallpapers
    return (
      `background-image: url('` +
      require('~/static/' + wallpapers + '/' + TimesOfDay().time + '.png') +
      `')`
    )
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get welcomeMessageAnimation() {
    switch (this.step) {
      case 5:
        return 'scale-and-transparent__inner'
      case 6:
        return ''
      case 7:
        return 'transparent__out'
      case 8:
        return 'd-none'
      default:
        return 'd-none'
    }
  }

  get userName() {
    return JSON.parse(JSON.stringify(this.$store.state.user.user.firstName))
  }

  get getGreetingMessage() {
    return TimesOfDay().greetings + ' ' + this.userName
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }
}
</script>
