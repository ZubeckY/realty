<template>
  <v-btn
    :class="'personal-button ' + usableText"
    @click="$router.push('/profile/' + userID)"
    elevation="0"
    width="auto"
    height="auto"
    small
    text
  >
    <div class="personal-button__container">
      <v-avatar class="personal-button__avatar" size="34px">
        <img :src="userPhoto" alt="John" />
      </v-avatar>

      <div class="personal-button__info">
        <div class="personal-button__name">{{ userName }}</div>
        <div class="personal-button__role">{{ userRole }}</div>
      </div>
    </div>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { userPhoto } from '~/assets/script/functions/userPhoto'

@Component
export default class PersonalButton extends Vue {
  @Prop() user?: Record<string, unknown>

  get userID() {
    return this.currentUser.id
  }

  get userName() {
    return this.currentUser.firstName + ' ' + this.currentUser.lastName
  }

  get userRole() {
    return this.currentUser.role
  }

  get userPhoto() {
    return userPhoto(this.currentUser?.avatar?.src)
  }

  get usableText() {
    return new ColorTheme().text()
  }

  get currentUser() {
    if (!!this.user) {
      return this.user
    } else {
      return JSON.parse(JSON.stringify(this.$store.state.user.user))
    }
  }
}
</script>
