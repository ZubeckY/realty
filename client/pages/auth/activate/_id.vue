<template>
  <div class="auth-container">
    <div :class="'auth-card ' + usableBlock">
      <v-form
        v-model="valid"
        :class="'auth-form' + ' ' + usableBlock"
        @submit.prevent="onFinish"
      >
        <h2 class="auth-title my-2">Прежде чем продолжить</h2>
        <div>Активируйте свой аккаунт!</div>
        <p></p>
        <div>На вами ранее указанный email, был выслан код.</div>
        <div>Введите его в поля ниже.</div>

        <div class="auth-form__textField my-4">
          <v-otp-input
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
export default class _id extends Vue {
  valid: boolean = false
  loading: boolean = false
  otpCode: string = ''

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  timer: number = 59

  async mounted() {
    const link = this.$router.currentRoute.path
    const array = link.split('/')
    let hash: string | unknown = array[array.length - 1]

    if (!hash) {
      hash = localStorage.getItem('hash')
    }

    await this.$axios.get('/api/auth/activate-status/' + hash).then((data) => {
      if (data.data?.message) {
        this.setSnackbarValues('error darken-1', data.data.message)
      }
    })

    this.startTimerOut()
  }

  async onFinish() {
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

              localStorage.setItem('token', data.data?.tokens?.accessToken)
              localStorage.removeItem('hash')

              this.loading = false

              this.setSnackbarValues(
                'succes, darken-1',
                this.getGreetingMessage
              )

              setTimeout(() => {
                this.$router.push('/profile/' + this.userID)
              }, 500)
            })
        }
        this.loading = false
      })
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
