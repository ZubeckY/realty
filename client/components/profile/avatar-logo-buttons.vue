<template>
  <card class="py-0 px-0">
    <v-btn v-for="({text, func}, i) in profileActionsList"
           :class="'justify-start ' + themes[activeTheme]['title']"
           :key="'profile-list-item-' + i"
           @click="$emit(func)"
           block x-small text
           v-text="text"></v-btn>
  </card>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import Card from "~/components/card.vue";

@Component({
  components: { Card }
})
export default class AvatarLogoButtons extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  profileActionsList = [
    {
      text: "Просмотр фото",
      func: "showPhotoDialog"
    },
    {
      text: "Заменить фото",
      func: "changePhotoDialog"
    },
    {
      text: "Удалить фото",
      func: "deletePhotoDialog"
    }
  ];

};
</script>

