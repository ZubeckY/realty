<template>
  <card :class="'catalog-card ' + themes[activeTheme]['text']">
    <div class="catalog-card__container">

      <v-carousel class="catalog-card__carousel"
                  delimiter-icon="mdi-minus-thick"
                  height="180px">
        <v-carousel-item class="catalog-card__carousel-item"
                         v-for="i in 2" :key="i">
          <catalog-card-image :image="image" />
        </v-carousel-item>
      </v-carousel>

      <div class="catalog-card__content">
        <div class="catalog-card__content-container">
          <div class="d-flex flex-row justify-space-between pr-1">

            <a :class="'catalog-card__title ' + themes[activeTheme]['title']">
              <v-icon class="catalog-card__icon" :color="themes[activeTheme]['primaryColor']">mdi-home</v-icon>
              <span>Название объявления</span>
            </a>

            <div class="catalog-card__menu">
              <v-btn icon small>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </div>

          </div>

          <div class="catalog-card__address">
            <v-icon class="catalog-card__icon" :color="themes[activeTheme]['color']">mdi-map-marker</v-icon>
            <span>Краснодар, ул. Красная, 123. кв 7</span>
          </div>

          <div style="flex: 1 0 auto"></div>

          <div class="catalog-card__price">
            <div class="catalog-card__price-container">
              <v-icon class="catalog-card__icon" :color="themes[activeTheme]['color']">mdi-currency-rub</v-icon>
              <div class="catalog-card__price-total">10 000 000 р</div>
              <div class="catalog-card__price-perMeter">500 000 р/м2</div>
            </div>
          </div>

          <div class="catalog-card__smallInfo">
            <div class="catalog-card__smallInfo-container">

              <div class="catalog-card__smallInfo-group">
                <div class="catalog-card__smallInfo-key">Тип недвижимости:</div>
                <div class="catalog-card__smallInfo-value">Квартира</div>
              </div>

              <div class="catalog-card__smallInfo-group">
                <div class="catalog-card__smallInfo-key">Площадь:</div>
                <div class="catalog-card__smallInfo-value">25 м2</div>
              </div>

            </div>
          </div>

          <div style="flex: 1 0 auto"></div>

          <div class="catalog-card__manager">
            <div class="catalog-card__manager-container">

              <v-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg"
                     alt="John">
              </v-avatar>

              <div class="catalog-card__manager-info">
                <div class="catalog-card__manager-name">Имя Фамилия</div>
                <div class="catalog-card__manager-phone">+7 (666) 999-66-99</div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  </card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CatalogCard extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  image: string = "https://via.placeholder.com/1920x1200/eee?text=16:10";

}
</script>
