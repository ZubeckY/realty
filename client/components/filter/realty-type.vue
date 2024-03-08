<template>
  <div>
    <div class="params-title">Тип недвижимости</div>

    <div class="params-content mt-2">
      <v-btn-toggle
        v-model="realtyType"
        :dark="usableTheme"
        :color="usableBlock"
        class="d-flex flex-column ma-0 pa-0"
        multiple
        group
        dense
        tile
      >
        <v-btn
          class="ma-0 justify-start radius"
          :color="usableBlock"
          value="all"
          text
          small
          block
        >
          Вся недвижимость
        </v-btn>
        <v-btn
          class="ma-0 justify-start radius"
          :color="usableBlock"
          text
          small
          block
        >
          Квартира
        </v-btn>
        <v-btn
          class="ma-0 justify-start radius"
          :color="usableBlock"
          text
          small
          block
        >
          Дома
        </v-btn>
        <v-btn
          class="ma-0 justify-start radius"
          :color="usableBlock"
          text
          small
          block
        >
          Гараж
        </v-btn>
        <v-btn
          class="ma-0 justify-start radius"
          :color="usableBlock"
          text
          small
          block
        >
          Коммерция
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, VModel, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class FilterRealtyType extends Vue {
  @VModel() realtyType!: any

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
