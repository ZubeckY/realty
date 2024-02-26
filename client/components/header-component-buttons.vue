<template>
  <card class="py-1 px-0">
    <v-btn v-for="({link, title}, i) in profileLinks"
           :class="'justify-start ' + themes[activeTheme]['title']"
           :key="'profile-list-item-' + i"
           @click="$router.push(link)"
           block x-small text
           v-text="title"></v-btn>
  </card>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import Card from "~/components/card.vue"

@Component({
  components: { Card },
})
export default class HeaderComponentButtons extends Vue {
  @Prop() userID!: number
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  profileLinks = [
    {
      title: 'Профиль',
      link: this.getProfileLink()
    },
    {
      title: 'Фиды',
      link: '/feeds'
    },
    {

    }
  ]

  getProfileLink(): string {
    return '/profile/' + this.userID
  }
}
</script>
