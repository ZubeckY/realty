<template>
  <v-app>
    <v-main>
      <v-container>
        <Nuxt />
        <action-dialog
          :dialog="actionDialog"
          :confirm="true"
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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Admin extends Vue {
  actionDialog: boolean = true
  actionTitle: string = 'Вход в админ панель'
  actionText: string =
    'Вы пытаетесь войти в админ панель! \n Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.'

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
