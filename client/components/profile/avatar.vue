<template>
  <div>
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

      <avatar-logo-buttons @showPhotoInDialog="showPhotoInDialog"/>
    </v-menu>

    {{ 'dialogPhotoWindow: ' + dialogPhotoWindow }}

  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator"
import AvatarLogoButtons from "~/components/profile/avatar-logo-buttons.vue"

@Component({
  components: { AvatarLogoButtons }
})
export default class ProfileAvatar extends Vue {
  user: any = {
    avatar: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
  };

  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  dialogPhotoWindow: boolean = false;
  showProfilePhotoActions: boolean = false;
  profilePhoto: string = this.user.avatar || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  showPhotoInDialog() {
    this.dialogPhotoWindow = !this.dialogPhotoWindow;
  }

  // Заменить фотографию
  changePhoto() {
  }

  // Удалить фотографию из профиля
  deletePhotoProfile() {
  }


}
</script>
