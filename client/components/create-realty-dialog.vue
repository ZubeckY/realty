<template>
  <v-dialog
    v-model="dialog"
    width="100%"
    max-width="360px"
    transition="dialog-top-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        color="white"
        elevation="0"
        v-bind="attrs"
        v-on="on"
        x-small
        fab
      >
        <v-icon color="primary darken-1">mdi-plus-box-outline</v-icon>
      </v-btn>
    </template>

    <card class="create-dialog__card">
      <div class="create-dialog__card-container">
        <a
          class="create-dialog__link"
          v-for="(item, i) in types"
          :href="'/create/' + item[0]"
          :key="'link-create' + i"
          v-text="item[1]"
        ></a>
      </div>
    </card>

  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from "~/components/card.vue";

@Component({
  components: { Card }
})
export default class CreateRealtyDialog extends Vue {
  types: any = []
  dialog: boolean = false

  async mounted() {
    return await this.$axios
      .get('http://localhost:3000/api/realty/types')
      .then((data: any) => {
        if (data.data.message) {
          return console.log(data.data)
        }
        this.types = Object.entries(data.data['categoryTypeText'])
      })
      .catch((e: any) => {
        console.log(e)
      })
  }
}
</script>
<style>
.create-dialog__card {
  padding-block: 10px;
  padding-inline: 15px;
}

.create-dialog__link {
  display: block;
  font-weight: bold;
  text-decoration: none;
}

.create-dialog__link + .create-dialog__link {
  margin-top: 10px;
}
</style>
