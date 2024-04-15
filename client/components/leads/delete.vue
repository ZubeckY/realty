<template>
  <div>
    <v-btn @click="changeDialog" class="mx-2" elevation="0" x-small icon>
      <v-icon color="error darken-1">mdi-delete</v-icon>
    </v-btn>
    <action-dialog v-model="dialog"
                   @isConfirm="isConfirm"
                   text="Вы действительно хотите удалить лид?" >
    </action-dialog>

  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
@Component

export default class LeadsDelete extends Vue {
  dialog: boolean = false

  isConfirm() {
    this.$emit('isConfirm')
    this.changeDialog()
  }

  changeDialog() {
    this.dialog = !this.dialog
  }
};
</script>
