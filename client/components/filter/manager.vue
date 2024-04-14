<template>
  <div>
    <div v-if="!hideTitle" class="params-title">Ответственный менеджер</div>
    <div class="params-content mt-2">
      <v-autocomplete
        v-model="managerCurrent"
        label="Выберите менеджера"
        :color="usableColor"
        :items="managerList"
        :dark="usableTheme"
        item-value="id"
        item-text="firstName"
        clearable
        outlined
        multiple
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
              <img :src="getUserPhoto(data.item)" alt="#"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="getUserFullName(data.item)"></v-list-item-title>
              <v-list-item-subtitle
                v-html="data.item.role"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, VModel, Vue, Prop } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import axiosAuthConfig from "~/assets/script/functions/axiosAuthConfig";
import { userPhoto } from "~/assets/script/functions/userPhoto";

@Component
export default class FilterManager extends Vue {
  @VModel() managerCurrent!: any
  @Prop({ default: false }) hideTitle?: boolean

  managerList: any = []

  async created() {
    await this.initManagerList()
  }

  async initManagerList() {
    if (process.client) {
      let authToken = localStorage.getItem("token");
      const agencyID = JSON.parse(
        JSON.stringify(this.$store.state.user.user?.agency?.id)
      );

      if (!authToken) {
        return null;
      }

      if (!agencyID) {
        return null
      }

      if (this.managerList.length) {
        return
      }

      await this.$axios
        .post(
          "/api/user/list/binding/" + agencyID,
          {},
          {
            ...axiosAuthConfig(authToken, "", "crm_client")
          }
        )
        .then((data) => {
          if (data.data?.message) {
            console.log(data.data.message);
            console.log(data.data.error);
            return;
          }
          this.managerList = data.data;
        });
    }
  }

  getUserPhoto(user: any) {
    return userPhoto(user?.photo?.src)
  }

  getUserFullName(user: any) {
    return user.firstName + ' ' + user.lastName
  }

  get usableColor() {
    return new ColorTheme().color()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
