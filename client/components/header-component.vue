<template>
  <header :class="'header ' + themes[activeTheme]['article']">
    <div class="header-container">
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;
}
</script>
<style>
.header {
  display: flex;
  width: 100%;
  height: 45px;
  padding: 0 10px;
  align-items: center;
  font-size: 14px !important;
  border-radius: var(--radius);
}

.header-container {
  display: flex;
  width: 100%;
  height: inherit;
  align-items: center;
}

.header-panel {
  display: flex;
  width: 100%;
  max-width: 600px;
  flex-direction: row;
  align-items: center;
}

.header-search {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
}
</style>
