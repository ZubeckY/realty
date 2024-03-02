<template>
  <div>
    <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>

    <v-data-table v-else
                  :headers="headers"
                  :items="feeds"
                  :search="search"
                  :footer-props="{
                    showFirstLastPage: true,
                    firstIcon: 'mdi-arrow-collapse-left',
                    lastIcon: 'mdi-arrow-collapse-right',
                    prevIcon: 'mdi-minus',
                    nextIcon: 'mdi-plus',
                    itemsPerPageText: 'Кол-во элементов',
                    itemsPerPageOptions: [
                      10,
                      25,
                      50,
                      100,
                      -1
                    ]
                  }" dense>
      <template v-slot:item.link="{ item }">
        <a :href="item.link" target="_blank">{{ item.link }}</a>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small color="primary darken-1" class="mr-2">mdi-pencil</v-icon>
        <v-icon small color="error darken-1">mdi-delete</v-icon>
      </template>

      <template v-slot:item.active="{ item }">
        <v-checkbox v-model="item.active" hide-details dense />
      </template>

    </v-data-table>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Feeds extends Vue {
  loading: boolean = true
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  search: string = "";
  headers: any = [
    { text: "id", value: "id" },
    { text: "Название", value: "title" },
    { text: "Комментарий", value: "comment" },
    { text: "Ссылка", value: "link" },
    { text: "Дата создания", value: "created" },
    { text: "Активный фид", value: "active" },
    { text: "", value: "actions", sortable: false }
  ];

  feeds: any = [];

  created() {
    // todo запрос на бек
    setTimeout(() => {
      this.feeds = [
        {
          id: 1,
          title: "Avito feed 1",
          comment: "Фид всех элементов",
          link: "https://localhost:3000/api/feeds/12312421/",
          created: "32.05.2024",
          active: true
        },
        {
          id: 2,
          title: "ЖК 'Черёмушка'",
          comment: "Только объекты к жк черёмушка",
          link: "https://localhost:3000/api/feeds/12312421/",
          created: "32.05.2024",
          active: true
        },
        {
          id: 3,
          title: "Название",
          comment: "Комментарий",
          link: "https://localhost:3000/api/feeds/12312421/",
          created: "32.05.2024",
          active: true
        }
      ]
      this.loading = false
    }, 300)
  }

};
</script>

