<template>
  <header :class="'header ' + themes[activeTheme]['article']">
    <div class="header-container">

      <v-btn color="white" elevation="0" x-small fab>
        <v-icon color="primary darken-1">mdi-application-outline</v-icon>
      </v-btn>

      <div class="header-panel">
        <div class="header-search">
          <label class="header-search__label mx-2" for="search">
            <input
              :class="'header-search__input ' + themes[activeTheme]['input']"
              placeholder="Поиск"
              type="text"
              id="search"
            />
          </label>

          <!-- Фильтр -->
          <dialog-filter />

          <!-- Создать -->
          <dialog-create />

          <!-- Корзина -->
          <v-btn color="white" elevation="0" x-small fab>
            <v-icon color="primary darken-1">mdi-delete</v-icon>
          </v-btn>
        </div>
      </div>

      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn
            class="radius-small white primary--text text--darken-1"
            height="32px"
            elevation="0"
            v-bind="attrs"
            v-on="on"
            small
          >
            Пользователь
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in 3" :key="item" link>
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </div>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DialogCreate from '~/components/dialog/create.vue'
import DialogFilter from '~/components/dialog/filter.vue'

@Component({
  components: {
    DialogCreate,
    DialogFilter,
  },
})
export default class HeaderComponent extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme
}
</script>

<style>
.header {
  display: flex;
  width: 100%;
  height: 45px;
  padding: 0 10px;
  align-items: center;
  font-size: 14px !important;
  border-radius: var(--radius);
}

.header-container {
  display: flex;
  width: 100%;
  height: inherit;
  align-items: center;
}

.header-panel {
  display: flex;
  width: 100%;
  max-width: 600px;
  flex-direction: row;
  align-items: center;
}

.header-search {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
}

.header-search__input {
  display: block;
  width: 100vw;
  height: 32px;
  outline: none;
  padding: 0 7px;
  cursor: pointer;
  max-width: 450px;
  background: white;
  border-radius: var(--radius-small);
}
</style>
