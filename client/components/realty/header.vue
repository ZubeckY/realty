<template>
  <div class="d-flex flex-row" style="width: 100%;">
    <div class="small-input">
      <v-autocomplete label="Поиск"
                      :dark="usableTheme"
                      append-icon=""
                      hide-details
                      outlined
                      dense />
    </div>

    <!-- Фильтр -->
    <filter-dialog />

    <!-- Создать -->
    <realty-create />

    <!-- Корзина -->
    <v-btn color="white" elevation="0" x-small fab>
      <v-icon color="primary darken-1">mdi-delete</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component
export default class RealtyHeader extends Vue {
  get usableTheme() {
    return new ColorTheme().isDark()
  }
};
</script>
