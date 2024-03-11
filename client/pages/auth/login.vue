<template>
  <div :class="'auth-container ' + animationToLogin">
    <div :class="'auth-card ' + usableBlock">
      <v-form
        v-model="valid"
        @submit.prevent="stepper"
        :class="'auth-form' + ' ' + usableBlock + ' ' + getAnimationAndHide"
      >
        <h2 class="auth-title mt-2 mb-8">Вход в систему</h2>

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
            :error-messages="errorEmailMessage"
            :loading="loading.email"
            :disabled="loading.email"
            :dark="usableTheme"
            type="email"
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
          Войти
        </v-btn>

<!--        <div class="auth-bySocial mt-4">-->
<!--          <div class="auth-bySocial__container">-->
<!--            <card-->
<!--              class="auth-bySocial__card"-->
<!--              v-for="(item, key) in authServices"-->
<!--              :key="'auth-link-' + key"-->
<!--            >-->
<!--              <div-->
<!--                class="auth-bySocial__card-container"-->
<!--                @click="tryRegBySocial(item.icon)"-->
<!--              >-->
<!--                <div class="auth-bySocial__icon">-->
<!--                  <img :src="getItemIcon(item.icon)" :alt="item.icon" />-->
<!--                </div>-->

<!--                <div class="auth-bySocial__text">-->
<!--                  Продолжить с {{ item.text }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </card>-->
<!--          </div>-->
<!--        </div>-->

        <div class="auth-checkbox__wrapper my-4">
          <v-checkbox
            class="auth-checkbox"
            color="primary darken-1"
            label="Запомнить меня"
            :dark="usableTheme"
            hide-details
            dense
          />
        </div>

        <div class="auth-actions">
          <span class="auth-actions__title">Нет аккаунта? </span>
          <a
            @click="$router.push('/auth/reg')"
            class="auth-link primary--text text--darken-1"
          >
            Создайте его прямо сейчас!
            <v-icon color="primary darken-1" small
              >mdi-arrow-top-right-thin
            </v-icon>
          </a>
        </div>

        <a
          @click="$router.push('/auth/forgot')"
          class="auth-link primary--text text--darken-1 my-1"
        >
          Забыли пароль
          <v-icon color="primary darken-1" small
            >mdi-arrow-top-right-thin
          </v-icon>
        </a>
      </v-form>

      <h3
        :class="
          'auth-message' + ' ' + usableBlock + ' ' + welcomeMessageAnimation
        "
      >
        {{ welcomeMessage }}
      </h3>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component({
  layout: 'auth',
})
export default class Login extends Vue {
  step: number = 1

  valid: boolean = false
  showPassword: boolean = false

  errorEmailMessage: string = ''

  loading: Record<string, unknown> = {
    email: false,
    password: false,
  }

  model: Record<string, any> = {
    email: '',
    password: '',
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

  tryRegBySocial(value: string) {
    console.log(value)
  }

  async findEmailToLogin() {
    if (typeof this.rules.email(this.model.email) != 'string') {
      this.loading.email = !this.loading.email

      await this.$axios
        .post('/api/auth/user-exist/', {
          email: this.model.email,
        })
        .then((data: any) => {
          const result: boolean = data.data
          if (!result) {
            this.errorEmailMessage = 'Пользователя с таким email не существует!'
          } else {
            this.step++
          }
        })

      this.loading.email = !this.loading.email
    }
  }

  tryLogin() {
    // todo функция логина
    this.step++
  }

  getItemIcon(icon: string) {
    return require('@/static/logo/' + icon + '.svg')
  }

  @Watch('model.email')
  showLoginButton() {
    this.errorEmailMessage = ''

    if (this.model.email.length <= 0) {
      this.step = 1
    }
  }

  @Watch('step')
  startWelcomeAnimation() {
    switch (this.step) {
      case 3:
        return this.nextStepTimeout()
      case 4:
        return this.step++
      case 5:
      case 6:
      case 7:
        return this.nextStepTimeout()
      case 8:
        return this.$router.push('/news')
    }
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

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableText() {
    return new ColorTheme().text()
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

  nextStepTimeout() {
    setTimeout(() => {
      this.step++
    }, 750)
  }
}
</script>
