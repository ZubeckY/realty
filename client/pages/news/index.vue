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
              <v-carousel>
                <v-carousel-item
                  v-for="(item, i) in postImages"
                  :key="'newsCardImage-' + i"
                >
                  <div class="newsCard-images__image">
                    <img :src="item.src" alt="#" />
                  </div>
                </v-carousel-item>
              </v-carousel>
            </div>

            <div class="newsCard-video">
              <div class="newsCard-video__container">
                <div class="newsCard-video__frameVideo radius">
                  <iframe
                    src="https://www.youtube.com/embed/n6jEjkxnH84?si=jyskDacknLvQm5sz"
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
      src: 'https://mimi-panda.com/wp-content/uploads/2023/02/marguerite-729510_640.jpg',
    },
  ]

  get postText() {
    return 'Здравствуйте! Добро пожаловать в демонстрационную версию CRM системы для риэлторов! Мы рады приветствовать вас в нашем сервисе, который поможет вам эффективно организовать работу, управлять клиентами, контрактами и объектами недвижимости. Надеемся, что наше решение станет надежным помощником в вашем бизнесе и сделает вашу работу более продуктивной и удобной. Если у вас возникнут вопросы или пожелания, не стесняйтесь обращаться к нашей службе поддержки. Благодарим вас за выбор нашей CRM системы!'
  }
}
</script>
