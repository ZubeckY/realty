<template>
  <card :class="'catalog-card ' + themes[activeTheme]['text']">
    <div class="catalog-card__container">

      <v-carousel class="catalog-card__carousel"
                  delimiter-icon="mdi-minus-thick"
                  height="150px">
        <v-carousel-item class="catalog-card__carousel-item"
                         v-for="i in 2" :key="i">
          <catalog-card-image :image="image" />
        </v-carousel-item>
      </v-carousel>

      <div class="catalog-card__content">
        <div class="catalog-card__content-container">

          <v-btn :class="'catalog-card__title ' + themes[activeTheme]['title']" elevation="0" text>
            <v-icon class="catalog-card__icon" :color="themes[activeTheme]['primaryColor']">mdi-home</v-icon>
            <span>Название объявления</span>
          </v-btn>

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
import Card from "~/components/card.vue";
import CatalogCardImage from "~/components/catalog-card-image.vue";

@Component({
  components: { Card, CatalogCardImage }
})
export default class CatalogCard extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme

  image: string = "https://etimg.etb2bimg.com/photo/69821429.cms";
  // image: string = 'https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1566895291281-ea63efd4bdbc'

}
</script>
