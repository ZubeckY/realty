<template>
  <v-app>
    <section class="main">
      <div class="main-background" :style="currentBackgroundImage"></div>
      <div class="main-container">
        <header-component>
          <component :is="currentHeader"></component>
        </header-component>

        <div class="d-flex" style="width: 100%; height: calc(100vh - 55px)">
          <menu-buttons v-model="profileLinks" class="py-1" />
          <div class="overflow-y-auto pa-2" style="width: 100%">
            <Nuxt class="pr-2"/>
          </div>
        </div>

      </div>
    </section>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'

@Component
export default class Default extends Vue {
  profileLinks = []
  currentHeader: string = ''

  created() {
    this.profileLinks = JSON.parse(
      JSON.stringify(this.$store.getters['menu/getMenu'])
    )
  }

  mounted() {
    this.myRouterController()
  }

  @Watch('$route')
  myRouterController() {
    this.checkMenu()
    this.setHeader()
  }

  checkMenu() {
    const { name, path }: any = this.$router.currentRoute
    const i = this.findIndexElement(name)

    const profileLinks: any = this.profileLinks
    const element = profileLinks[i]

    if (!element) {
      const { position } = profileLinks.reduce(
        (prev: any, cur: any) => (cur.position > prev.position ? cur : prev),
        { position: -Infinity }
      )
      const newPosition = position + 10

      profileLinks.push({
        position: newPosition,
        icon: 'mdi-file-link-outline',
        title: 'Новая страница',
        link: path,
        access: true,
        showItem: true,
        routeName: name,
        headerComponent: '',
      })

      return (this.profileLinks = profileLinks)
    }
  }

  setHeader() {
    const { name }: any = this.$router.currentRoute
    const i = this.findIndexElement(name)
    return (this.currentHeader =
      this.profileLinks[i]['headerComponent'] ?? 'header-default-empty')
  }

  findIndexElement(value: string) {
    return this.profileLinks.findIndex(
      (el: Record<string, unknown>) => el.routeName === value
    )
  }

  get currentBackgroundImage() {
    return (
      `background-image: url('` +
      require('~/static/times/' + TimesOfDay().time + '.png') +
      `')`
    )
  }
}
</script>
