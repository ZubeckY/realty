<template>
  <v-app>
    <section class="main">
      <div class="main-background" :style="currentBackgroundImage"></div>
      <div class="main-container">
        <div class="d-flex" style="width: 100%; height: calc(100vh - 55px)">
          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
          <NuxtLink to="/news">Перейти в систему</NuxtLink>
        </div>
      </div>
    </section>
  </v-app>
</template>

<script >
import { TimesOfDay } from '~/assets/script/functions/timesOfDay'

export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  computed: {
    currentBackgroundImage: function () {
      return (
        `background-image: url('` +
        require('~/static/times/' + TimesOfDay().time + '.png') +
        `')`
      )
    },
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
  computed: {
    currentBackgroundImage: function () {
      return (
        `background-image: url('` +
        require('~/static/times/' + TimesOfDay().time + '.png') +
        `')`
      )
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
