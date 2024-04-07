<template>
  <div :class="'createRealty__uploadItem ' + isDisabled">
    <div class="createRealty__uploadButtons">
      <v-btn
          color="primary darken-1"
          :disabled="!item.upload"
          x-small
          icon>
        <v-icon>mdi-rotate-left</v-icon>
      </v-btn>
      <v-btn
          color="primary darken-1"
          :disabled="!item.upload"
          x-small
          icon>
        <v-icon>mdi-rotate-right</v-icon>
      </v-btn>

      <v-spacer />

      <v-btn color="error darken-1" x-small icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <img :src="previewImage()" alt="#" />

    <div v-if="!item.upload" class="createRealty__uploadProgress">
      <v-progress-linear
          color="primary darken-1"
          height="6"
          value="25"
          stream
      />
    </div>

    <div class="createRealty__uploadTitle">
      {{ imageTitle(item.file.name) }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class UploadImage extends Vue {
  @Prop() item!: any;

  imageTitle(value: string) {
    return value.length >= 18
        ? value.substr(0, 10) + "..." + value.substring(value.length - 6)
        : value;
  }

  previewImage() {
    return URL.createObjectURL(this.item.file);
  }

  get isDisabled() {
    return this.item.upload ? '' : 'disabled'
  }
}
</script>