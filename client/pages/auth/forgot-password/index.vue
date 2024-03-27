<template>
  <div class="auth-container">
    <div :class="'auth-card ' + usableBlock">
      <div v-if="step === 1" :class="'auth-form' + ' ' + usableBlock">
        <h2 class="auth-title mt-2 mb-8">Восстановление пароля</h2>

        <div class="auth-form__textField">
          <v-text-field
            label="Введите email"
            v-model="model.email"
            :rules="[rules.email, rules.required]"
            @click:append="findEmailToResetPassword"
            :append-icon="
              loading.email
                ? 'mdi-clock-time-four-outline'
                : 'mdi-arrow-right-bold-circle'
            "
            :dark="usableTheme"
            :loading="loading.email"
            :disabled="loading.email"
            type="email"
            outlined
          />
        </div>
      </div>

      <div v-else-if="step === 2" :class="'auth-form' + ' ' + usableBlock">
        <h2 class="auth-title mt-2 mb-8">Восстановление пароля</h2>
        <p>
          На вашу почту отправлено сообщение с ссылкой для восстановления
          пароля.
        </p>
        <p>Эту страницу теперь можно закрыть!</p>
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
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component({
  layout: 'auth',
})
export default class ForgotPassword extends Vue {
  step: number = 1
  valid: boolean = false

  model: Record<string, unknown> = {
    email: '',
    password: '',
  }

  loading: Record<string, boolean> = {
    email: false,
  }

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  rules = {
    email: (v: any) =>
      !!(v || '').match(/@/) ||
      'Введите действительный адрес электронной почты',
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

  async findEmailToResetPassword() {
    await this.$axios
      .post('/api/auth/forgot-password/', {
        email: this.model.email,
      })
      .then((data) => {
        if (data.data?.message) {
          this.setSnackbarValues('error darken-1', data.data.message)
          console.log(data.data.error)
          return
        }

        this.setSnackbarValues('success darken-1', 'Успешно')
        this.step++
      })
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }
}
</script>
