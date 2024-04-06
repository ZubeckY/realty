<template>
  <div>
    <news-item v-for="post in posts" :key="'post-' + post['id']" :item="post" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import axiosAuthConfig from '~/assets/script/functions/axiosAuthConfig'

@Component
export default class News extends Vue {
  posts = []
  loading: boolean = true

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  async created() {
    if (process.client) {
      let authToken = localStorage.getItem('token')
      const agencyID = JSON.parse(
        JSON.stringify(this.$store.state.user.user.agency.id)
      )

      if (!authToken) {
        return null
      }

      await this.$axios
        .post(
          '/api/news/list/',
          {
            agency_id: agencyID,
          },
          {
            ...axiosAuthConfig(authToken, '', 'crm_client'),
          }
        )
        .then((data) => {
          if (data.data?.message) {
            this.setSnackbarValues('error darken-1', data.data.message)
            console.log(data.data.error)
            return
          }

          this.posts = data.data
          this.loading = false

          console.log(this.posts)
        })
    }
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  postImages = [
    {
      type: 'image',
      src: 'https://mimi-panda.com/wp-content/uploads/2023/02/marguerite-729510_640.jpg',
    },
    {
      type: 'video',
      src: '//www.youtube.com/embed/S_dfq9rFWAE',
    },
  ]
}
</script>
