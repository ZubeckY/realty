<template>
  <card class="py-1 px-0">
    <v-btn v-for="({text, func}, i) in profileActionsList"
           class="justify-start"
           :key="'profile-list-item-' + i"
           @click="$emit(func)"
           block x-small text
           v-text="text"></v-btn>
  </card>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component
export default class AvatarLogoButtons extends Vue {


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

