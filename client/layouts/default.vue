<template>
  <v-app :class="themes[activeTheme]['background']">
    <v-main>
      <div class="main-container">
        <header-component>
          <component :is="currentHeader"></component>
        </header-component>

        <div class="d-flex" style="width: 100%; height: calc(100vh - 55px)">
          <menu-buttons v-model="profileLinks" class="pt-1"
                        :current-header="currentHeader" />

          <div class="overflow-y-auto pl-2 py-2" style="width: 100%;">
            <Nuxt class="pr-2"/>
          </div>
        </div>

      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class Default extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;
  profileLinks = [];
  currentHeader: string = ''

  created() {
    this.profileLinks = this.$store.getters["menu/getMenu"]
  }

  mounted() {
    this.setHeaderRouter()
  }

  changeHeader(value: string) {
    this.currentHeader = value
  }

  findIndexElement(value: string) {
    return this.profileLinks.findIndex((el: any) => el.routeName === value)
  }

  @Watch('$route')
  setHeaderRouter() {
    switch (this.$router.currentRoute.name){
      case 'news':
        let i = this.findIndexElement('news')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'profile-id':
        i = this.findIndexElement('profile-id')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'admin':
        i = this.findIndexElement('admin')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'realty':
        i = this.findIndexElement('realty')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'leads':
        i = this.findIndexElement('leads')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'deals':
        i = this.findIndexElement('deals')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'clients':
        i = this.findIndexElement('clients')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'feeds':
        i = this.findIndexElement('feeds')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      case 'chess':
        i = this.findIndexElement('chess')
        return this.currentHeader = this.profileLinks[i]['headerComponent']
      default:
        return ''
    }
  }

}
</script>
