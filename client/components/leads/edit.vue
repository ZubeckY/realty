<template>
  <div>
    <v-btn @click="changeDialog" class="mx-2" elevation="0" x-small icon>
      <v-icon color="primary darken-1">mdi-pencil</v-icon>
    </v-btn>
    <action-dialog v-model="dialog"
                   title=""
                   text="" >
      <leads-form />

    </action-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component

export default class LeadsEdit extends Vue {
  id: number = 1;
  dialog: boolean = false;

  changeDialog() {
    this.dialog = !this.dialog;
  }
};
</script>
