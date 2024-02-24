<template>
  <card>
    <v-btn v-for="({text, func}, i) in profileActionsList"
           :key="'profile-list-item-' + i"
           @click="$emit(func)"
           :color="themes[activeTheme]['title']"
           v-text="text" block x-small text></v-btn>
  </card>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import Card from "~/components/card.vue"

@Component({
  components: { Card },
})
export default class AvatarLogoButtons extends Vue {

  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  profileActionsList = [
    {
      text: "Просмотр фото",
      func: "showPhotoInDialog"
    }
  ];
};
</script>

