<template>
  <v-data-table :headers="headers"
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

    <template v-slot:item.status="{ item }">
      <td class="text-start">
        <v-chip :color="getColor(item.status)" small dark>
          {{ item.status }}
        </v-chip>
      </td>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon small color="primary darken-1" class="mr-2">mdi-pencil</v-icon>
      <v-icon small color="error darken-1">mdi-delete</v-icon>
    </template>

  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Feeds extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  search: string = "";
  headers: any = [
    { text: "id", value: "id" },
    { text: "Название", value: "title" },
    { text: "Комментарий", value: "comment" },
    { text: "Ссылка", value: "link" },
    { text: "Стадия в воронке", value: "created" },
    { text: "Активный фид", value: "active" },
    { text: "", value: "actions", sortable: false }
  ];

  feeds: any = [
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
  ];

  getColor(item: string) {
    switch (item.toLowerCase()) {
      case "потенциальный клиент":
        return "yellow darken-1";
      case "первый звонок":
        return "orange";
      case "покупатель прогрет":
        return "red";
      case "переход в сделку":
        return "lime";
      case "закрыто и не реализовано":
        return "green";
    }
  }

};
</script>

