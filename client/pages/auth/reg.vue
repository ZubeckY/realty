<template>
  <section class="auth-reg">
    <div
      class="auth-background"
      :style="currentBackgroundImage"
    ></div>
    <div class="auth-container">
      <div :class="'auth-card ' + (isDarkValue ? 'dark' : 'light')">
        <v-form
          v-model="valid"
          lazy-validation
          @submit.prevent
          :class="'auth-form ' + (isDarkValue ? ' dark' : ' light')"
        >

          <h2 class="auth-title mt-2 mb-8">Регистрация</h2>

          <div class="d-flex">
            <div class="auth-form__textField">
              <v-text-field
                label="Имя"
                v-model="model.name"
                :rules="[rules.required]"
                :dark="isDarkValue"
                outlined
              />
            </div>

            <div class="mx-2"></div>

            <div class="auth-form__textField">
              <v-text-field
                label="Фамилия"
                v-model="model.surname"
                :rules="[rules.required]"
                :dark="isDarkValue"
                outlined
              />
            </div>
          </div>

          <div class="auth-form__textField">
            <v-text-field
              label="Введите email"
              v-model="model.email"
              :rules="[rules.email, rules.required]"
              :dark="isDarkValue"
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
              :dark="isDarkValue"
              outlined
              counter
            />
          </div>

          <v-btn
            class="radius-small primary darken-1 white--text"
            :dark="isDarkValue"
            :disabled="!valid"
            @click="stepper"
            elevation="0"
            small
            block
          >
            Войти
          </v-btn>

          <div class="auth-checkbox__wrapper my-4">
            <v-checkbox
              class="auth-checkbox"
              color="primary darken-1"
              label="Запомнить меня"
              :dark="isDarkValue"
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

        <h3 :class="'auth-message ' + (isDarkValue ? ' dark' : ' light')">
          {{ welcomeMessage }}
        </h3>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TimesOfDay } from "~/assets/script/functions/timesOfDay";

@Component({
  layout: "auth"
})
export default class Reg extends Vue {

  valid: boolean = false;

  show: Record<string, any> = {
    password: false
  }

  model: Record<string, any> = {
    name: "",
    surname: "",
    email: "",
    password: ""
  };

  rules = {
    email: (v: any) =>
      !!(v || "").match(/@/) ||
      "Введите действительный адрес электронной почты",
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

  stepper() {

  }

  get isDarkValue() {
    switch (TimesOfDay().time) {
      case "morning":
      case "afternoon":
        return false;
      case "evening":
      case "night":
        return true;
    }
  }

  get getTimeBackground() {
    return TimesOfDay().time;
  }

  get currentBackgroundImage() {
    return `background-image: url('` + require("~/static/times/" + this.getTimeBackground + ".png") + `')`;
  }

  get welcomeMessage() {
    return TimesOfDay().greetings;
  }

};
</script>
