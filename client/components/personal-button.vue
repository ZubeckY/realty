<template>
  <v-btn
    :class="'personal-button ' + usableColor"
    @click="$router.push('/profile/1')"
    elevation="0"
    width="auto"
    height="auto"
    small
    text
  >
    <div class="personal-button__container">
      <v-avatar class="personal-button__avatar" size="34px">
        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>

      <div class="personal-button__info">
        <div class="personal-button__name">Имя Фамилия</div>
        <div class="personal-button__role">Администратор</div>
      </div>
    </div>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component
export default class PersonalButton extends Vue {
  @Prop() user?: any

  get usableColor() {
    return new ColorTheme().text()
  }
}
</script>
