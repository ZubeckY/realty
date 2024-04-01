<template></template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  layout: 'auth',
})
export default class Auth extends Vue {
  created() {
    const user = this.$store.state.user.user

    if (user.id === 0) {
      return this.$router.push('/auth/login')
    }
    this.$router.push('/profile/' + user.id)
  }
}
</script>
