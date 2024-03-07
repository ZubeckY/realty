<template>
  <article :class="'card ' + usableBlock">
    <slot></slot>
  </article>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component
export default class Card extends Vue {
  get usableBlock() {
    return new ColorTheme().block()
  }
}
</script>
