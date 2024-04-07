<template>
  <div>
    <card class="mb-3">
      <h3 :class="usableText">Добавление новости</h3>

      <div class="createRealty__group mt-3">
        <div class="createRealty__title">Ссылка на видео Youtube</div>
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

      <div class="createRealty__group">
        <div class="createRealty__title d-flex align-center">
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

      <div class="createRealty__group">
        <div class="createRealty__title">Текст</div>
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

      <div class="createRealty__group">
        <div class="createRealty__title">Фото</div>
        <div class="mr-3">
          <v-file-input
            @change="previewImage"
            truncate-length="24"
            v-model="model.files"
            :dark="usableTheme"
            :disabled="disabled"
            prepend-inner-icon="mdi-upload"
            prepend-icon=""
            accept="image/*"
            small-chips
            show-size
            multiple
            outlined
            counter
            dense
            chips
          />
        </div>

        <div class="createRealty__uploadList mb-3">
          <div
            class="createRealty__uploadItem"
            v-for="(src, i) in url_list"
            :key="'image-' + i"
          >
            <div class="createRealty__uploadButtons">
              <v-btn> < </v-btn>
              <v-btn> > </v-btn>
              <v-btn> X </v-btn>
            </div>

            <img :src="src" alt="#" />

            <div class="createRealty__uploadTitle">
              {{ imageTitle(model.files[i].name) }}
            </div>
          </div>
        </div>
      </div>

      <div class="createRealty__group mb-3">
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

  model: any = {
    text: '',
    youtube: '',
    tags: [],
    files: [],
  }

  url_list: any = []

  async createOne() {
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

  previewImage() {
    this.url_list = []
    for (let i = 0; i < this.model.files.length; i++) {
      let item = this.model.files[i]
      this.url_list.push(URL.createObjectURL(item))
    }
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  imageTitle(value: string) {
    return value.length >= 18
      ? value.substr(0, 10) + '...' + value.substring(value.length - 6)
      : value
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
