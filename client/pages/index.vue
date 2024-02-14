<template>
  <div>
    <header-component />
    <section class="body mt-3">
      <div class="body-container">
        <article class="catalog">
          <div class="catalog-container">
            <catalog-card v-for="i in 4" :key="i" />
          </div>
        </article>

        <article class="params nightGlowArticle">
          <!--        <article class="params defaultArticle">-->
          <div class="params-container pa-2">
            <article
              class="radius-small nightGlowArticle mb-2"
              v-for="i in 7"
              :key="i"
            >

            </article>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderComponent from '~/components/header-component.vue'
import CatalogCard from '~/components/catalog-card.vue'

export default {
  name: 'IndexPage',
  components: { HeaderComponent, CatalogCard },
  data() {
    return {
      activeTheme: 'standard',
      themes: {
        standard: {
          background: 'defaultBack',
          input: 'defaultInput',
          button: '',
          article: 'defaultArticle',
        },
        nightGlow: {
          background: 'nightGlowBack',
          input: 'nightGlowInput',
          button: 'white',
          article: 'nightGlowArticle',
        },
      },
    }
  },
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
</style>
