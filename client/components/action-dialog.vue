<template>
  <v-dialog v-model="defaultDialog" max-width="360px"
            :persistent="defaultPersistent">

    <card class="actionDialog">
      <v-form class="actionDialog__container">

        <div class="actionDialog__title"> {{ currentTitle }} </div>
        <div class="actionDialog__text"> {{ currentText }} </div>

        <div class="actionDialog__textField mt-3" v-if="defaultConfirm">
          <div class="actionDialog__textField-item small-input">
            <v-text-field label="Имя"
                          type="text"
                          outlined
                          disabled
                          dense />
          </div>

          <div class="actionDialog__textField-item small-input">
            <v-text-field :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="showPassword ? 'text' : 'password'"
                          @click:append="showPassword = !showPassword"
                          label="Пароль"
                          outlined
                          counter
                          dense />
          </div>
        </div>

        <div class="actionDialog__customContent">
          <div class="actionDialog__customContent-container">
            <slot></slot>
          </div>
        </div>

        <div class="actionDialog__actions">
          <div v-if="defaultPopup" class="actionDialog__actions-container">
            <v-btn class="radius-small white primary--text text--darken-1"
                   elevation="0" small block @click="isCanceled">
              Закрыть
            </v-btn>
          </div>

          <div v-else class="actionDialog__actions-container">
            <v-btn class="radius-small white primary--text text--darken-1"
                   elevation="0" small>
              Подтвердить
            </v-btn>

            <v-btn class="radius-small white error--text text--darken-1"
                   elevation="0" small @click="isCanceled">
              Отмена
            </v-btn>
          </div>
        </div>

      </v-form>
    </card>
  </v-dialog>

</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class ActionDialog extends Vue {
  @Prop() title?: string;
  @Prop() text?: string;
  @Prop() popup?: boolean;
  @Prop() dialog?: boolean;
  @Prop() confirm?: boolean;
  @Prop() persistent?: boolean;
  @Prop() customContent?: boolean;

  showPassword: boolean = false;
  defaultPopup: boolean = false;
  defaultDialog: boolean = false;
  defaultConfirm: boolean = false;
  defaultPersistent: boolean = true;
  defaultTitle: string = "Подтвердите действие";
  defaultText: string = "Вы пытаетесь совершить действие, с повышенными правами привилегии. \n Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.";

  created() {
    this.changeDefaultValues();
  }

  @Watch("dialog")
  changeDefaultValues() {
    this.defaultPopup = this.popup ?? this.defaultPopup;
    this.defaultDialog = this.dialog ?? this.defaultDialog;
    this.defaultConfirm = this.confirm ?? this.defaultConfirm;
    this.defaultPersistent = this.confirm ? this.confirm : this.persistent ?? this.defaultPersistent;
    this.$emit("changeDialog", this.defaultDialog);
  }

  isCanceled() {
    this.$emit("isCanceled");
  }

  get currentTitle(): string {
    return this.title ?? this.defaultTitle;
  }

  get currentText(): string {
    return this.text ?? this.defaultText;
  }

};
</script>
<style>
.actionDialog__container {
  margin-top: 3px;
  margin-left: 3px;
}

.actionDialog__title {
  font-weight: bold;
}

.actionDialog__text {
  margin-block: 3px;
  font-size: 13px;
  word-break: normal;
  white-space: pre-line;
}

.actionDialog__textField,
.actionDialog__actions {
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

.actionDialog__customContent,
.actionDialog__customContent * {
  font-size: 13px;
}

.actionDialog__actions-container {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
}

</style>
