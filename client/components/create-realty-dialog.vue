<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="mx-2"
        color="white"
        elevation="0"
        x-small
        fab
        v-bind="attrs"
        v-on="on"
      >
        <v-icon color="primary darken-1">mdi-plus-box-outline</v-icon>
      </v-btn>
    </template>

    <article>
      <div v-for="(item, i) in types" :key="i">
        <v-btn :value="item[0]" text dark>{{ item[1] }}</v-btn>
      </div>
    </article>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CreateRealtyDialog extends Vue {
  dialog: boolean = false
  types: any = []

  async mounted() {
    return await this.$axios
      .get('http://localhost:3000/api/realty/types')
      .then((data: any) => {
        if (data.data.message) {
          return console.log(data.data)
        }
        this.types = Object.entries(data.data.categoryTypeText)
      })
      .catch((e: any) => {
        console.log(e)
      })
  }
}
</script>
