<template>
  <card :class="'catalog-card mb-3 ' + themes[activeTheme]['text']">
    <div class="catalog-card__container">
      <!-- catalog-card__wrapper -->
      <div class="catalog-card__wrapper radius">
        <div class="catalog-card__carousel">
          <!-- Слайды -->
          <v-carousel
            v-model="carousel"
            class="catalog-card__carousel-carousel radius"
            hide-delimiters
            show-arrows
          >
            <v-carousel-item
              class="catalog-card__carousel-item radius"
              v-for="(image, i) in imageList"
              :key="'catalog-card__carousel-item-' + i"
            >
              <img
                class="catalog-card__carousel-img radius"
                :src="image"
                alt="#"
              />
            </v-carousel-item>
          </v-carousel>

          <!-- Индикаторы вкладки -->
          <v-sheet
            class="catalog-card__carousel-pipki"
            color="rgba(0, 0, 0, .25)"
            max-width="260px"
          >
            <v-slide-group
              class="catalog-card__carousel-pipki_container"
              v-model="carousel"
              center-active
              show-arrows
            >
              <v-slide-item
                v-for="(item, i) in imageList"
                :key="i"
                v-slot="{ active, toggle }"
              >
                <!-- Вкладка -->
                <v-card
                  class="radius ma-1 mr-3"
                  :width="active ? '30px' : '12px'"
                  height="4px"
                  @click="toggle"
                >
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </div>

        <div class="catalog-card__info mt-1 mb-2">
          <div class="catalog-card__info-container">
            <!-- Название -->
            <h5
              :class="
                'catalog-card__title text-none pa-0 ' +
                themes[activeTheme]['title']
              "
            >
              <v-icon :class="'mr-1 ' + themes[activeTheme]['title']"
                >mdi-home
              </v-icon>
              Название объявления
            </h5>

            <!-- Адрес -->
            <div class="catalog-card__address">
              <v-icon :class="'mx-1 ' + themes[activeTheme]['text']" small
                >mdi-map-marker
              </v-icon>
              <span>Адрес действительный для данного объявления</span>
            </div>
          </div>

          <div style="flex: 1 0 auto"></div>

          <!-- Цена -->
          <div class="catalog-card__price">
            <div class="catalog-card__price-container">
              <div class="catalog-card__fullPrice">100 000 000 р</div>

              <div class="catalog-card__pricePerMeter">666 666 р/м2</div>
            </div>
          </div>

          <!-- Менеджер -->
          <div class="catalog-card__manager mt-3">
            <div class="catalog-card__manager-container d-flex">
              <!-- По клику просмотр фотографии -->
              <v-avatar class="mr-3">
                <img
                  src="https://cdn.vuetifyjs.com/images/john.jpg"
                  alt="John"
                />
              </v-avatar>

              <!-- По клику переход на пользователя -->
              <div class="catalog-card__manager-info">
                <div class="catalog-card__manager-name">Имя фамилия</div>
                <div class="catalog-card__manager-phone">
                  +7 (999)-111-11-11
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="catalog-card__footer"></div>-->
    </div>
  </card>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '~/components/card.vue'

@Component({
  components: { Card },
})
export default class CatalogCard extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme
  carousel: number = 0
  imageList: any = [
    'data:image/jpeg;base64,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',
    'data:image/jpeg;base64,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',
  ]
}
</script>
