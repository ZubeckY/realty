<template>
  <article :class="'' + themes[activeTheme]['article']">
    <v-btn-toggle v-model="currentHeaderLocal"
                  class="d-flex flex-column"
                  mandatory dense group tile>
      <v-btn v-for="({link, title, icon, headerComponent}, i) in filterProfileLinks"
             :class="'justify-start my-0 ' + themes[activeTheme]['title']"
             :key="'profile-list-item-' + i"
             :value="headerComponent"
             @click="$router.push(link)"
             small text>
        <v-icon class="mr-1" x-small>{{ icon }}</v-icon>
        <span>{{ title }}</span>
      </v-btn>
    </v-btn-toggle>

    <v-btn :class="'justify-start ' + themes[activeTheme]['text']"
           @click="changeDialog" block small text>
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
                <div class="d-flex flex-row">
                  <v-btn class="ma-0 pa-0" elevation="0"
                         @click="changePositionUp(item)"
                         :disabled="isFirstElement(item)"
                         color="primary darken-1" small icon>
                    <v-icon>mdi-arrow-up-bold</v-icon>
                  </v-btn>

                  <v-btn class="ma-0 pa-0" elevation="0"
                         @click="changePositionDown(item)"
                         :disabled="isLastElement(item)"
                         color="error darken-1" small icon>
                    <v-icon>mdi-arrow-down-bold</v-icon>
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

  </article>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from "vue-property-decorator";

@Component
export default class MenuButtons extends Vue {
  @VModel() profileLinks!: any;
  @Prop() currentHeader!: string;
  dialog: boolean = false;
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;
  currentHeaderLocal: string = ''

  headers: any = [
    {
      text: "Позиция",
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

  created() {
    this.changeCurrentHeaderLocal()
  }

  @Watch('$router.currentRoute')
  logRouter(){
    console.log(this.$router.currentRoute);
  }

  @Watch('currentHeader')
  changeCurrentHeaderLocal() {
    this.currentHeaderLocal = this.currentHeader
  }

  get filterProfileLinks() {
    return this.profileLinks
      .filter((item: any) => item.access && item.showItem)
      .sort(function(a: any, b: any) {
        return a.position - b.position;
      });
  }

  get filterProfileLinksToSettings() {
    return this.profileLinks
      .filter((item: any) => item.access)
      .sort(function(a: any, b: any) {
        return a.position - b.position;
      });
  }

  changeDialog() {
    this.dialog = !this.dialog;
  }

  changePositionUp(item: any) {
    // Если ошибочно первый элемент, отрезаем
    if (this.isFirstElement(item)) return;

    // Индекс текущего элемента
    let currentIndex = this.profileLinks.indexOf(item)

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
    let currentIndex = this.profileLinks.indexOf(item)

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
    return (this.profileLinks.indexOf(item)) === 0;
  }

  isLastElement(item: any): boolean {
    return (this.profileLinks.indexOf(item)) === (this.profileLinks.length - 1);
  }

}
</script>
