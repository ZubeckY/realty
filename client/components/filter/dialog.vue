<template>
  <div>
    <!-- Создать -->
    <v-btn
      @click="changeDialog"
      :color="usableColor"
      class="mx-2 py-3 px-4"
      elevation="0"
      outlined
      x-small
    >
      Фильтр
      <v-icon class="ml-2" small>mdi-filter</v-icon>
    </v-btn>

    <action-dialog
      v-model="dialog"
      title="Фильтры"
      text=""
      cancel-text="Сбросить"
      @isCanceled="setDefaultParams"
    >
      <div class="create-dialog__card">
        <div class="create-dialog__card-container">
          <card class="radius-small mb-2">
            <filter-realty-type v-model="realtyType" />
          </card>

          <card class="radius-small mb-2">
            <filter-price v-model="price" />
          </card>

          <card class="radius-small">
            <filter-manager v-model="managerCurrent" />
          </card>
        </div>
      </div>
    </action-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component
export default class FilterDialog extends Vue {
  dialog: boolean = false

  changeDialog() {
    this.dialog = !this.dialog
  }

  loading: boolean = true
  realtyType: string[] = ['all']

  // Диапазон цен
  price: Record<string, unknown> = {
    min: 1_000_000,
    max: 45_000_000,
    range: [1_000_000, 45_000_000],
  }

  // Менеджер
  managerCurrent: any = []

  reloadCatalog() {
    this.loading = true
  }

  setDefaultParams() {
    this.realtyType = ['all']

    this.price.min = 1_000_000
    this.price.max = 45_000_000
    this.price.range = [1_000_000, 45_000_000]

    this.managerCurrent = []
  }

  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
