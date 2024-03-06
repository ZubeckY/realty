<template>
  <v-app :class="themes[activeTheme]['background']">
    <Nuxt />
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Auth extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;
}
</script>
