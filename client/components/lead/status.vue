<template>
  <div>
    <v-skeleton-loader v-if="loading" type="heading"></v-skeleton-loader>
    <v-chip v-else :color="color" v-text="item" small dark></v-chip>
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";

@Component
export default class LeadStatus extends Vue {
  @VModel() item!: string;
  color: string = "";

  created() {
    this.getColor();
  }

  getColor() {
    return this.$store.dispatch("transaction/getColor", this.item)
      .then((data) => {
        return this.color = data;
      });
  }

  get loading() {
    return this.color === ''
  }

};
</script>
