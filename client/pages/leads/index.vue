<template>
  <div>
    <header :class="'header mb-3 ' + themes[activeTheme]['article']">
      <div class="header-container">
        <div class="header-panel">
          <div class="header-search">
            <div class="small-input">
              <v-text-field v-model="search"
                            append-icon="mdi-magnify"
                            label="Поиск"
                            outlined dense
                            hide-details />
            </div>
          </div>
        </div>

        <v-spacer />

        <header-component-menu />
      </div>
    </header>

    <v-data-table :headers="headers"
                  :items="desserts"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "~/components/card.vue";
import HeaderComponentMenu from "~/components/header-component-menu.vue"

@Component({
  components: { Card, HeaderComponentMenu }
})
export default class Leads extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme

  search: string = "";
  headers: any = [
    { text: "id", value: "id" },
    { text: "Имя Фамилия", value: "name" },
    { text: "Телефон", value: "phone" },
    { text: "Комментарий", value: "comment" },
    { text: "Стадия в воронке", value: "status" },
    { text: "Дата создания", value: "created" },
    { text: "", value: "actions", sortable: false }
  ];

  desserts: any = [
    {
      id: 1,
      name: "Имя Фамилия",
      phone: "+7(900)-000-00-01",
      comment: "У лида есть своя карточка. ",
      status: "потенциальный клиент",
      created: "32.05.2024"
    },
    {
      id: 2,
      name: "Иван Васильевич",
      phone: "+7(800)-555-35-35",
      comment: "Хочу питсы",
      status: "первый звонок",
      created: "32.05.2024"
    },
    {
      id: 3,
      name: "просто Григорий",
      phone: "+7(666)-666-66-66",
      comment: "просто, всё просто",
      status: "покупатель прогрет",
      created: "32.05.2024"
    },
    {
      id: 4,
      name: "Купи Продай",
      phone: "+7(777)-666-66-77",
      comment: "куплю дорого, продам дёшево",
      status: "переход в сделку",
      created: "32.05.2024"
    },
    {
      id: 4,
      name: "Василий Иваныч",
      phone: "+7(999)-666-69-69",
      comment: "",
      status: "закрыто и не реализовано",
      created: "32.05.2024"
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

