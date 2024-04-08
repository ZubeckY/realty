<template>
  <div class="d-flex flex-row" style="width: 100%">
    <!-- Создать -->
    <v-btn
      @click="$router.push('/todo/create')"
      color="white"
      elevation="0"
      x-small
      fab
    >
      <v-icon color="primary darken-1">mdi-plus-box-outline</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class TodoHeader extends Vue {}
</script>
