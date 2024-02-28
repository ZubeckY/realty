<template>
  <div>
    <div class="params-title">Цена</div>

    <div class="params-content">
      <v-range-slider v-model="defaultRangePrice"
                      :max="defaultMaxPrice"
                      :min="defaultMinPrice"
                      track-color="grey"
                      class="px-0"
                      hide-details>
      </v-range-slider>

      <div class="d-flex flex-row mt-1" style="width: 100%;">
        <div class="small-input">
          <v-text-field :value="defaultRangePrice[0]"
                        type="number"
                        label="min"
                        hide-details
                        outlined
                        dense
                        style="width: 100%; max-width: 120px"
                        @change="$set(rangePrice, 0, $event)" />
        </div>

        <div class="mx-2" />

        <div class="small-input">
          <v-text-field :value="defaultRangePrice[1]"
                        type="number"
                        label="max"
                        hide-details
                        outlined
                        dense
                        @change="$set(defaultRangePrice, 1, $event)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
@Component
export default class FilterPrice extends Vue {
  @Prop() minPrice!: number
  @Prop() maxPrice!: number
  @Prop() rangePrice!: number[]

  defaultMinPrice: number = 1_000_000;
  defaultMaxPrice: number = 45_000_000;
  defaultRangePrice: number[] = [1_000_000, 45_000_000];

  created() {
    this.changeDefaultValue()
  }

  @Watch('defaultMinPrice')
  @Watch('defaultMaxPrice')
  @Watch('defaultRangePrice')
  changeValue() {
    return this.$emit('changeValueRangePrice', {
      minPrice: this.defaultMinPrice,
      maxPrice: this.defaultMaxPrice,
      rangePrice: this.defaultRangePrice,
    })
  }

  @Watch('minPrice')
  @Watch('maxPrice')
  @Watch('rangePrice')
  changeDefaultValue() {
    this.defaultMinPrice = this.minPrice ?? this.defaultMinPrice
    this.defaultMaxPrice = this.maxPrice ?? this.defaultMaxPrice
    this.defaultRangePrice = this.rangePrice ?? this.defaultRangePrice
  }
};
</script>
