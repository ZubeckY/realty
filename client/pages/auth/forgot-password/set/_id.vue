<template>
  <div class="auth-container">
    <div :class="'auth-card ' + usableBlock">
      <v-form
        ref="valid"
        v-model="valid"
        @submit.prevent
        :class="'auth-form' + ' ' + usableBlock"
      >
        <h2 class="auth-title my-2">Введите новый пароль</h2>
        <br />

        <div class="auth-form__textField">
          <v-text-field
            label="Пароль"
            v-model="model.password"
            :loading="loadingValues"
            :disabled="disableValues"
            :rules="[rules.password, rules.length(8), rules.required]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :dark="usableTheme"
            outlined
            counter
          />
        </div>

        <div class="auth-form__textField">
          <v-text-field
            label="Повторите пароль"
            :loading="loadingValues"
            :disabled="disableValues"
            v-model="model.passwordRepeat"
            :rules="[
              rules.password,
              rules.required,
              rules.length(8),
              rules.match(model.password),
            ]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :dark="usableTheme"
            outlined
            counter
          />
        </div>

        <v-btn
          v-if="step == 1"
          block
          small
          outlined
          class="mb-3"
          color="primary darken-1"
          @click="sendMessageCode"
          :loading="loadingValues"
          :disabled="disableValues"
        >
          Сохранить
        </v-btn>

        <div v-if="step >= 2">
          <br />
          <div>На вами ранее указанный email, был выслан код.</div>
          <div>Введите его в поля ниже.</div>

          <div class="auth-form__textField my-4">
            <v-otp-input
              class="auth-form__uppercase"
              v-model="otpCode"
              length="5"
              @finish="onFinish"
              :loading="loading"
              :disabled="loading"
              :dark="usableTheme"
            />
          </div>
          <div>
            Не приходит код?
            <v-btn
              class="pa-0 ml-1 px-1"
              color="primary darken-1"
              :disabled="isTimedOut"
              @click="sendCodeAgain"
              :dark="usableTheme"
              text
              small
            >
              Отправить повторно
              {{ isTimedOut ? 'через ' + timer : '' }}
            </v-btn>
          </div>
        </div>

        <v-snackbar
          v-model="snackbar"
          :color="snackbarColor"
          :timeout="2000"
          outlined
          text
        >
          {{ snackbarMessage }}
        </v-snackbar>
      </v-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'

@Component({
  layout: 'auth',
})
export default class Activate extends Vue {
  step: number = 1

  loadingValues: boolean = false
  disableValues: boolean = false

  valid: boolean = false
  loading: boolean = false
  otpCode: string = ''

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  timer: number = 59

  showPassword: boolean = false
  model: Record<string, string> = {
    password: '',
    passwordRepeat: '',
  }

  rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= (len ?? 8) ||
      `Недопустимая длина символов, требуется ${len} символов`,
    match: (match: any) => (v: any) =>
      (!!v && v) === match || 'Пароли должны совпадать',
    password: (v: any) =>
      !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      'Пароль должен содержать заглавную букву, цифру и специальный символ.',
    required: (v: any) => !!v || 'Это поле обязательно к заполнению',
  }

  async mounted() {
    if (process.client) {
      const link = this.$router.currentRoute.path
      const array = link.split('/')
      let hash: string | unknown = array[array.length - 1]

      if (!hash) {
        hash = localStorage.getItem('hash')
      }

      await this.$axios
        .get('/api/auth/activate-status/' + hash)
        .then((data) => {
          if (data.data?.message) {
            this.setSnackbarValues('error darken-1', data.data.message)
          }
        })

      // this.startTimerOut()
    }
  }

  async onFinish() {
    if (process.client) {
      this.loading = true
      const hash = localStorage.getItem('hash')

      await this.$axios
        .post('/api/auth/activate-code/', {
          model: {
            hash: hash,
            otp: this.otpCode.toUpperCase(),
          },
        })
        .then(async (data) => {
          if (data.data?.message) {
            this.setSnackbarValues('error darken-1', data.data.message)
            this.loading = false
            return
          }
          if (data.data?.id) {
            const needUserData = {
              id: data.data?.id,
              firstName: data.data?.firstName,
              lastName: data.data?.lastName,
              email: data.data?.email,
            }

            await this.$store.dispatch('user/userValues', {
              payload: needUserData,
            })

            await this.$axios
              .post('/api/auth/login-after-activations/' + hash)
              .then((data) => {
                if (data.data?.message) {
                  this.setSnackbarValues('error darken-1', data.data.message)
                  this.loading = false
                  return
                }

                localStorage.setItem('token', data.data?.accessToken)
                localStorage.removeItem('hash')

                this.loading = false

                this.setSnackbarValues(
                  'succes, darken-1',
                  this.getGreetingMessage
                )

                setTimeout(() => {
                  return (window.location.href = '/profile/' + this.userID)
                }, 500)
              })
          }
          this.loading = false
        })
    }
  }

  sendMessageCode() {
    // @ts-ignore
    this.$refs.valid.validate() && (() => {
      this.disableValues = true
      this.loadingValues = true
    })()
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  startTimerOut() {
    const interval = setInterval(() => {
      if (this.isTimedOut) {
        return this.timer--
      }
      clearInterval(interval)
    }, 1000)
  }

  sendCodeAgain() {
    const hash = localStorage.getItem('hash')
    this.$axios.post('/api/auth/activate-code-refresh/' + hash)
    this.timer = 59
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get isTimedOut() {
    return this.timer >= 1
  }

  get userID() {
    return JSON.parse(JSON.stringify(this.$store.state.user.user.id))
  }

  get userName() {
    return JSON.parse(JSON.stringify(this.$store.state.user.user.firstName))
  }

  get getGreetingMessage() {
    return TimesOfDay().greetings + ' ' + this.userName
  }
}
</script>
