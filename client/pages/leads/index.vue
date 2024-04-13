<template>
  <div>
    <v-skeleton-loader
      v-if="loading"
      :dark="usableTheme"
      type="table"
    ></v-skeleton-loader>

    <v-data-table
      v-else
      :dark="usableTheme"
      :headers="headers"
      :items="list"
      :search="search"
      no-data-text="Нет данных"
      :class="'custom-table ' + usableBlock"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus',
        itemsPerPageText: 'Кол-во элементов',
        itemsPerPageOptions: [10, 25, 50, 100, -1],
      }"
      dense
    >
      <template v-slot:item.status="{ item }">
        <td class="text-start">
          <leads-status v-model="item.stage" />
        </td>
      </template>

      <template v-slot:item.client.fullName="{ item }">
        <td class="text-start text-no-wrap">
          {{ item.client.fullName }}
        </td>
      </template>

      <template v-slot:item.client.phone="{ item }">
        <td class="text-start text-no-wrap">
          {{ item.client.phone }}
        </td>
      </template>

      <template v-slot:item.created="{ item }">
        <td class="text-start text-no-wrap">
          {{ normalizeCreated(item['created']) }}
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex">
          <leads-edit />
          <leads-delete />
        </div>
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="2000"
      outlined
      text
    >
      {{ snackbarMessage }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import axiosAuthConfig from '~/assets/script/functions/axiosAuthConfig'
import { normalizeDate } from '~/assets/script/functions/norlamizeDate'
import getAuthToken from "~/assets/script/functions/getAuthToken";

@Component
export default class Leads extends Vue {
  loading: boolean = true
  search: string = ''

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  list: any = []
  headers: any = [
    { text: 'id', value: 'id' },
    { text: 'Имя Фамилия', value: 'client.fullName' },
    { text: 'Телефон', value: 'client.phone' },
    { text: 'Тип недвижимости', value: 'realtyType' },
    { text: 'Район', value: 'district' },
    { text: 'Микрорайон', value: 'microDistrict' },
    { text: 'Готовность объекта', value: 'objectReadiness' },
    { text: 'Цель покупки', value: 'purposeOfPurchase' },
    { text: 'Способ оплаты', value: 'paymentMethod' },
    { text: 'Стадия в воронке', value: 'status' },
    { text: 'Комментарий', value: 'comment' },
    { text: 'Дата создания', value: 'created' },
    { text: '', value: 'actions', sortable: false },
  ]

  async created() {
    if (process.client) {
      let authToken = getAuthToken()
      const agencyID = JSON.parse(
        JSON.stringify(this.$store.state.user.user?.agency?.id)
      )

      if (!authToken) {
        return null
      }

      await this.$axios
        .post(
          '/api/lead/list/',
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

          this.list = data.data
          this.loading = false
        })
    }
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  normalizeCreated(date: any) {
    return normalizeDate(date)
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
