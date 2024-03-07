<template>
  <card>
    <v-btn-toggle
      v-model="activeMenuItem"
      class="d-flex flex-column"
      :dark="usableTheme"
      mandatory
      dense
      group
      tile
    >
      <v-btn
        v-for="({ link, title, icon, routeName }, i) in filterProfileLinks"
        :class="'justify-start my-0 ' + usableText"
        :key="'profile-list-item-' + i"
        @click="$router.push(link)"
        :value="routeName"
        small
        text
      >
        <v-icon class="mr-1" x-small>{{ icon }}</v-icon>
        <span>{{ title }}</span>
      </v-btn>
    </v-btn-toggle>

    <v-btn
      :class="'justify-start ' + usableText"
      @click="changeDialog"
      block
      small
      text
    >
      <v-icon class="mr-1" x-small>mdi-cog</v-icon>
      <span>Настроить меню</span>
    </v-btn>

    <action-dialog v-model="dialog" title="Настроить меню" text="">
      <div class="changeMenu">
        <div class="changeMenu-container">
          <v-data-table
            :headers="headers"
            :items="filterProfileLinksToSettings"
            hide-default-footer
            dense
          >
            <template v-slot:item.position="{ item }">
              <td class="text-start">
                <div class="d-flex flex-row">
                  <v-btn
                    class="ma-0 pa-0"
                    elevation="0"
                    @click="changePositionUp(item)"
                    :disabled="isFirstElement(item)"
                    color="primary darken-1"
                    small
                    icon
                  >
                    <v-icon>mdi-arrow-up-bold</v-icon>
                  </v-btn>

                  <v-btn
                    class="ma-0 pa-0"
                    elevation="0"
                    @click="changePositionDown(item)"
                    :disabled="isLastElement(item)"
                    color="error darken-1"
                    small
                    icon
                  >
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
  </card>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue, Watch } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class MenuButtons extends Vue {
  @VModel() profileLinks!: any

  dialog: boolean = false

  activeMenuItem: string = ''

  headers: any = [
    {
      text: 'Позиция',
      value: 'position',
      sortable: false,
    },
    {
      text: 'Название',
      value: 'title',
      sortable: false,
    },
    {
      text: 'Показывать',
      value: 'showItem',
      sortable: false,
    },
  ]

  created() {
    const { name }: any = this.$router.currentRoute
    this.activeMenuItem = name
  }

  get filterProfileLinks() {
    return this.profileLinks
      .filter((item: Record<string, unknown>) => item.access && item.showItem)
      .sort(function (a: any, b: any) {
        return a.position - b.position
      })
  }

  get filterProfileLinksToSettings() {
    return this.profileLinks
      .filter((item: Record<string, unknown>) => item.access)
      .sort(function (a: any, b: any) {
        return a.position - b.position
      })
  }

  changeDialog() {
    this.dialog = !this.dialog
  }

  changePositionUp(item: Record<string, unknown>) {
    // Если ошибочно первый элемент, отрезаем
    if (this.isFirstElement(item)) return

    let currentIndex = this.profileLinks.indexOf(item)
    let previousIndex = currentIndex - 1
    let saveValue = this.profileLinks[currentIndex].position

    this.profileLinks[previousIndex].position = saveValue
    this.profileLinks[currentIndex].position = saveValue - 10

    return (this.profileLinks = this.profileLinks.sort(function (
      a: any,
      b: any
    ) {
      return a.position - b.position
    }))
  }

  changePositionDown(item: Record<string, unknown>) {
    // Если ошибочно последний элемент, отрезаем
    if (this.isLastElement(item)) return

    let currentIndex = this.profileLinks.indexOf(item)
    let nextIndex = currentIndex + 1
    let saveValue = this.profileLinks[currentIndex].position

    this.profileLinks[nextIndex].position = saveValue
    this.profileLinks[currentIndex].position = saveValue + 10

    return (this.profileLinks = this.profileLinks.sort(function (
      a: any,
      b: any
    ) {
      return a.position - b.position
    }))
  }

  isFirstElement(item: Record<string, unknown>): boolean {
    return this.profileLinks.indexOf(item) === 0
  }

  isLastElement(item: Record<string, unknown>): boolean {
    return this.profileLinks.indexOf(item) === this.profileLinks.length - 1
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableText() {
    return new ColorTheme().text()
  }
}
</script>
