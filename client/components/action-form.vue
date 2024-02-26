<template>
  <v-dialog v-model="defaultDialog" max-width="275px" persistent>

    <card class="actionForm">
      <v-form class="actionForm__container">

        <div class="actionForm__title"> {{ currentTitle }}</div>
        <div class="actionForm__text "> {{ currentText }}</div>

        <div class="actionForm__textField mt-3" v-if="defaultConfirm">
          <div class="actionForm__textField-item small-input">
            <v-text-field
              label="Имя"
              type="text"
              outlined
              disabled
              dense
            />
          </div>

          <div class="actionForm__textField-item small-input">
            <v-text-field
              label="Пароль"
              outlined
              counter
              dense
            />
          </div>
        </div>

        <div class="actionForm__actions">
          <div class="actionForm__actions-container small-input">

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
export default class ActionForm extends Vue {
  @Prop() title?: string;
  @Prop() text?: string;
  @Prop() dialog?: boolean;
  @Prop() confirm?: boolean;

  defaultDialog: boolean = false;
  defaultConfirm: boolean = false;
  defaultTitle: string = "Подтвердите действие";
  defaultText: string = "Вы пытаетесь совершить действие, с повышенными правами привилегии. \n Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.";

  created() {
    this.changeDefaultValues();
  }

  @Watch("dialog")
  changeDefaultValues() {
    this.defaultDialog = this.dialog ?? this.defaultDialog;
    this.defaultConfirm = this.confirm ?? this.defaultConfirm;
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
.actionForm__title {
  font-weight: bold;
}

.actionForm__text {
  margin-block: 3px;
  font-size: 13px;
  word-break: normal;
  white-space: pre-line;
}

.actionForm__textField,
.actionForm__actions {
  display: flex;
  align-items: center;
  flex-direction: column;
}


.actionForm__actions-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
