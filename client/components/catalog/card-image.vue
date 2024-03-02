<template>
  <div class="catalog-card__carousel-item-container">
    <div class="catalog-card__carousel-item-blur"
         :style="'background-image: url(' + image + ');'"></div>
    <img class="catalog-card__carousel-image"
         :src="image" alt="image" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CatalogCardImage extends Vue {
  @Prop() readonly image!: string;
}
</script>
