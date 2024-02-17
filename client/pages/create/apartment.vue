<template>
  <div>

    <card>

    </card>

    <pre v-text="DATA"></pre>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from "~/components/card.vue";

@Component({
  components: { Card }
})
export default class CreateApartment extends Vue {
  DATA = {}

  async mounted() {
    return await this.$axios.get('http://localhost:3000/api/realty/create-flat-params')
      .then((data) => {
        this.DATA = data.data;
      })
      .catch((e) => {
        console.log(e);
      })
  }
}
</script>
