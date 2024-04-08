<template>
  <div>
    <card class="mb-3">
      <h3 :class="usableText">Добавление новости</h3>

      <div class="create__group mt-3">
        <div class="create__title">Ссылка на видео Youtube</div>
        <div class="mr-3">
          <v-text-field
            v-model="videoModel"
            :dark="usableTheme"
            :disabled="disabled"
            type="text"
            outlined
            counter
            dense
          />
        </div>
      </div>

      <div class="create__group">
        <div class="create__title d-flex align-center">
          <div>Тэги</div>

          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-1"
                :color="usableColor"
                v-bind="attrs"
                v-on="on"
                small
                icon
              >
                <v-icon small>mdi-help-circle-outline</v-icon>
              </v-btn>
            </template>
            <div>Тэги отображаются внизу поста через запятую</div>
          </v-tooltip>
        </div>
        <div class="mr-3">
          <v-text-field
            v-model="model.tags"
            :dark="usableTheme"
            :disabled="disabled"
            type="text"
            outlined
            counter
            dense
          />
        </div>
      </div>

      <div class="create__group">
        <div class="create__title">Текст</div>
        <div class="mr-3">
          <v-textarea
            v-model="model.text"
            :dark="usableTheme"
            :disabled="disabled"
            type="text"
            rows="3"
            outlined
            counter
            dense
          />
        </div>
      </div>

      <div class="create__group">
        <div class="create__title">Фото</div>
        <div class="mr-3">
          <v-file-input
            @change="syncFiles"
            truncate-length="24"
            v-model="files"
            :dark="usableTheme"
            :disabled="disabled"
            placeholder="Выберите файлы"
            prepend-inner-icon="mdi-upload"
            prepend-icon=""
            accept="image/*"
            small-chips
            multiple
            outlined
            dense
            chips
          />
        </div>

        <div class="create__uploadList mb-3">
          <upload-image
            v-for="(item, i) in model.files"
            :key="'upload-image-' + i"
            @completeUpload="itemUpload(i)"
            @veryBigFile="veryBigFile(i)"
            @clearItem="clearItem(i)"
            :item="item"
          />
        </div>
      </div>

      <div class="create__group mb-3">
        <v-btn
          :color="usableColor"
          :loading="loading"
          :disabled="disabled"
          @click="createOne"
          outlined
          small
        >
          Создать
        </v-btn>
        <v-btn
          color="error darken-1"
          @click="$router.push('/news')"
          :disabled="disabled"
          outlined
          small
        >
          Отмена
        </v-btn>
      </div>
    </card>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="2000"
      outlined
      text
    >
      <span v-html="snackbarMessage"></span>
    </v-snackbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component({})
export default class Create extends Vue {
  loading: boolean = false
  disabled: boolean = false

  videoModel: string = ''

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  files: any = []

  model: any = {
    text: '',
    youtube: '',
    tags: [],
    files: [],
  }

  async createOne() {
    if (this.fileUploaded) {
      return this.setSnackbarValues(
        'error darken-1',
        'Нельзя создать пост, пока загружаются файлы'
      )
    }

    if (this.model.text === '') {
      return this.setSnackbarValues(
        'error darken-1',
        `
          Одно из перечисленных значений:
          <ul>
            <li>текст</li>
          </ul>
           должно быть заполнено
          `
      )
    }

    this.loading = true
    this.disabled = true
  }

  getId(url: string) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)

    return match && match[2].length === 11 ? match[2] : null
  }

  @Watch('videoModel')
  videoMarkup(): string {
    return this.getId(this.videoModel)
      ? (this.model.youtube = this.videoModel
          ? '//www.youtube.com/embed/' + this.getId(this.videoModel)
          : '')
      : ''
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  syncFiles() {
    for (let i = 0; i < this.files.length; i++) {
      let file = this.files[i]
      this.model.files.push({
        uploaded: false,
        file: file,
      })
    }
    this.files = []
  }

  veryBigFile(i: number) {
    this.setSnackbarValues(
      'error darken-1',
      'Файл очень большой, максимальный вес не должен привышать 15мб'
    )
    this.clearItem(i)
  }

  itemUpload(i: number) {
    return (this.model.files[i].uploaded = true)
  }

  clearItem(i: number) {
    if (i > -1) {
      return this.model.files.splice(i, 1)
    }
  }

  get fileUploaded() {
    return (
      this.model.files.map((file: any) => file.uploaded).indexOf(false) > -1
    )
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableColor() {
    return new ColorTheme().color()
  }

  get usableText() {
    return new ColorTheme().text()
  }
}
</script>
