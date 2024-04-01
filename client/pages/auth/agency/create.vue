<template>
  <div class="auth-container">
    <div :class="'auth-card ' + (usableTheme ? 'dark' : 'light')">
      <v-form
        ref="valid"
        v-model="valid"
        lazy-validation
        :class="'auth-form ' + (usableTheme ? ' dark' : ' light')"
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
            label="Правовая форма"
            v-model="model.legalForm"
            :rules="[rules.required]"
            :disabled="disabled"
            :dark="usableTheme"
            outlined
          />
        </div>

        <v-btn
          class="radius-small primary darken-1 white--text mb-3"
          :dark="usableTheme"
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
  model: any = {
    title: '',
    inn: '',
    email: '',
    legalForm: '',
  }

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

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
