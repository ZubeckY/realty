<template>
  <v-app>
    <section class="main">
      <div class="main-background" :style="currentBackgroundImage"></div>
      <div class="main-container" v-if="loading">
        <div class="d-flex justify-center align-center myFullScreen">
          <v-progress-circular
            color="primary darken-1"
            :size="80"
            :rotate="-90"
            :value="loaderValue"
            :indeterminate="loaderLoading"
          />
        </div>
      </div>
      <div class="main-container" v-else>
        <header-component>
          <component :is="currentHeader"></component>
        </header-component>

        <div class="d-flex myFullScreen">
          <menu-buttons v-model="profileLinks" />
          <div class="overflow-y-auto pa-2" style="width: 100%">
            <Nuxt class="pr-2" />
          </div>
        </div>
      </div>
    </section>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="2000"
      outlined
      text
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'
import checkAuth from '~/assets/script/functions/checkAuth'

@Component
export default class Default extends Vue {
  loading: boolean = true
  loaderValue: number = 0
  loaderLoading: boolean = true

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  profileLinks = []
  currentHeader: string = ''
  user: any = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    agency: {
      id: 0,
    },
  }

  async created() {
    this.profileLinks = JSON.parse(
      JSON.stringify(this.$store.getters['menu/getMenu'])
    )
  }

  async mounted() {
    this.myRouterController()
    if (process.client) {
      let user = JSON.parse(JSON.stringify(this.$store.state.user.user))
      let checkUser = await checkAuth(user)

      if (!checkUser) {
        return this.$router.push('/auth/login')
      }

      this.loaderValue = 0
      this.user = checkUser
      this.loaderLoading = false

      setTimeout(() => {
        this.loaderValue = 100
      }, 300)

      setTimeout(() => {
        this.loading = false
      }, 900)

      setTimeout(() => {
        this.setSnackbarValues('succes, darken-1', this.getGreetingMessage)
      }, 1200)
    }
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
    const wallpapers = this.$store.state.user.settings.wallpapers
    return (
      `background-image: url('` +
      require('~/static/' + wallpapers + '/' + TimesOfDay().time + '.png') +
      `')`
    )
  }

  get userName() {
    return JSON.parse(JSON.stringify(this.user.firstName))
  }

  get getGreetingMessage() {
    return TimesOfDay().greetings + ' ' + this.userName
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }
}
</script>
<style>
.myFullScreen {
  width: 100%;
  height: calc(100vh - 40px);
}
</style>
