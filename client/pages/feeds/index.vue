<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :dark="usableTheme"
      type="table"
    ></v-skeleton-loader>

    <v-data-table
      v-else
      :dark="usableTheme"
      :headers="headers"
      :items="list"
      :search="search"
      no-data-text="Нет данных"
      :class="'custom-table ' + usableBlock"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        itemsPerPageText: 'Кол-во элементов',
        itemsPerPageOptions: [10, 25, 50, 100, -1],
      }"
      dense
    >
      <template v-slot:item.link="{ item }">
        <a :href="item.link" target="_blank">{{ item.link }}</a>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small color="primary darken-1" class="mr-2">mdi-pencil</v-icon>
        <v-icon small color="error darken-1">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class Feeds extends Vue {
  loading: boolean = true

  search: string = ''
  headers: any = [
    { text: 'id', value: 'id' },
    { text: 'Название', value: 'title' },
    { text: 'Комментарий', value: 'comment' },
    { text: 'Ссылка', value: 'link' },
    { text: 'Дата создания', value: 'created' },
    { text: '', value: 'actions', sortable: false },
  ]

  list: any = []

  created() {
    // todo запрос на бек
    setTimeout(() => {
      this.list = [
        {
          id: 1,
          title: 'Avito feed 1',
          comment: 'Фид всех элементов',
          link: 'https://localhost:3000/api/feeds/12312421/',
          created: '32.05.2024',
        },
        {
          id: 2,
          title: "ЖК 'Черёмушка'",
          comment: 'Только объекты к жк черёмушка',
          link: 'https://localhost:3000/api/feeds/12312421/',
          created: '32.05.2024',
        },
        {
          id: 3,
          title: 'Название',
          comment: 'Комментарий',
          link: 'https://localhost:3000/api/feeds/12312421/',
          created: '32.05.2024',
        },
      ]
      this.loading = false
    }, 300)
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
