<template>
  <div>
    <header-component />
    <section class="body mt-3">
      <div class="body-container">
        <card class="params">
          <div class="params-container pa-2">
            <card class="radius-small mb-2" v-for="i in 7" :key="i"></card>
          </div>
        </card>

        <article class="catalog">
          <div class="catalog-container">
            <catalog-card v-for="i in 4" :key="i" />
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderComponent from '~/components/header-component.vue'
import CatalogCard from '~/components/catalog-card.vue'
import Card from '~/components/card.vue'

@Component({
  components: {
    Card,
    HeaderComponent,
    CatalogCard,
  },
})
export default class Pages extends Vue {}
</script>
<style>
.body {
  width: 100%;
  border-radius: var(--radius);
}

.body-container {
  display: flex;
  width: inherit;
  flex-direction: row;
}

.params {
  width: 100%;
  height: 80vh;
  max-width: 25%;
  border-radius: var(--radius);
}

@media (max-width: 940px) {
  .params {
    display: none;
  }
}
</style>
