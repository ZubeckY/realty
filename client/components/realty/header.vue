<template>
  <div class="d-flex flex-row align-center" style="width: 100%">
    <div class="small-input">
      <v-autocomplete
        label="Поиск"
        :dark="usableTheme"
        append-icon=""
        hide-details
        outlined
        dense
      />
    </div>

    <!-- Фильтр -->
    <filter-dialog />

    <!-- Создать -->
    <realty-create />

    <!-- Корзина -->
<!--    <v-btn-->
<!--      class="mx-2 py-3 px-4"-->
<!--      :color="usableColor"-->
<!--      elevation="0"-->
<!--      outlined-->
<!--      x-small-->
<!--    >-->
<!--      Корзина-->
<!--      <v-icon class="ml-2" x-small>mdi-delete</v-icon>-->
<!--    </v-btn>-->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class RealtyHeader extends Vue {
  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
