<template>
  <div>
    <v-btn @click="changeDialog" class="ml-2"
           color="white" elevation="0" x-small fab>
      <v-icon color="primary darken-1">mdi-filter-plus</v-icon>
    </v-btn>
    <action-dialog :dialog="dialog"
                   :persistent="false"
                   @isCanceled="changeDialog"
                   title="Фильтры"
                   text="">
      <div class="create-dialog__card">
        <div class="create-dialog__card-container">
          Фильтры
        </div>
      </div>
    </action-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ActionDialog from "~/components/action-dialog.vue";
import Card from "~/components/card.vue";

@Component({
  components: { Card, ActionDialog }
})
export default class DialogFilter extends Vue {
  dialog: boolean = false;

  changeDialog() {
    this.dialog = !this.dialog;
  }
}
</script>
