<template>
  <section :class="'auth-login ' + animationToLogin">
    <div
      class="auth-login__background"
      :style="
        `background-image: url('` +
        require('~/static/times/' + getTimeBackground + '.png') +
        `')`
      "
    ></div>
    <div class="auth-login__container">
      <div :class="'auth-card ' + (isDarkValue ? 'dark' : 'light')">
        <v-form
          v-model="valid"
          lazy-validation
          @submit.prevent="stepper"
          :class="'auth-form ' + getAnimationAndHide + (isDarkValue ? ' dark' : ' light')"
        >
          <h2 class="mt-2 mb-8">Вход в систему</h2>

          <div class="auth-form__textField">
            <v-text-field
              label="Введите email"
              v-model="model.email"
              :rules="[rules.email, rules.required]"
              :append-icon="
                step >= 2
                  ? ''
                  : loading.email
                  ? 'mdi-clock-time-four-outline'
                  : 'mdi-arrow-right-bold-circle'
              "
              @click:append="findEmailToLogin"
              :loading="loading.email"
              :disabled="loading.email"
              :dark="isDarkValue"
              outlined
            />
          </div>

          <div v-if="step >= 2" class="auth-form__textField">
            <v-text-field
              label="Пароль"
              v-model="model.password"
              :rules="[rules.password, rules.length(8), rules.required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :dark="isDarkValue"
              outlined
              counter
            />
          </div>

          <v-btn
            class="radius-small primary darken-1 white--text mt-2"
            :dark="isDarkValue"
            :disabled="!valid"
            @click="stepper"
            elevation="0"
            small
            block
          >
            Войти
          </v-btn>

          <div
            class="my-6"
            style="width: 100%; display: flex; justify-content: center"
          >
            <v-checkbox
              color="primary darken-1"
              label="Запомнить меня!"
              :dark="isDarkValue"
              hide-details
              dense
            />
          </div>

          <div>
            <span>Нет аккаунта? </span>
            <a
              @click="$router.push('/auth/reg')"
              class="primary--text text--darken-1"
            >
              Создайте его прямо сейчас!
              <v-icon color="primary darken-1" small
                >mdi-arrow-top-right-thin
              </v-icon>
            </a>
          </div>

          <a
            @click="$router.push('/auth/forgot')"
            class="primary--text text--darken-1 my-2"
          >
            Забыли пароль
            <v-icon color="primary darken-1" small
              >mdi-arrow-top-right-thin
            </v-icon>
          </a>
        </v-form>

        <h2 :class="'auth-login__message ' + welcomeMessageAnimation + (isDarkValue ? ' dark' : ' light')">
          {{ welcomeMessage }}
        </h2>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'

@Component({
  layout: 'auth',
})
export default class Login extends Vue {
  step: number = 1

  valid: boolean = false
  showPassword: boolean = false

  loading: Record<string, unknown> = {
    email: false,
    password: false,
  }

  model: Record<string, any> = {
    email: '',
    password: '',
  }

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

  stepper() {
    switch (this.step) {
      case 1:
        return this.findEmailToLogin()
      case 2:
        return this.tryLogin()
    }
  }

  tryLogin() {
    this.step++
  }

  findEmailToLogin() {
    if (typeof this.rules.email(this.model.email) != 'string') {
      this.loading.email = !this.loading.email

      setTimeout(() => {
        this.loading.email = !this.loading.email

        this.step++
      }, 500)
    }
  }

  @Watch('model.email')
  showLoginButton() {
    if (this.model.email.length <= 0) {
      this.step--
    }
  }

  @Watch('step')
  startWelcomeAnimation() {
    switch (this.step) {
      case 3:
        return this.welcomeAnimationHideForm()
      case 4:
        return this.step++
      case 5:
      case 6:
      case 7:
        return this.startMessageAnimation()
      case 8:
        return this.$router.push('/news')
    }
  }

  get getTimeBackground() {
    return TimesOfDay().time
  }

  get getAnimationAndHide() {
    switch (this.step) {
      case 3:
        return 'scale-and-transparent__out'
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
        return 'opacity-hide'
      default:
        return ''
    }
  }

  get isDarkValue() {
    switch (TimesOfDay().time) {
      case 'morning':
      case 'afternoon':
        return false
      case 'evening':
      case 'night':
        return true
    }
  }

  get welcomeMessage() {
    return TimesOfDay().greetings
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

  get animationToLogin() {
    switch (this.step) {
      case 7:
        return 'transparent__out'
      case 8:
        return 'd-none'
    }
  }

  welcomeAnimationHideForm() {
    setTimeout(() => {
      this.step++
    }, 750)
  }

  startMessageAnimation() {
    setTimeout(() => {
      this.step++
    }, 750)
  }
}
</script>
<style>
.auth-login {
  height: 100vh;
  overflow: hidden;
}

.auth-login__background {
  width: 100%;
  height: inherit;
  background-size: auto 80%;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(5px) grayscale(80%);
  transform: scale(1.3);
}

.auth-login__container {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: inherit;
  height: inherit;
  align-items: center;
  justify-content: flex-end;
}

.auth-card {
  display: flex;
  width: 100%;
  height: 100vh;
  max-width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  backdrop-filter: blur(15px);
}

.auth-card.dark {
  background: #1f1f1f50;
}

.auth-card.light {
  background: #f1f1f150;
}

.auth-form {
  display: flex;
  width: 100%;
  max-width: 450px;
  margin-left: 20px;
  padding: 5px 10px;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  border-radius: var(--radius);
}

.auth-form.dark {
  color: white;
  border: 1px solid white;
}

.auth-form.light {
  color: black;
  border: 1px solid black;
}

.auth-form.scale-and-transparent__out {
  animation-name: scale-and-transparent__out;
  animation-duration: 0.75s;
}

.auth-form.opacity-hide {
  display: none;
}

.auth-login__message {
  margin: 0 auto;
  text-align: center;
}

.auth-login__message.dark {
  color: white;
}

.auth-login__message.light {
  color: black;
}

.auth-login__message.scale-and-transparent__inner {
  animation-name: scale-and-transparent__inner;
  animation-duration: 0.75s;
}

.auth-login.transparent__out,
.auth-login__message.transparent__out {
  animation-name: transparent__out;
  animation-duration: 0.75s;
}

@keyframes scale-and-transparent__inner {
  0% {
    scale: 0.7;
    opacity: 0;
  }

  100% {
    scale: 1;
    opacity: 1;
  }
}

@keyframes scale-and-transparent__out {
  0% {
    scale: 1;
    opacity: 1;
  }

  100% {
    scale: 0.7;
    opacity: 0;
  }
}

@keyframes transparent__out {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
