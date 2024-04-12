<template>
  <div class="d-flex flex-row" style="width: 100%">
    <!-- Создать -->
    <v-btn
      @click="$router.push('/clients/create')"
      class="mr-2 py-3 px-4"
      :color="usableColor"
      elevation="0"
      outlined
      x-small
    >
      Создать
      <v-icon class="ml-2" x-small>mdi-plus</v-icon>
    </v-btn>

    <!-- Выгрузка -->
    <v-btn
      @click="$router.push('/clients/upload')"
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
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class ClientsHeader extends Vue {
  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
