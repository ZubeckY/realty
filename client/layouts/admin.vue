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
      <div
        class="main-container"
        v-else-if="disabledPage && !loading && isConfirmed"
      >
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

    <action-dialog
      v-if="disabledPage"
      v-model="needSuccess"
      @isCanceled="goToProfile"
      @isConfirm="tryLogin"
      @changePasswordVal="changePasswordVal"
      :confirm="true"
    ></action-dialog>

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
import axiosAuthConfig from '~/assets/script/functions/axiosAuthConfig'
import checkAuth from '~/assets/script/functions/checkAuth'

@Component
export default class Default extends Vue {
  isConfirmed: boolean = false

  model: Record<string, string> = {
    email: '',
    password: '',
  }

  loading: boolean = true
  loaderValue: number = 0
  loaderLoading: boolean = true

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  profileLinks = []
  currentHeader: string = ''

  needSuccess: boolean = false

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
    if (process.client) {
      let user = JSON.parse(JSON.stringify(this.$store.state.user.user))
      let checkUser = await checkAuth(user)

      if (!checkUser) {
        return this.$router.push('/auth/login')
      }

      this.user = checkUser
      await this.$store.dispatch('user/userValues', {
        payload: checkUser,
      })

      if (!this.disabledPage) {
        return this.$router.push('/profile/' + this.user.id)
      }

      const sessionID = sessionStorage.getItem('admin_key_id')
      if (!sessionID) {
        this.needSuccess = true
      } else {
        this.canselNeedConfirm()
      }

      this.profileLinks = JSON.parse(
        JSON.stringify(this.$store.getters['menu/getAdminMenu'])
      )

      this.myRouterController()

      if (!sessionID) {
        this.loaderValue = 0
        this.loaderLoading = false

        setTimeout(() => {
          this.loaderValue = 100
        }, 300)

        setTimeout(() => {
          this.loading = false
        }, 900)

        setTimeout(() => {
          this.setSnackbarValues('success, darken-1', this.getGreetingMessage)
        }, 1200)
      } else {
        this.loaderValue = 100
        this.loading = false
      }
    }
  }

  @Watch('$route')
  myRouterController() {
    this.checkMenu()
    this.setHeader()
  }

  checkMenu() {
    const { name, path }: any = this.$router.currentRoute
    const i = this.findIndexElement(path)

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
    const { path }: any = this.$router.currentRoute
    const i = this.findIndexElement(path)
    return (this.currentHeader =
      this.profileLinks[i]['headerComponent'] ?? 'header-default-empty')
  }

  findIndexElement(value: string) {
    return this.profileLinks.findIndex(
      (el: Record<string, unknown>) => el.link === value
    )
  }

  get currentBackgroundImage() {
    const userWallpapers = this.$store.state.user.user.wallpapers
    const defaultWallpapers = this.$store.state.user.settings.wallpapers
    const wallpapers = userWallpapers ?? defaultWallpapers

    let result =
      `background-image: url('` +
      require('~/static/' + wallpapers + '/' + TimesOfDay().time + '.png') +
      `')`

    setInterval(() => {
      result =
        `background-image: url('` +
        require('~/static/' + wallpapers + '/' + TimesOfDay().time + '.png') +
        `')`
    }, 30 * 60 * 1000)

    return result
  }

  changePasswordVal(value: string) {
    return (this.model.password = value)
  }

  async tryLogin() {
    this.model.email = this.userEmail

    if (process.client) {
      let authToken = localStorage.getItem('token')

      if (!authToken) {
        return null
      }

      await this.$axios
        .post(
          '/api/admin/login',
          {
            model: this.model,
          },
          {
            ...axiosAuthConfig(authToken, '', 'crm_client'),
          }
        )
        .then((data) => {
          if (data.data.message) {
            this.setSnackbarValues('error, darken-1', data.data.message)
            console.log(data.data.error)
            return
          }

          sessionStorage.setItem('admin_key_id', '' + Date.now())
          this.canselNeedConfirm()
          this.setSnackbarValues('success darken-1', 'Успешно')
        })
    }
  }

  canselNeedConfirm() {
    this.isConfirmed = true
    this.needSuccess = false
  }

  get userID() {
    return JSON.parse(JSON.stringify(this.user.id))
  }

  get userEmail() {
    return JSON.parse(JSON.stringify(this.user.email))
  }

  get userName() {
    return JSON.parse(JSON.stringify(this.user.firstName))
  }

  get getGreetingMessage() {
    return TimesOfDay().greetings + ' ' + this.userName
  }

  goToProfile() {
    this.$router.push('/profile/' + this.userID)
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  get disabledPage() {
    const { path } = this.$router.currentRoute
    const condition = this.user?.agency?.id > 0 && this.user.role != 'unknown'

    if (!condition) {
      return !condition && (path.includes('/profile') || path == '/news')
    }

    return condition && this.user.role.includes('admin')
  }
}
</script>
<style>
.myFullScreen {
  width: 100%;
  height: calc(100vh - 40px);
}
</style>
