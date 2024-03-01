<template>
  <div>
    <v-btn @click="changeDialog" class="mx-2"
           color="white" elevation="0" x-small fab>
      <v-icon color="primary darken-1">mdi-plus-box-outline</v-icon>
    </v-btn>
    <action-dialog :popup="true"
                   :dialog="dialog"
                   :persistent="false"
                   @isCanceled="changeDialog"
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

@Component
export default class DialogCreate extends Vue {
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
}
</script>
