<template>
  <card>
    <v-form>

      <v-btn class="radius-small white error--text text--darken-1 mt-2"
             elevation="0" small>
        Регистрация
      </v-btn>

      <action-dialog :popup="true"
                     :dialog="continueDialog"
                     title=""
                     text="" />

    </v-form>
  </card>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  layout: 'auth'
})
export default class Reg extends Vue {
  continueDialog: boolean = false
};
</script>
