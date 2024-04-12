<template>
  <div class="d-flex flex-row" style="width: 100%">
    <!-- Создать -->
    <v-btn
      @click="$router.push('/leads/create')"
      class="mr-2 py-3 px-4"
      :color="usableColor"
      elevation="0"
      outlined
      x-small
    >
      Создать
      <v-icon class="ml-2" x-small>mdi-plus</v-icon>
    </v-btn>

    <!-- Создать -->
    <v-btn
      @click="$router.push('/leads/upload')"
      class="py-3 px-4"
      :color="usableColor"
      elevation="0"
      outlined
      x-small
    >
      Выгрузка
      <v-icon class="ml-2" x-small>mdi-upload</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component
export default class LeadsHeader extends Vue {
  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
