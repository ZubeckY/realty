<template>
  <v-dialog
    v-model="dialog"
    width="100%"
    max-width="360px"
    transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="white"
        elevation="0"
        v-bind="attrs"
        v-on="on"
        x-small
        fab
      >
        <v-icon color="primary darken-1">mdi-filter-plus</v-icon>
      </v-btn>
    </template>

    <card class="create-dialog__card">
      <div class="create-dialog__card-container">

        123

        <v-divider class="my-2" />
        <v-btn @click="dialog = false" block small text>Закрыть</v-btn>
      </div>
    </card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '~/components/card.vue'

@Component({
  components: { Card },
})
export default class DialogFilter extends Vue {
  dialog: boolean = false
}
</script>
