<template>
  <card class="newsCard">
    <div class="newsCard-container">
      <div class="newsCard-head">
        <div class="d-flex">
          <personal-button class="newsCard-user" :user="item.user" />

          <v-spacer />

          <div class="d-flex mt-2 mr-2">
            <v-menu v-model="menu" offset-y :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :color="usableColor"
                  v-bind="attrs"
                  v-on="on"
                  x-small
                  icon
                >
                  <v-icon>mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <card class="rounded-0">
                <v-btn :color="usableColor" x-small block text>
                  Редактировать
                  <v-icon class="ml-2" small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  @click="deleteDialog = !deleteDialog"
                  :color="usableColor"
                  class="mt-1"
                  x-small
                  block
                  text
                >
                  Удалить
                  <v-icon class="ml-2" small>mdi-delete</v-icon>
                </v-btn>
              </card>
            </v-menu>

            <action-dialog
              v-model="deleteDialog"
              @isConfirm="deleteItem"
              text="Вы действительно хотите удалить пост?"
              cancel-text="Отмена"
              confirm-text="Удалить"
            ></action-dialog>
          </div>
        </div>
        <div class="newsCard-created">{{ normalizeCreated(item.created) }}</div>
      </div>

      <div class="newsCard-body">
        <div class="newsCard-text">
          {{ item.text }}
        </div>

        <div class="newsCard-content" v-if="postImages.length > 0">
          <div class="newsCard-images">
            <v-carousel
              class="newsCard-images__carousel radius"
              :show-arrows="postImages.length > 1"
              hide-delimiter-background
            >
              <v-carousel-item
                v-for="(item, i) in postImages"
                class="newsCard-images__carouselItem"
                :key="'newsCardImage-' + i"
              >
                <a
                  v-if="item.type === 'image'"
                  class="newsCard-image"
                  :href="item.src"
                  target="_blank"
                >
                  <img class="newsCard-image__img" :src="item.src" alt="#" />
                </a>

                <div class="newsCard-video" v-if="item.type === 'video'">
                  <div class="newsCard-video__container">
                    <div class="newsCard-video__frameVideo">
                      <iframe
                        :src="item.src"
                        title="Видео на ютуб"
                        frameborder="0"
                        allowfullscreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </v-carousel-item>
            </v-carousel>

            <div class="newsCard__tags" v-if="item.tags.length > 0">
              <div class="newsCard__tags-title">Теги:</div>
              <div class="newsCard__tags-items">
                {{ item.tags }}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { normalizeDate } from '~/assets/script/functions/norlamizeDate'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import axiosAuthConfig from '~/assets/script/functions/axiosAuthConfig'
import getAuthToken from '~/assets/script/functions/getAuthToken'

@Component({})
export default class Item extends Vue {
  @Prop() item!: Record<string, any>
  menu: boolean = false
  postImages: any = []
  deleteDialog: boolean = false

  created() {
    const youtube: any = this.item.youtube
    const imagesList: any = this.item.images
    if (youtube) {
      this.postImages.push({
        type: 'video',
        src: youtube,
      })
    }

    for (let i = 0; i < imagesList.length; i++) {
      let image = imagesList[i]
      // todo заменить ссылку
      const path = 'http://localhost:4000' + image.path

      this.postImages.push({
        type: 'image',
        src: path,
      })
    }
  }

  async deleteItem() {
    if (process.client) {
      let authToken = getAuthToken()

      if (!authToken) {
        return null
      }

      await this.$axios
        .post(
          '/api/news/delete/' + this.item.id,
          {},
          {
            ...axiosAuthConfig(authToken, '', 'crm_client'),
          }
        )
        .then((data) => {
          if (data.data?.message) {
            return this.$emit('deleteError', data.data)
          }
          this.$emit('deleteAndRefresh')
        })
        .finally(() => {
          this.deleteDialog = false
        })
    }
  }

  normalizeCreated(date: any) {
    return normalizeDate(date)
  }

  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
