<template>
  <v-dialog
    v-if="dialog"
    v-model="dialog"
    class="actionDialog"
    :persistent="confirm || persistent"
  >
    <card class="actionDialog__card" :style="'max-width: ' + maxWidth">
      <v-form class="actionDialog__container" v-model="valid">
        <div class="actionDialog__title" v-html="title"></div>
        <div class="actionDialog__text" v-html="text"></div>

        <div class="actionDialog__textField mt-3" v-if="confirm">
          <div class="actionDialog__textField-item small-input">
            <v-text-field
              :dark="usableTheme"
              :value="userName"
              label="Имя"
              type="text"
              outlined
              disabled
              dense
            />
          </div>

          <div class="actionDialog__textField-item small-input">
            <v-text-field
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :rules="confirm && [rules.password, rules.length(8), rules.required]"
              @input="changePasswordVal"
              v-model="passwordValue"
              :dark="usableTheme"
              label="Пароль"
              outlined
              counter
              dense
            />
          </div>
        </div>

        <div class="actionDialog__customContent">
          <div class="actionDialog__customContent-container">
            <slot></slot>
          </div>
        </div>

        <v-divider />

        <div v-if="!hideButtons" class="actionDialog__actions mt-2">
          <div v-if="popup" class="actionDialog__actions-container">
            <v-btn
              class="radius-small primary darken-1 white--text"
              elevation="0"
              x-small
              block
              @click="isCanceled"
            >
              {{ cancelText }}
            </v-btn>
          </div>

          <div v-else class="actionDialog__actions-container">
            <v-btn
              class="radius-small grey darken-1 white--text mr-2"
              elevation="0"
              x-small
              @click="isCanceled"
            >
              {{ cancelText }}
            </v-btn>

            <v-btn
              :disabled="confirm && !valid"
              class="radius-small primary darken-1 white--text"
              elevation="0"
              x-small
              @click="isConfirm"
            >
              {{ confirmText }}
            </v-btn>
          </div>
        </div>
      </v-form>
    </card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class ActionDialog extends Vue {
  @VModel({ default: false }) dialog!: boolean

  @Prop({ default: false }) readonly popup?: boolean
  @Prop({ default: false }) readonly confirm?: boolean
  @Prop({ default: false }) readonly persistent?: boolean
  @Prop({ default: false }) readonly hideButtons?: boolean
  @Prop({ default: false }) customContent?: boolean

  @Prop({ default: '380px' }) maxWidth?: string
  @Prop({ default: 'Подтвердите действие' }) title?: string
  @Prop({
    default:
      'Вы пытаетесь совершить действие, с повышенными правами привилегии. \n Для того, чтобы удостовериться, что действия выполняете Вы, введите пароль от своей учётной записи.',
  })
  text?: string
  @Prop({ default: 'Закрыть' }) cancelText?: string
  @Prop({ default: 'Подтвердить' }) confirmText?: string

  passwordValue: string = ''
  showPassword: boolean = false

  valid: boolean = false

  rules = {
    length: (len: any) => (v: any) =>
        (v || '').length >= (len ?? 8) ||
        `Недопустимая длина символов, требуется ${len} символов`,
    password: (v: any) =>
        !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
        'Пароль должен содержать заглавную букву, цифру и специальный символ.',
    required: (v: any) => !!v || 'Это поле обязательно к заполнению',
  }

  changePasswordVal() {
    this.$emit('changePasswordVal', this.passwordValue)
  }

  isConfirm() {
    this.$emit('isConfirm')
  }

  isCanceled() {
    this.dialog = !this.dialog
    this.$emit('isCanceled')
  }

  get userName() {
    return JSON.parse(JSON.stringify(this.$store.state.user.user.firstName))
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
