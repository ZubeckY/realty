<template>
  <div :class="'create__uploadItem ' + isDisabled">
    <div class="create__uploadButtons">
      <v-spacer />

      <v-btn @click="cancelOrDelete" elevation="0" color="white" x-small fab>
        <v-icon color="error darken-1">mdi-close</v-icon>
      </v-btn>
    </div>

    <img :src="previewImage()" alt="#" />

    <div v-if="!item.uploaded" class="create__uploadProgress">
      <v-progress-linear
        color="primary darken-1"
        :value="progress"
        height="6"
        stream
      />
    </div>

    <div class="create__uploadTitle">
      {{ imageTitle(item.file.name) }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({})
export default class UploadImage extends Vue {
  @Prop() item!: any
  progress: number = 0

  async created() {
    await this.uploadImage()
  }

  imageTitle(value: string) {
    return value.length >= 18
      ? value.substr(0, 10) + '...' + value.substring(value.length - 6)
      : value
  }


  /**
   * todo:
   *  1) upload запрос на собственный
   *  2) отмена upload запроса
   *  3) запрос на удаление файла
   * */
  async uploadImage() {
    const file = this.item.file
    await this.$axios.post('https://httpbin.org/post', file, {
      onUploadProgress: (progressEvent: any) => {
        const uploadResult = (progressEvent.loaded / progressEvent.total) * 100
        this.progress = Math.round(uploadResult)

        if (this.progress == 100) {
          setTimeout(() => {
            this.$emit('completeUpload')
          }, 300)
        }
      },
    })
  }

  cancelOrDelete() {
    if (!this.item.uploaded) {
      return console.log('now is uploading')
    }
    console.log('now is uploaded')
  }

  previewImage() {
    return URL.createObjectURL(this.item.file)
  }

  get isDisabled() {
    return this.item.uploaded ? '' : 'disabled'
  }
}
</script>
