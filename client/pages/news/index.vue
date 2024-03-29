<template>
  <div>
    <card class="newsCard">
      <div class="newsCard-container">
        <div class="newsCard-head">
          <div class="d-flex">
            <personal-button class="newsCard-user" />

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
            {{ postText }}
          </div>

          <div class="newsCard-content">
            <div class="newsCard-images">
              <v-carousel class="newsCard-images__carousel radius"
                          hide-delimiter-background>
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
                  <span>Видео</span>,
                  <span>Тэг</span>
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class News extends Vue {
  postImages = [
    {
      type: 'image',
      src: 'https://mimi-panda.com/wp-content/uploads/2023/02/marguerite-729510_640.jpg',
    },
    {
      type: 'video',
      src: 'https://www.youtube.com/embed/n6jEjkxnH84?si=jyskDacknLvQm5sz',
    },
  ]

  get postText() {
    return 'Здравствуйте! Добро пожаловать в демонстрационную версию CRM системы для риэлторов! Мы рады приветствовать вас в нашем сервисе, который поможет вам эффективно организовать работу, управлять клиентами, контрактами и объектами недвижимости. Надеемся, что наше решение станет надежным помощником в вашем бизнесе и сделает вашу работу более продуктивной и удобной. Если у вас возникнут вопросы или пожелания, не стесняйтесь обращаться к нашей службе поддержки. Благодарим вас за выбор нашей CRM системы!'
  }
}
</script>
