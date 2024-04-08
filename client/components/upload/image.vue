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
  stopSignal: boolean = false
  cancelTokenSource = this.$axios.CancelToken.source();

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
   *  2) запрос на удаление файла
   * */
  async uploadImage() {
    const file = this.item.file

    if ((file.size / 1024 / 1024) > 15) {
      return this.$emit('veryBigFile')
    }

    await this.$axios.post('https://httpbin.org/post', file, {
      cancelToken: this.cancelTokenSource.token,
      onUploadProgress: (progressEvent: any) => {
        if (this.stopSignal) {
          this.cancelTokenSource.cancel('Upload_cancelled');
        }

        const uploadResult = (progressEvent.loaded / progressEvent.total) * 100
        this.progress = Math.round(uploadResult)

        if (this.progress == 100) {
          setTimeout(() => {
            this.$emit('completeUpload')
          }, 300)
        }
      },
    }).catch((e) => {
      if (e.message === 'Upload_cancelled') {
        return
      }
      console.log(e);
    })
  }

  cancelOrDelete() {
    if (!this.item.uploaded) {
      this.stopSignal = true
      this.$emit('clearItem')
      return
    }
    //
    this.$emit('clearItem')
  }

  previewImage() {
    return URL.createObjectURL(this.item.file)
  }

  get isDisabled() {
    return this.item.uploaded ? '' : 'disabled'
  }
}
</script>
