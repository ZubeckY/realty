<template>
  <div class="d-flex">
    <div :class="'leads-chip radius py-1 px-2 ' + color" v-text="item"></div>
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue, Watch } from "vue-property-decorator";
import getColorDeal from "~/assets/script/functions/getColorDeal";

@Component
export default class LeadsStatus extends Vue {
  @VModel() item!: string;

  get color(): string {
    return getColorDeal(this.item);
  }
};
</script>
<style>
.leads-chip {
  font-size: 13px;
  white-space: nowrap;
}
</style>
