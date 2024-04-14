<template>
  <v-autocomplete
    v-model="model"
    :dark="usableTheme"
    :disabled="disabled"
    :items="managerList"
    :rules="rules"
    item-value="id"
    item-text="firstName"
    type="text"
    clearable
    outlined
    chips
    dense
  >
    <template v-slot:selection="data">
      <v-chip
        :dark="usableTheme"
        v-bind="data.attrs"
        @click="data.select"
        :input-value="data.selected"
      >
        <v-avatar left>
          <v-img :src="getUserPhoto(data.item)"></v-img>
        </v-avatar>
        {{ getUserFullName(data.item) }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img :src="getUserPhoto(data.item)" alt="#" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title
            v-html="getUserFullName(data.item)"
          ></v-list-item-title>
          <v-list-item-subtitle v-html="data.item.role"></v-list-item-subtitle>
        </v-list-item-content>
      </template>
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { Vue, Component, VModel, Prop } from 'vue-property-decorator'
import axiosAuthConfig from '~/assets/script/functions/axiosAuthConfig'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { userPhoto } from '~/assets/script/functions/userPhoto'

@Component({})
export default class User extends Vue {
  @Prop() readonly rules!: any
  @Prop() readonly disabled!: boolean
  @VModel() model!: any

  managerList: any = []

  async created() {
    await this.initManagerList()
  }

  async initManagerList() {
    if (process.client) {
      let authToken = localStorage.getItem('token')
      const agencyID = JSON.parse(
        JSON.stringify(this.$store.state.user.user?.agency?.id)
      )

      if (!authToken) {
        return null
      }

      if (!agencyID) {
        return null
      }

      if (this.managerList.length) {
        return null
      }

      await this.$axios
        .post(
          '/api/user/list/binding/' + agencyID,
          {},
          {
            ...axiosAuthConfig(authToken, '', 'crm_client'),
          }
        )
        .then((data) => {
          if (data.data?.message) {
            console.log(data.data.message)
            console.log(data.data.error)
            return
          }
          this.managerList = data.data
        })
    }
  }

  getUserFullName(user: any) {
    return user.firstName + ' ' + user.lastName
  }

  getUserPhoto(user: any) {
    return userPhoto(user?.photo?.src)
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
