<template>
  <header class="header nightGlowArticle">
    <!--    <header class="header defaultArticle">-->
    <div class="header-container">
      <div class="d-flex align-center" style="width: 100%">
        <v-btn color="white" elevation="0" x-small fab>
          <v-icon color="primary darken-1">mdi-application-outline</v-icon>
        </v-btn>
        <div
          class="d-flex flex-row align-center"
          style="width: 100%; max-width: 600px"
        >
          <div class="d-flex flex-row align-center" style="width: 100%">
            <label class="mx-2" for="search">
              <input class="" type="text" id="search" placeholder="Поиск" />
            </label>

            <v-btn color="white" elevation="0" x-small fab>
              <v-icon color="primary darken-1">mdi-filter-plus</v-icon>
            </v-btn>

            <v-btn class="mx-2" color="white" elevation="0" x-small fab>
              <v-icon color="primary darken-1">mdi-plus-box-outline</v-icon>
            </v-btn>

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
    </div>
  </header>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HeaderComponent',
})
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

input#search {
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
