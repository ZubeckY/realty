<template>
  <div>
    <card class="newsCard">
      <div class="newsCard-container">
        <div class="newsCard-head">
          <div class="d-flex">
            <personal-button class="newsCard-user" />

            <v-spacer/>

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
            {{ postText }}
          </div>

          <div class="newsCard-content">
            <div class="newsCard-images">
              <!--            <v-carousel class="catalog-card__carousel"-->
              <!--                        delimiter-icon="mdi-minus-thick"-->
              <!--                        height="180px">-->
              <!--              <v-carousel-item class="catalog-card__carousel-item"-->
              <!--                               v-for="i in 2" :key="i">-->
              <!--                <catalog-card-image :image="image" />-->
              <!--              </v-carousel-item>-->
              <!--            </v-carousel>-->
            </div>

            <div class="newsCard-video">
              <div class="newsCard-video__container">
                <div class="newsCard-video__frameVideo radius">
                  <iframe
                    src="https://www.youtube.com/embed/6u28g47nlPQ?si=bO2iE5DcgARiIHIM"
                    title="Видео на ютуб"
                    frameborder="0"
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>

                <div class="newsCard-video__tags">
                  <div class="newsCard-video__tags-title">Теги:</div>
                  <div class="newsCard-video__tags-items">
                    <span>Видео</span>,
                    <span>Тэг</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="newsCard-footer">
          <div class="newsCard-footer__container">

          </div>
        </div>

      </div>
    </card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class News extends Vue {

  get postText() {
    let text: string = 'Пост '
    for (let i = 0; i < 40; i++) {
      text += 'текст '
    }

    return text
  }
}
</script>
