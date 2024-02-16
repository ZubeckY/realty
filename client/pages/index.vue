<template>
  <div>
    <header-component :class="themes[activeTheme]['article']" />
    <section class="body mt-3">
      <div class="body-container">
        <article :class="'params ' + themes[activeTheme]['article']">
          <div class="params-container pa-2">
            <article
              :class="'radius-small mb-2 ' + themes[activeTheme]['article']"
              v-for="i in 7"
              :key="i"
            ></article>
          </div>
        </article>

        <article class="catalog">
          <div class="catalog-container">
            <catalog-card :class="themes[activeTheme]['article']" v-for="i in 4" :key="i" />
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderComponent from '~/components/header-component.vue'
import CatalogCard from '~/components/catalog-card.vue'

@Component({
  components: {
    HeaderComponent,
    CatalogCard,
  },
})
export default class Pages extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme
}
</script>
<style>
.body {
  width: 100%;
  border-radius: var(--radius);
}

.body-container {
  display: flex;
  width: inherit;
  flex-direction: row;
}

.params {
  width: 100%;
  height: 80vh;
  max-width: 25%;
  border-radius: var(--radius);
}

@media (max-width: 940px) {
  .params {
    display: none;
  }
}
</style>
