<template>
  <div>
    <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>

    <v-data-table v-else
                  :headers="headers"
                  :items="leads"
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

      <template v-slot:item.phone="{ item }">
        <td class="text-start text-no-wrap">
          {{ item.phone }}
        </td>
      </template>

      <template v-slot:item.status="{ item }">
        <td class="text-start">
          <lead-status v-model="item.status" />
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <td class="text-start text-no-wrap">
          <v-icon small color="primary darken-1" class="mr-2">mdi-pencil</v-icon>
          <v-icon small color="error darken-1">mdi-delete</v-icon>
        </td>
      </template>

    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Leads extends Vue {
  loading: boolean = true
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

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

  leads: any =  []

  created() {
    // todo запрос на бек
    setTimeout(() => {
      this.leads = [
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
          id: 5,
          name: "Василий Иваныч",
          phone: "+7(999)-666-69-69",
          comment: "",
          status: "закрыто и не реализовано",
          created: "32.05.2024"
        }
      ];
      this.loading = false
    }, 300)
  }

};
</script>

