<template>
  <section class="catalog pa-2">
    <div class="catalog-container">
      <catalog-card v-for="i in 4" :key="i" />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Pages extends Vue {
}
</script>
