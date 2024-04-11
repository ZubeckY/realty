<template>
  <div class="d-flex flex-row" style="width: 100%;">
    <!-- Создать -->
    <v-btn @click="$router.push('/news/create')"
           :disabled="!disabled"
           color="white" elevation="0" x-small fab>
      <v-icon color="primary darken-1">mdi-plus-box-outline</v-icon>
    </v-btn>

    <!-- Корзина -->
    <v-btn :disabled="!disabled"
           class="mx-2" color="white"
           elevation="0" x-small fab>
      <v-icon color="primary darken-1">mdi-delete</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NewsHeader extends Vue {
  userAgency = this.$store.state.user.user?.agency?.id;

  get disabled() {
    return this.userAgency > 0;
  }
};
</script>
