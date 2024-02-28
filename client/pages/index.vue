<template>
  <div>
    <header-component />
    <section class="body mt-3">
      <div class="body-container">
        <div class="params">
          <card class="params-container pa-2">

            <card class="radius-small mb-2">
              <filter-realty-type v-model="realtyType" />
            </card>

            <card class="radius-small mb-2">
              <filter-price v-model="price"/>
            </card>

            <card class="radius-small">
              <filter-manager v-model="managerCurrent" />
            </card>

            <div class="d-flex flex-row justify-end">
              <v-btn class="radius-small white primary--text text--darken-1"
                     elevation="0" small>
                Применить
              </v-btn>

              <v-btn class="radius-small white error--text text--darken-1"
                     elevation="0" small @click="setDefaultParams">
                Сбросить
              </v-btn>
            </div>
          </card>
        </div>

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
import { Component, Vue } from "vue-property-decorator";
import FilterPrice from "~/components/filter/price.vue";
import FilterManager from "~/components/filter/manager.vue";
import FilterRealtyType from "~/components/filter/realty-type.vue";
import HeaderComponent from "~/components/header-component.vue";
import CatalogCard from "~/components/catalog-card.vue";
import Card from "~/components/card.vue";

@Component({
  components: {
    Card,
    HeaderComponent,
    FilterRealtyType,
    FilterManager,
    CatalogCard
  }
})
export default class Pages extends Vue {
  loading: boolean = true;
  realtyType: string[] = ["all"];

  // диапазон цен
  price: any = {
    min: 1_000_000,
    max: 45_000_000,
    range: [1_000_000, 45_000_000]
  }

  // Менеджер
  managerCurrent: any = [];

  reloadCatalog() {
    this.loading = true;
  }

  setDefaultParams() {
    this.realtyType = ["all"];

    this.price.min = 1_000_000;
    this.price.max = 45_000_000;
    this.price.range = [1_000_000, 45_000_000];

    this.managerCurrent = [];
  }
}
</script>
