<template>
  <div class="d-flex">
    <div :class="'custom-chip radius py-1 px-2 ' + color" v-text="item"></div>
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue, Watch } from "vue-property-decorator"
import getColorTodo from "~/assets/script/functions/getColorTodo"

@Component
export default class TodoStatus extends Vue {
  @VModel() item!: string;

  get color(): string {
    return getColorTodo(this.item);
  }
};
</script>
