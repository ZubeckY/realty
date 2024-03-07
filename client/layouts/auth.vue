<template>
  <v-app >
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
    return (
      `background-image: url('` +
      require('~/static/times/' + TimesOfDay().time + '.png') +
      `')`
    )
  }
}
</script>
