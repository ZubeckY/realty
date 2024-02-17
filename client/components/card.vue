<template>
  <article :class="'radius ' + themes[activeTheme]['article']">
    <slot></slot>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Card extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme

}
</script>
