<template>
  <v-form class="leadsForm">
    <div class="leasForm-container">
      <div class="leadsForm-title">О сделке</div>

      <div class="leadsForm-wrapper mt-3">
        <div>
          <v-text-field label="Имя Фамилия"
                        type="text"
                        outlined
                        dense />
        </div>

        <div>
          <v-text-field label="Телефон"
                        v-model="model.phone"
                        v-mask="'+7(###)-###-##-##'"
                        @click="changePhoneValue"
                        type="text"
                        outlined
                        dense />
        </div>

        <div>
          <v-text-field label="Стадия в воронке"
                        type="text"
                        outlined
                        dense />
        </div>

        <div>
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
import { Component, VModel, Vue, Watch } from "vue-property-decorator";

@Component

export default class LeadsForm extends Vue {
  model: Record<string, unknown> = {
    phone: ''
  }

  @Watch('model.phone')
  changePhoneValue() {
    if (this.model.phone == '') {
      this.model.phone = '+7('
    }
  }
};
</script>
<style>
.leadsForm-title {
  font-size: 14px;
  font-weight: bold;
}
</style>

