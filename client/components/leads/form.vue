<template>
  <v-form class="leadsForm">
    <div class="leasForm-container">
      <div class="leadsForm-title">О сделке</div>

      <div class="leadsForm-wrapper mt-3">
        <div class="small-input">
          <v-text-field label="Название"
                        type="text"
                        outlined
                        dense />
        </div>

        <div class="small-input">
          <v-text-field label="Этап сделки"
                        type="text"
                        outlined
                        dense />
        </div>


        <div class="small-input">
          <filter-manager :hide-title="true"/>
        </div>

        <div class="small-input">
          <v-text-field label="Комментарий"
                        type="text"
                        outlined
                        dense />
        </div>

      </div>
    </div>
  </v-form>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";

@Component

export default class LeadsForm extends Vue {
};
</script>
<style>
.leadsForm-title {
  font-size: 14px;
  font-weight: bold;
}
</style>

