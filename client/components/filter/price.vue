<template>
  <div>
    <div class="params-title">Цена</div>

    <div class="params-content">
      <v-range-slider
        v-model="price.range"
        :dark="usableTheme"
        :max="price.max"
        :min="price.min"
        track-color="grey"
        class="px-0"
        hide-details
      >
      </v-range-slider>

      <div class="d-flex flex-row mt-1" style="width: 100%">
        <div class="small-input">
          <v-text-field
            :value="price.range[0]"
            :dark="usableTheme"
            type="number"
            label="min"
            hide-details
            outlined
            dense
            style="width: 100%; max-width: 120px"
            @change="$set(price.range, 0, $event)"
          />
        </div>

        <div class="mx-2" />

        <div class="small-input">
          <v-text-field
            :value="price.range[1]"
            :dark="usableTheme"
            type="number"
            label="max"
            hide-details
            outlined
            dense
            @change="$set(price.range, 1, $event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, VModel, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class FilterPrice extends Vue {
  @VModel() price!: any

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
