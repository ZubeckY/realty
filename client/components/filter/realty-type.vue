<template>
  <div>
    <div class="params-title">Тип недвижимости</div>

    <div class="params-content mt-2">
      <v-btn-toggle v-model="realtyType"
                    color="primary darken-1"
                    class="d-flex flex-column ma-0 pa-0"
                    multiple group dense tile>
        <v-btn class="ma-0 justify-start radius"
               color="primary darken-1" value="all"
               text small block>
          Вся недвижимость
        </v-btn>
        <v-btn class="ma-0 justify-start radius"
               color="primary darken-1"
               text small block>
          Квартира
        </v-btn>
        <v-btn class="ma-0 justify-start radius"
               color="primary darken-1"
               text small block>
          Дома
        </v-btn>
        <v-btn class="ma-0 justify-start radius"
               color="primary darken-1"
               text small block>
          Гараж
        </v-btn>
        <v-btn class="ma-0 justify-start radius"
               color="primary darken-1"
               text small block>
          Коммерция
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";

@Component
export default class FilterRealtyType extends Vue {
  @VModel() realtyType!: any
};
</script>
