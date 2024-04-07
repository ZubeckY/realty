<template>
  <v-list-item
      three-line
      class="profileCard-devicesList__item pa-1"
  >
    <v-list-item-content>
      <v-list-item-title
          class="d-flex flex-row justify-space-between"
      >
        <div>{{ item["device"] }}</div>
        <div>{{ normalizeLastSeen(item["lastSeen"]) }}</div>
      </v-list-item-title>
      <v-list-item-subtitle
          class="d-flex flex-row justify-space-between align-center py-1"
      >
        <div>{{ item["userAgent"] }}</div>
        <div>
          <div
              v-if="isCurrentAgent(item['value'])"
              class="success white--text darken-1 pa-1 radius-small"
          >
            Текущий
          </div>
          <div v-else>
            <v-btn @click="deleteDialog = true" icon small color="error darken-1">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <action-dialog
                v-model="deleteDialog"
                title="Подтвердите удаление"
                text="Вы действительно хотите удалить вход с выбранного устройства? Если вы его удалите, то автоматически выйдите из системы с выбранного устройства"
                @isConfirm="logoutFromSelectedDevice"
            />
          </div>
        </div>
      </v-list-item-subtitle>
      <v-list-item-subtitle>
        {{ item["ip"] }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
import { normalizeDate } from "~/assets/script/functions/norlamizeDate";

@Component({})
export default class DeviceItem extends Vue {
  @Prop() item!: Record<string, unknown>
  deleteDialog: boolean = false

  normalizeLastSeen(date: any) {
    return normalizeDate(date)
  }

  isCurrentAgent(hash: string) {
    if (process.client) {
      const token: any = localStorage.getItem("token")
      return token.includes(hash)
    }
  }

  async logoutFromSelectedDevice() {
    await this.$axios
        .post("/api/auth/logout/" + this.item.value)
        .then((data) => {
          this.$emit('uploadDeviceList')
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.deleteDialog = false
        })
  }
}
</script>
