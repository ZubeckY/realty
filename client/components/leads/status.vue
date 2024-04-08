<template>
  <div class="d-flex">
    <div :class="'custom-chip radius py-1 px-2 ' + color" v-text="normalizeValue"></div>
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue, Watch } from "vue-property-decorator";
import getColorDeal from "~/assets/script/functions/getColorDeal";
import { DealStages } from "~/assets/script/models/DealStages";

@Component
export default class LeadsStatus extends Vue {
  @VModel() item!: string;

  get color(): string {
    return getColorDeal(this.normalizeValue);
  }

  get normalizeValue() {
    const list = Object.keys(DealStages)
    const index = list.indexOf(this.item)
    return Object.values(DealStages)[index]
  }
};
</script>
