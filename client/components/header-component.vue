<template>
  <header class="header">
    <div class="header-container">
      <div style="width: 100%; max-width: 152px">
        <v-btn
          color="primary darken-1"
          elevation="0"
          @click="$router.back()"
          small
        >
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn
          color="primary darken-1"
          elevation="0"
          @click="$router.forward()"
          small
        >
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </div>

      <div class="header-panel">
        <div class="header-search">
          <slot></slot>
        </div>
      </div>

      <v-spacer />

      <personal-button />
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class HeaderComponent extends Vue {}
</script>
