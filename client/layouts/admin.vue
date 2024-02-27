<template>
  <v-app :class="themes[activeTheme]['background']">
    <v-main>
      <v-container>

        <Nuxt />
        <action-form :dialog="actionDialog"
                     :confirm="actionConfirm"
                     :title="actionTitle"
                     :text="actionText"
                     @changeDialog="changeDialog"
                     @isCanceled="closeDialog"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionForm from "~/components/action-form.vue";

@Component({
  components: { ActionForm }
})
export default class Admin extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  actionDialog: boolean = true;
  actionConfirm: boolean = true;
  actionTitle: string = "Вход в админ панель";
  actionText: string = "Вы пытаетесь войти в админ панель! \n Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.";

  changeDialog(value: boolean) {
    this.actionDialog = value
  }

  closeDialog() {
    this.actionDialog = false

    setTimeout(() => {
      this.$router.back()
    }, 300)
  }

}
</script>
