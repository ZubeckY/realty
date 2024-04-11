<template>
  <v-app>
    <div class="d-flex justify-center align-center overflow-hidden" style="width: 100%; height: 100vh">
      <card>
        <h1 v-if="error.statusCode === 404">
          {{ pageNotFound }}
        </h1>
        <h1 v-else>
          {{ otherError }}
        </h1>
        <NuxtLink to="/news">Перейти в систему</NuxtLink>
      </card>
    </div>
  </v-app>
</template>

<script>
import { TimesOfDay } from "~/assets/script/functions/timesOfDay";

export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred"
    };
  },

  head() {
    const title =
        this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  },
  computed: {
    currentBackgroundImage: function() {
      const wallpapers = this.$store.state.user.settings.wallpapers;
      return (
          `background-image: url('` +
          require("~/static/" + wallpapers + "/" + TimesOfDay().time + ".png") +
          `')`
      );
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
