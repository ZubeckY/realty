<template>
  <div class="d-flex">
    <div
      :class="'custom-chip radius py-1 px-2 ' + color"
      v-text="normalizeValue"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue, Watch } from 'vue-property-decorator'
import getColorTodo from '~/assets/script/functions/getColorTodo'
import {
  TodoStatus,
  todoStatusTypeText,
} from '~/assets/script/models/TodoStatus'

@Component
export default class LeadsStatus extends Vue {
  @VModel() item!: string

  get color(): string {
    return getColorTodo(this.item)
  }

  get normalizeValue() {
    const list = Object.keys(TodoStatus)
    const index = list.indexOf(this.item)
    return Object.values(todoStatusTypeText)[index]
  }
}
</script>
