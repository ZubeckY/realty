<template>
  <card class="py-1 px-0">
    <v-btn v-for="({link, title, icon}, i) in filterProfileLinks"
           :class="'justify-start ' + themes[activeTheme]['title']"
           :key="'profile-list-item-' + i"
           @click="$router.push(link)"
           block x-small text>
      <v-icon class="mr-1" x-small>{{ icon }}</v-icon>
      <span>{{ title }}</span>
    </v-btn>

    <v-btn :class="'justify-start ' + themes[activeTheme]['text']"
           @click="changeDialog" block x-small text>
      <v-icon class="mr-1" x-small>mdi-cog</v-icon>
      <span>Настроить меню</span>
    </v-btn>

    <action-dialog :dialog="dialog"
                   @isCanceled="changeDialog"
                   title="Настроить меню"
                   text="">
      <div class="changeMenu">
        <div class="changeMenu-container">

          <v-data-table :headers="headers"
                        :items="filterProfileLinksToSettings"
                        hide-default-footer dense>

            <template v-slot:item.position="{ item }">
              <td class="text-start">
                <div class="d-flex flex-column">
                  <v-btn class="ma-0 pa-0" elevation="0"
                         @click="changePositionUp(item)"
                         :disabled="isFirstElement(item)"
                         width="auto" height="auto" x-small text>
                    <v-icon>mdi-arrow-up-bold-circle</v-icon>
                  </v-btn>

                  <v-btn class="ma-0 pa-0" elevation="0"
                         @click="changePositionDown(item)"
                         :disabled="isLastElement(item)"
                         width="auto" height="auto" x-small text>
                    <v-icon>mdi-arrow-down-bold-circle</v-icon>
                  </v-btn>
                </div>
              </td>
            </template>

            <template v-slot:item.title="{ item }">
              <td class="text-start">
                <v-icon> {{ item.icon }}</v-icon>
                <span> {{ item.title }} </span>
              </td>
            </template>

            <template v-slot:item.showItem="{ item }">
              <v-checkbox v-model="item.showItem" hide-details dense />
            </template>
          </v-data-table>

        </div>
      </div>
    </action-dialog>

  </card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ActionDialog from "~/components/action-dialog.vue";
import Card from "~/components/card.vue";

@Component({
  components: { Card, ActionDialog }
})
export default class HeaderComponentButtons extends Vue {
  @Prop() userID!: number;

  dialog: boolean = false;
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  headers: any = [
    {
      text: "",
      value: "position",
      sortable: false
    },
    {
      text: "Название",
      value: "title",
      sortable: false
    },
    {
      text: "Показывать",
      value: "showItem",
      sortable: false
    }
  ];

  profileLinks = [
    {
      position: 10,
      icon: "mdi-account",
      title: "Профиль",
      link: this.getProfileLink(),
      access: true,
      showItem: true
    },
    {
      position: 20,
      icon: "mdi-city",
      title: "Недвижимость",
      link: "/",
      access: true,
      showItem: true
    },
    {
      position: 30,
      icon: "mdi-lead-pencil",
      title: "Лиды",
      link: "/leads",
      access: this.leadCondition,
      showItem: true
    },
    {
      position: 40,
      icon: "mdi-triangle-down",
      title: "Воронка",
      link: "/funnel",
      access: true,
      showItem: true
    },
    {
      position: 50,
      icon: "mdi-account-multiple-outline",
      title: "Клиенты",
      link: "/clients",
      access: true,
      showItem: true
    },
    {
      position: 60,
      icon: "mdi-ticket-confirmation",
      title: "Бронь",
      link: "/reservation",
      access: true,
      showItem: true
    },
    {
      position: 70,
      icon: "mdi-file-arrow-left-right",
      title: "Фиды",
      link: "/feeds",
      access: true,
      showItem: true
    },
    {
      position: 80,
      icon: "mdi-chess-rook",
      title: "Шахматка",
      link: "/chess",
      access: true,
      showItem: true
    }
  ];

  get filterProfileLinks() {
    return this.profileLinks
      .filter((item) => item.access && item.showItem)
      .sort(function(a: any, b: any) {
        return a.position - b.position;
      });
  }


  get filterProfileLinksToSettings() {
    return this.profileLinks
      .filter((item) => item.access)
      .sort(function(a: any, b: any) {
        return a.position - b.position;
      });
  }

  getProfileLink(): string {
    return "/profile/" + this.userID;
  }

  get leadCondition() {
    return true;
  }

  changeDialog() {
    this.dialog = !this.dialog;
  }

  changePositionUp(item: any) {
    // Если ошибочно первый элемент, отрезаем
    if (this.isFirstElement(item)) return;

    // Индекс текущего элемента
    let currentIndex = this.profileLinks
      .findIndex(el => el.position === item.position);

    // Индекс вышестоящего элемента
    let previousIndex = currentIndex - 1;

    // Сохраняем значение позиционки вышестоящего элемента
    let saveValue = this.profileLinks[currentIndex].position;

    // Присваиваем вышестоящему элементу значение текущего
    this.profileLinks[previousIndex].position = saveValue;

    // Присваиваем текущему элементу значение вышестоящего
    this.profileLinks[currentIndex].position = saveValue - 10;

    return this.profileLinks = this.profileLinks.sort(function(a: any, b: any) {
      return a.position - b.position;
    });
  }

  changePositionDown(item: any) {
    // Если ошибочно последний элемент, отрезаем
    if (this.isLastElement(item)) return;

    // Индекс текущего элемента
    let currentIndex = this.profileLinks
      .findIndex(el => el.position === item.position);

    // Индекс нижестоящего элемента
    let nextIndex = currentIndex + 1;

    // Сохраняем значение позиционки вышестоящего элемента
    let saveValue = this.profileLinks[currentIndex].position;

    // Присваиваем вышестоящему элементу значение текущего
    this.profileLinks[nextIndex].position = saveValue;

    // Присваиваем текущему элементу значение вышестоящего
    this.profileLinks[currentIndex].position = saveValue + 10;

    return this.profileLinks = this.profileLinks.sort(function(a: any, b: any) {
      return a.position - b.position;
    });
  }

  isFirstElement(item: any): boolean {
    return (this.profileLinks.findIndex(el => el.position === item.position)) === 0;
  }

  isLastElement(item: any): boolean {
    return (this.profileLinks.findIndex(el => el.position === item.position)) === (this.profileLinks.length - 1);
  }

}
</script>
