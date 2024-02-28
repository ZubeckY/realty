<template>
  <card>
    <v-form>

      <v-btn class="radius-small white error--text text--darken-1 mt-2"
             elevation="0" small>
        Войти
      </v-btn>
    </v-form>
  </card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Card from "~/components/card.vue";

@Component({
  components: { Card }
})
export default class Login extends Vue {
};
</script>
