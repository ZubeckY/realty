<template>
  <div class="d-flex flex-row" style="width: 100%">
    <!-- Создать -->
    <v-btn
      @click="$router.push('/news/create')"
      :disabled="!disabled"
      :color="usableColor"
      class="py-3 px-4"
      elevation="0"
      outlined
      x-small
    >
      Создать
      <v-icon class="ml-2" small>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class NewsHeader extends Vue {
  userAgency = this.$store.state.user.user?.agency?.id

  get disabled() {
    return this.userAgency > 0
  }

  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
