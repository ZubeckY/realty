<template>
  <v-menu v-model="showProfilePhotoActions"
          transition="slide-y-reverse-transition"
          style="max-width: 250px"
          rounded="lg"
          top>

    <template v-slot:activator="{ on, attrs }">
      <div class="profile-photo__wrapper"
           v-bind="attrs"
           v-on="on">
        <img class="profile-photo__img"
             alt="profile-photo-avatar"
             :src="profilePhoto" />
      </div>
    </template>

    <v-list :class="'card ' + themes[activeTheme]['article']" dense tile>
      <v-list-item v-for="item in 4" :key="item" :color="themes[activeTheme]['title']" link>
        <v-list-item-title v-text="item"></v-list-item-title>
      </v-list-item>
    </v-list>

  </v-menu>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class ProfileAvatar extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme
  showProfilePhotoActions: boolean = true

  user: any = {
    avatar: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
  }

  profilePhoto: string = this.user.avatar || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
}
</script>
