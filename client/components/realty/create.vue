<template>
  <div>
    <v-btn
      @click="changeDialog"
      :color="usableColor"
      class="py-3 px-4"
      elevation="0"
      outlined
      x-small
    >
      Создать
      <v-icon class="ml-2" small>mdi-plus</v-icon>
    </v-btn>

    <action-dialog v-model="dialog"
                   :popup="true"
                   title="Добавить недвижимость"
                   text="">
      <div class="create-dialog__card">
        <div class="create-dialog__card-container">
          <a class="create-dialog__link"
             v-for="(item, i) in types"
             :href="'/realty/create/' + item[0]"
             :key="'link-create' + i"
             v-text="item[1]" />
        </div>
      </div>
    </action-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ColorTheme } from "~/assets/script/functions/colorTheme";

@Component
export default class RealtyCreate extends Vue {
  types: any = [];
  dialog: boolean = false;

  async mounted() {
    return await this.$axios
      .get("/api/realty/types")
      .then((data: any) => {
        if (data.data.message) {
          return console.log(data.data);
        }
        this.types = Object.entries(data.data["categoryTypeText"]);
      })
      .catch((e: any) => {
        console.log(e);
      });
  }

  changeDialog() {
    this.dialog = !this.dialog
  }

  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
