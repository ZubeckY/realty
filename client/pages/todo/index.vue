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
      :items="todoList"
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
      <template v-slot:item.stage="{ item }">
        <td class="text-start">
          <todo-status v-model="item.stage" />
        </td>
      </template>

      <template v-slot:item.created="{ item }">
        <td class="text-start text-no-wrap">
          {{ normalizeCreated(item['created']) }}
        </td>
      </template>

      <template v-slot:item.manager.firstName="{ item }">
        <td class="text-start text-no-wrap">
          {{ userFullName(item['manager']) }}
        </td>
      </template>

      <template v-slot:item.user.firstName="{ item }">
        <td class="text-start text-no-wrap">
          {{ userFullName(item['user']) }}
        </td>
      </template>

      <template v-slot:item.actions="{ item }">
        <td class="text-start text-no-wrap">
          <div class="d-flex align-center">

            <v-btn elevation="0" x-small icon>
              <v-icon color="primary darken-1">mdi-pencil</v-icon>
            </v-btn>

            <v-btn class="mx-2" elevation="0" x-small icon>
              <v-icon color="primary darken-1" size="25">mdi-playlist-edit</v-icon>
            </v-btn>

            <v-btn elevation="0" x-small icon>
              <v-icon color="error darken-1">mdi-delete</v-icon>
            </v-btn>

          </div>
        </td>
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
import { normalizeDate } from '~/assets/script/functions/norlamizeDate'
import axiosAuthConfig from "~/assets/script/functions/axiosAuthConfig";
import getAuthToken from "~/assets/script/functions/getAuthToken";

@Component
export default class Todo extends Vue {
  loading: boolean = true

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  todoList: any = []
  headers: any = [
    { text: 'id', value: 'id' },
    { text: 'Комментарий', value: 'comment' },
    { text: 'Стадия выполнения', value: 'stage' },
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

      this.initHeaders()

      await this.$axios
        .post(
          '/api/todo/list/',
          {
            agencyID: agencyID,
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

          this.todoList = data.data
          this.loading = false
        })
    }
  }

  initHeaders() {
    if (!this.currentRoleHigh) {
      return this.headers = [
        { text: 'id', value: 'id' },
        { text: 'Менеджер', value: 'manager.firstName' },
        { text: 'Комментарий', value: 'comment' },
        { text: 'Стадия выполнения', value: 'stage' },
        { text: 'Дата создания', value: 'created' },
        { text: '', value: 'actions', sortable: false },
      ]
    }

    this.headers = [
      { text: 'id', value: 'id' },
      { text: 'Менеджер', value: 'manager.firstName' },
      { text: 'Исполнитель', value: 'user.firstName' },
      { text: 'Комментарий', value: 'comment' },
      { text: 'Стадия выполнения', value: 'stage' },
      { text: 'Дата создания', value: 'created' },
      { text: '', value: 'actions', sortable: false },
    ]
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  normalizeCreated(date: any) {
    return normalizeDate(date)
  }

  userFullName(user: any) {
    return user.firstName + ' ' + user.lastName
  }

  get currentUser() {
    return this.$store.state.user.user
  }

  get currentUserRole() {
    return this.currentUser.role
  }

  get currentRoleHigh() {
    return ['admin', 'rop', 'office_manager'].includes(this.currentUserRole)
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
