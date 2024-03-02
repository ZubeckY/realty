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

      <profile-avatar-logo-buttons @showPhotoDialog="showPhotoDialog"
                                   @changePhotoDialog="changePhotoDialog"
                                   @deletePhotoDialog="deletePhotoDialog" />

    </v-menu>

    <v-dialog v-model="dialogShowPhoto">
      <card class="profile-photo__dialog-card">
        <div class="profile-photo__dialog-card__container">

        </div>
      </card>
    </v-dialog>

    <v-dialog v-model="dialogChangePhoto">
      <card class="profile-photo__dialog-card">
        <div class="profile-photo__dialog-card__container">

        </div>
      </card>
    </v-dialog>

    <v-dialog v-model="dialogDeletePhoto">
      <card class="profile-photo__dialog-card">
        <div class="profile-photo__dialog-card__container">

        </div>
      </card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component
export default class ProfileAvatar extends Vue {
  user: any = {
    avatar: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
  };

  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  dialogShowPhoto: boolean = false;
  dialogChangePhoto: boolean = false;
  dialogDeletePhoto: boolean = false;

  showProfilePhotoActions: boolean = false;
  profilePhoto: string = this.user.avatar || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  // Открыть диалоговое окно с фотографией
  showPhotoDialog() {
    this.dialogShowPhoto = !this.dialogShowPhoto;
  }

  // Заменить фотографию
  changePhotoDialog() {
    this.dialogChangePhoto = !this.dialogChangePhoto;
  }

  // Удалить фотографию из профиля
  deletePhotoDialog() {
    this.dialogDeletePhoto = !this.dialogDeletePhoto;
  }


}
</script>
