<template>
  <div>
    <v-menu v-model="showProfilePhotoActions"
            transition="slide-y-reverse-transition"
            style="max-width: 250px"
            rounded="lg"
            top>

      <template v-slot:activator="{ on, attrs }">
        <div class="profilePhoto__wrapper"
             v-bind="attrs"
             v-on="on">
          <img class="profilePhoto__img"
               alt="profilePhoto-avatar"
               :src="profilePhoto" />
        </div>
      </template>

      <profile-avatar-logo-buttons @showPhotoDialog="showPhotoDialog"
                                   @changePhotoDialog="changePhotoDialog"
                                   @deletePhotoDialog="deletePhotoDialog" />

    </v-menu>

    <v-dialog v-model="dialogShowPhoto">
      <card class="profilePhoto__dialog-card">
        <div class="profilePhoto__dialog-card__container">

        </div>
      </card>
    </v-dialog>

    <v-dialog v-model="dialogChangePhoto">
      <card class="profilePhoto__dialog-card">
        <div class="profilePhoto__dialog-card__container">

        </div>
      </card>
    </v-dialog>

    <v-dialog v-model="dialogDeletePhoto">
      <card class="profilePhoto__dialog-card">
        <div class="profilePhoto__dialog-card__container">

        </div>
      </card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";

@Component
export default class ProfileAvatar extends Vue {
  user: Record<string, unknown> = {
    avatar: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
  };

  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;

  dialogShowPhoto: boolean = false;
  dialogChangePhoto: boolean = false;
  dialogDeletePhoto: boolean = false;

  showProfilePhotoActions: boolean = false;

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

  get profilePhoto() {
    return this.user.avatar || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
  }

}
</script>
