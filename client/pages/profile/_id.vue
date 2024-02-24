<template>
  <section class="profile">
    <div class="profile-container">

      <div class="profile-info">
        <div class="profile-info__container">

          <div class="profile-photo">
            <div class="profile-photo__container">

              <profile-avatar />

              <profile-button-group :editMode="editMode"
                                    @changeEditMode="changeEditMode" />

            </div>
          </div>

          <card class="profile-data">
            <div class="profile-data__container">
              <div class="profile-data__name">
                <!-- Имя -->
                <div v-if="!editMode" :class="themes[activeTheme]['title']">Имя</div>
                <div v-else class="profile-data__group">
                  <div class="profile-data__title">Имя</div>
                  <div class="small-input mr-3">
                    <v-text-field :disabled="!editMode"
                                  label="Имя"
                                  outlined
                                  counter
                                  dense />
                  </div>
                </div>

                <!-- Фамилия -->
                <div v-if="!editMode" :class="'ml-3 ' + themes[activeTheme]['title']">Фамилия</div>
                <div v-else class="profile-data__group ml-3">
                  <div class="profile-data__title">Фамилия</div>
                  <div class="small-input mr-3">
                    <v-text-field :disabled="!editMode"
                                  label="Фамилия"
                                  outlined
                                  counter
                                  dense />
                  </div>
                </div>
              </div>

            </div>
          </card>

        </div>
      </div>

    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import ProfileButtonGroup from "~/components/profile/button-group.vue"
import ProfileAvatar from "~/components/profile/avatar.vue"
import Card from "~/components/card.vue"

@Component({
  components: {
    ProfileButtonGroup,
    ProfileAvatar,
    Card
  }
})
export default class Profile extends Vue {
  themes: any = this.$store.state.themes
  activeTheme: string = this.$store.state.activeTheme
  editMode: boolean = false
  user: any = {
    avatar: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
  };

  changeEditMode(value: boolean) {
    this.editMode = value
  }

}
</script>
<style>
.profile-info__container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.profile-photo {
  width: 100%;
  max-width: 250px;
}

.profile-photo__wrapper {
  display: block;
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: var(--radius);
}

.profile-photo__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  object-position: 50% 50%;
  border-radius: var(--radius);
}

.profile-data {
  width: calc(100% - 265px);
  margin-left: 15px;
}

.profile-data__name {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.profile-data__title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}
</style>
