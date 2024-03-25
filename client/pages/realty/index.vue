<template>
  <section class="catalog pa-2">
    <div class="catalog-container">
      <catalog-card v-for="(item, i) in items" :item="item" :key="i" />
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Pages extends Vue {
  items: any[] = [
    {
      title: 'Квартира, 48м.кв',
      image: 'https://www.fontanka.ru/longreads/69055537/2020/images/tild3236-3039-4438-b935-366561386233__48.jpg'
    },
    {
      title: 'Студия, 36м.кв',
      image: 'https://darstroy-yug.ru/upload/medialibrary/f2f/f2f6636a50e3d1bb4dcd4726e31fa96f.jpg',
    },
    {
      title: 'Квартира, 49м.кв',
      image: 'https://darstroy-yug.ru/upload/medialibrary/bc3/zaxpqr3erfsy4rzu4gkr5mmoi3lvj4f5.jpg',
    },
    {
      title: 'Двухярусная квартира, 60м.кв',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoSDUQ5QhgBAeW8t0rDW9eCYn9kOnQt9OozA&usqp=CAU',
    },
  ]
}
</script>
