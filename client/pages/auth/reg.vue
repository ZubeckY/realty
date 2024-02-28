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
import ActionDialog from "~/components/action-dialog.vue";
import Card from "~/components/card.vue";

@Component({
  components: { Card, ActionDialog }
})
export default class Reg extends Vue {
  continueDialog: boolean = false
};
</script>
