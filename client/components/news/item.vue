<template>
  <card class="newsCard">
    <div class="newsCard-container">
      <div class="newsCard-head">
        <div class="d-flex">
          <personal-button class="newsCard-user" :user="item.user" />

          <v-spacer />

          <div class="d-flex mt-2 mr-2">
            <v-btn color="primary darken-1" x-small icon>
              <v-icon>mdi-pin</v-icon>
            </v-btn>
            <v-btn color="primary darken-1" x-small icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </div>
        </div>

        <div class="newsCard-created">11.02.2024</div>
      </div>

      <div class="newsCard-body">
        <div class="newsCard-text">
          {{ item.text }}
        </div>

        <div class="newsCard-content">
          <div class="newsCard-images">
            <v-carousel
              class="newsCard-images__carousel radius"
              hide-delimiter-background
            >
              <v-carousel-item
                v-for="(item, i) in postImages"
                class="newsCard-images__carouselItem"
                :key="'newsCardImage-' + i"
              >
                <div class="newsCard-image" v-if="item.type === 'image'">
                  <img class="newsCard-image__img" :src="item.src" alt="#" />
                </div>

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

            <div class="newsCard-video__tags">
              <div class="newsCard-video__tags-title">Теги:</div>
              <div class="newsCard-video__tags-items">
                <span v-for="(text, i) in item.tags" :key="'tag-' + i">
                  {{ text }}
                </span>
                ,
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="newsCard-footer">
        <div class="newsCard-footer__container"></div>
      </div>
    </div>
  </card>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Item extends Vue {
  @Prop() item!: Record<string, unknown>

  postImages = [
    {
      type: 'image',
      src: 'https://mimi-panda.com/wp-content/uploads/2023/02/marguerite-729510_640.jpg',
    },
    {
      type: 'video',
      src: '//www.youtube.com/embed/S_dfq9rFWAE',
    },
  ]
}
</script>
