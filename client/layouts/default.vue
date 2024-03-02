<template>
  <v-app :class="themes[activeTheme]['background']">
    <v-main>
      <div class="main-container">
        <header-component>
          <component :is="currentHeader"></component>
        </header-component>

        <div class="d-flex" style="width: 100%;">
          <menu-buttons v-model="profileLinks" class="pt-1" />

          <div class="pa-2 pr-0" style="width: 100%;">
            <Nuxt />
          </div>
        </div>

      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Default extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;
  profileLinks = [];
  currentHeader: string = 'realty-header'

  created() {
    this.profileLinks = this.$store.getters["menu/getMenu"];
  }

}
</script>
