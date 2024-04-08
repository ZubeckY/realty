<template>
  <v-app>
    <section class="auth">
      <div class="auth-background" :style="currentBackgroundImage"></div>
      <Nuxt />
    </section>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'

@Component
export default class Auth extends Vue {
  get currentBackgroundImage() {
    const wallpapers = this.$store.state.user.settings.wallpapers

    let result =
      `background-image: url('` +
      require('~/static/' + wallpapers + '/' + TimesOfDay().time + '.png') +
      `')`

    setInterval(() => {
      result =
        `background-image: url('` +
        require('~/static/' + wallpapers + '/' + TimesOfDay().time + '.png') +
        `')`
    }, 60 * 60 * 1000)

    return result
  }
}
</script>
