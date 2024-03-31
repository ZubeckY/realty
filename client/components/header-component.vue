<template>
  <header :class="'header card radius-small box-shadow--none ' + usableBlock">
    <div class="header-container">
      <div class="menuButtons">
        <v-btn
          @click="$router.back()"
          :color="usableColor"
          elevation="0"
          small
          icon
        >
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn
          @click="$router.forward()"
          :color="usableColor"
          elevation="0"
          small
          icon
        >
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </div>

      <div class="header-panel">
        <div class="header-search">
          <slot></slot>
        </div>
      </div>

      <v-spacer />

      <personal-button class="mr-2" />
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class HeaderComponent extends Vue {
  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
