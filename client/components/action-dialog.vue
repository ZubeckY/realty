<template>
  <v-dialog v-model="defaultDialog"
            width="100%"
            :max-width="defaultMaxWidth"
            :persistent="defaultPersistent">

    <card class="actionDialog">
      <v-form class="actionDialog__container">

        <div class="actionDialog__title"> {{ defaultTitle }}</div>
        <div class="actionDialog__text"> {{ defaultText }}</div>

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
              {{ defaultCancelText }}
            </v-btn>
          </div>

          <div v-else class="actionDialog__actions-container">
            <v-btn class="radius-small white primary--text text--darken-1"
                   elevation="0" small>
              {{ defaultConfirmText }}
            </v-btn>

            <v-btn class="radius-small white error--text text--darken-1"
                   elevation="0" small @click="isCanceled">
              {{ defaultCancelText }}
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
  @Prop() maxWidth?: string;
  @Prop() title?: string;
  @Prop() text?: string;
  @Prop() cancelText?: string;
  @Prop() confirmText?: string;
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

  defaultMaxWidth: string = '380px'
  defaultTitle: string = "Подтвердите действие";
  defaultText: string = "Вы пытаетесь совершить действие, с повышенными правами привилегии. \n Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.";
  defaultConfirmText: string = "Подтвердить";
  defaultCancelText: string = this.defaultPopup ? "Закрыть" : "Отмена";

  created() {
    this.changeDefaultValues();
  }

  @Watch("dialog")
  changeDefaultValues() {

    this.defaultPopup = this.popup ?? this.defaultPopup;
    this.defaultDialog = this.dialog ?? this.defaultDialog;
    this.defaultConfirm = this.confirm ?? this.defaultConfirm;
    this.defaultPersistent = this.confirm ? this.confirm : this.persistent ?? this.defaultPersistent;

    this.defaultText = this.text ?? this.defaultText
    this.defaultTitle = this.title ?? this.defaultTitle
    this.defaultMaxWidth = this.maxWidth ?? this.defaultMaxWidth
    this.defaultConfirmText = this.confirmText ?? this.defaultConfirmText;
    this.defaultCancelText = this.cancelText ?? this.defaultCancelText;

    this.$emit("changeDialog", this.defaultDialog);
  }

  isCanceled() {
    this.$emit("isCanceled");
  }

};
</script>
