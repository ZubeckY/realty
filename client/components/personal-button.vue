<template>
  <v-btn class="personal-button white primary--text text--darken-1"
         elevation="0" height="auto" small @click="$router.push('/profile/1')">
    <div class="personal-button__container">
        <v-avatar class="personal-button__avatar" size="34px">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg"
               alt="John">
        </v-avatar>

        <div class="personal-button__info">
          <div class="personal-button__name">Имя Фамилия</div>
          <div class="personal-button__role">Администратор</div>
        </div>

    </div>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class PersonalButton extends Vue {
};
</script>
<style>
.personal-button {
  height: auto;
  text-align: start !important;
  text-transform: none !important;
  border-radius: var(--radius-small) !important;
}

.personal-button__container {
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
}
.personal-button__info {
  display: flex;
  margin-left: 5px;
  flex-direction: column;
}

.personal-button__name {
  font-weight: 600 !important;
  margin-bottom: 3px;
}

.personal-button__role {
  font-weight: 400 !important;
}
</style>
