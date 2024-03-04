<template>
  <v-form class="leadsForm">
    <div class="leasForm-container">
      <div class="leadsForm-title">О сделке</div>

      <div class="leadsForm-wrapper mt-3">
        <div>
          <v-text-field label="Название"
                        type="text"
                        outlined
                        dense />
        </div>

        <div>
          <v-text-field label="Этап сделки"
                        type="text"
                        outlined
                        dense />
        </div>


        <div class="d-flex">
          <div class="small-input">
            <v-text-field label="Дата начала"
                          append-icon="mdi-calendar"
                          @click:append="date.start.menu = !date.start.menu"
                          v-model="date.start.value"
                          v-mask="'##.##.####'"
                          type="text"
                          outlined
                          dense />

            <v-menu ref="menuDateStart"
                    v-model="date.start.menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y min-width="auto">
              <v-date-picker v-model="date.start.picker" :min="minValue"
                             :active-picker.sync="date.start.pickerVal"/>
            </v-menu>
          </div>

          <div class="mx-1"></div>

          <div class="small-input">
            <v-text-field label="Дата завершения"
                          append-icon="mdi-calendar"
                          @click:append="date.end.menu = !date.end.menu"
                          v-model="date.end.value"
                          v-mask="'##.##.####'"
                          type="text"
                          outlined
                          dense />
            <v-menu ref="menuDateEnd"
                    v-model="date.end.menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y min-width="auto">
              <v-date-picker v-model="date.end.picker"
                             :min="minValue"
                             :active-picker.sync="date.end.pickerVal" />
            </v-menu>
          </div>
        </div>

        <div>
          <filter-manager v-model="managerCurrent" :hide-title="true" />
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
  managerCurrent: any = [];
  date = {
    start: {
      value: "",
      menu: false,
      picker: null,
      pickerVal: 'YEAR',
    },
    end: {
      value: "",
      menu: false,
      picker: null,
      pickerVal: 'YEAR',
    }
  };

  @Watch ('date.start.menu')
  changeStartPickerVal(val: boolean) {
      val && setTimeout(() => (this.date.start.pickerVal = 'YEAR'))
  }

  @Watch ('date.end.menu')
  changeEndPickerVal(val: boolean) {
      val && setTimeout(() => (this.date.end.pickerVal = 'YEAR'))
  }

  get minValue() {
    return (new Date(Date.now() -
        (new Date()).getTimezoneOffset() * 60000)
    ).toISOString().substring(0, 10);
  }

};
</script>
<style>
.leadsForm-title {
  font-size: 14px;
  font-weight: bold;
}
</style>

