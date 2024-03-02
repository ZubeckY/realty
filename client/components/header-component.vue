<template>
  <header :class="'header ' + themes[activeTheme]['article']">
    <div class="header-container">
      <div style="width: 100%; max-width: 152px">
        <v-btn color="primary darken-1" elevation="0"
               @click="$router.back()"
               small text>
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn color="primary darken-1" elevation="0"
               @click="$router.forward()" small text>
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </div>

      <div class="header-panel">
        <div class="header-search">
          <slot></slot>
        </div>
      </div>

      <v-spacer />

      <personal-button />

    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

}
</script>
