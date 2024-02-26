<template>
  <v-app :class="themes[activeTheme]['background']">
    <v-main>
      <v-container>

        <Nuxt />
        <action-login-form :dialog="actionDialog"
                           :title="actionTitle"
                           :text="actionText"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionLoginForm from "~/components/action-login-form.vue";

@Component({
  components: { ActionLoginForm }
})
export default class Admin extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  actionDialog: boolean = true;
  actionTitle: string = "Вход в админ панель";
  actionText: string = "Вы пытаетесь войти в админ панель! Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.";

}
</script>
