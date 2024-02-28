<template>
  <v-menu offset-y>
    <template v-slot:activator="{ attrs, on }">
      <v-btn class="radius-small white primary--text text--darken-1"
             elevation="0" height="32px"
             v-bind="attrs" v-on="on" small>
        Пользователь
      </v-btn>
    </template>

    <header-component-buttons :userID="1" />

  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HeaderComponentButtons from "~/components/header-component-buttons.vue";

@Component({
  components: {
    HeaderComponentButtons
  }
})
export default class HeaderComponentMenu extends Vue {
};
</script>
