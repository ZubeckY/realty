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

          <card class="radius-small mb-2">
            <filter-realty-type v-model="realtyType" />
          </card>

          <card class="radius-small mb-2">
            <filter-price v-model="price" />
          </card>

          <card class="radius-small">
            <filter-manager v-model="managerCurrent" />
          </card>

          <div class="d-flex flex-row justify-end">
            <v-btn class="radius-small white primary--text text--darken-1"
                   elevation="0" small>
              Применить
            </v-btn>

            <v-btn class="radius-small white error--text text--darken-1"
                   elevation="0" small @click="setDefaultParams">
              Сбросить
            </v-btn>

          </div>
        </div>
      </div>
    </action-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DialogFilter extends Vue {
  dialog: boolean = false;

  changeDialog() {
    this.dialog = !this.dialog;
  }

  loading: boolean = true;
  realtyType: string[] = ["all"];

  // Диапазон цен
  price: any = {
    min: 1_000_000,
    max: 45_000_000,
    range: [1_000_000, 45_000_000]
  };

  // Менеджер
  managerCurrent: any = [];

  reloadCatalog() {
    this.loading = true;
  }

  setDefaultParams() {
    this.realtyType = ["all"];

    this.price.min = 1_000_000;
    this.price.max = 45_000_000;
    this.price.range = [1_000_000, 45_000_000];

    this.managerCurrent = [];
  }
}
</script>
