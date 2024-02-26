<template>
  <v-dialog v-model="defaultDialog" max-width="420px" persistent>

    <card class="action-loginForm">
      <div class="action-loginForm__container">

        <div class="action-loginForm__title"> {{ currentTitle }} </div>
        <div class="action-loginForm__text"> {{ currentText }} </div>

        <div class="action-loginForm__textField mt-3">
          <div class="action-loginForm__textField-item">
            <v-text-field
              label="Имя"
              type="text"
              outlined
              disabled
              dense
            />
          </div>

          <div class="action-loginForm__textField-item">
            <v-text-field
              label="Пароль"
              type="password"
              outlined
              counter
              dense
            />
          </div>
        </div>

        <div class="action-loginForm__actions">
          <div class="action-loginForm__actions-container">

            <v-btn class="radius-small white primary--text text--darken-1"
                   elevation="0" small>
              Войти
            </v-btn>

            <v-btn class="radius-small white error--text text--darken-1"
                   elevation="0" small>
              Отмена
            </v-btn>

          </div>
        </div>

      </div>
    </card>
  </v-dialog>

</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActionLoginForm extends Vue {
  @Prop() title?: string;
  @Prop() text?: string;
  @Prop() dialog?: boolean;

  defaultDialog: boolean = false;
  defaultTitle: string = "Подтвердите действие";
  defaultText: string = "Вы пытаетесь совершить действие, с повышенными правами привилегии. \n Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.";

  created() {
    this.defaultDialog = this.dialog ? this.dialog : this.defaultDialog
  }

  get currentTitle(): string {
    return this.title ?? this.defaultTitle
  }

  get currentText(): string {
    return this.text ?? this.defaultText
  }

};
</script>
<style>
.action-loginForm__title {
  font-weight: bold;
}

.action-loginForm__text {
  margin-block: 3px;
  font-size: 13px;
  word-break: normal;
  white-space: pre-line;
}

.action-loginForm__actions-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
