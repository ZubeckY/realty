<template>
  <div class="auth-container">
    <div :class="'auth-card ' + usableBlock">
      <v-form @submit.prevent :class="'auth-form' + ' ' + usableBlock">
        <h2 class="auth-title my-2">Найдите агентство</h2>
        <div>Введите название Агентства или код приглашения!</div>

        <div class="auth-form__textField mt-3">
          <v-autocomplete
            v-model="model"
            :items="agencies"
            :dark="usableTheme"
            :disabled="loading"
            color="primary darken-1"
            :filter="startFilterAgencies"
            item-text="name"
            return-object
            hide-no-data
            outlined
            counter
            filled
            chips
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                :dark="usableTheme"
                @click="data.select"
                @click:close="remove"
                :disabled="loading"
              >
                <v-avatar left>
                  <v-img :src="data.item.avatar"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>

            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.avatar" alt="#" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    v-html="data.item.inviteCode"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </div>

        <v-btn
          class="radius-small primary darken-1 white--text mb-3"
          :dark="usableTheme"
          :disabled="!valid || disabled"
          :loading="loading"
          @click="setInviteAgency"
          elevation="0"
          small
          block
        >
          Запросить приглашение
        </v-btn>

        <v-btn
          class="radius-small primary darken-1 white--text mb-3"
          :dark="usableTheme"
          :disabled="disabled"
          @click="$router.push('/auth/agency/create')"
          elevation="0"
          small
          block
        >
          Создать своё агентство
        </v-btn>
      </v-form>
    </div>
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
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

const srcs = {
  1: 'https://www.diamondfacts.org/wp-content/uploads/2017/09/flawless-diamond.png',
  2: 'https://pikato.ru/upload/iblock/5f8/5f872288e2c915c505e5151725f20cd5.jpg',
  3: 'https://cdn1.flamp.ru/e7ee9a650e48e75cdf58b43a4f3b7a3c.jpg',
  4: 'https://static.tildacdn.com/tild6539-6631-4335-b031-633934316233/Screen_Shot_2022-08-.png',
}

@Component({
  layout: 'auth',
})
export default class Find extends Vue {
  model: any = null
  valid: boolean = false
  loading: boolean = false
  disabled: boolean = false

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  agencies: any = []
  data: any = [
    {
      name: 'Diamond Estate',
      inviteCode: '9c40dc48-4d16-414c-b5ae-e0522bad6de9',
      avatar: srcs[1],
    },
    {
      name: 'АЯКС',
      inviteCode: '58ddee3d-28b1-4f27-a43d-826ea3d8dafc',
      avatar: srcs[2],
    },
    {
      name: 'Этажи',
      inviteCode: 'dbd3f7e5-c1bf-417e-86c1-c14c2c02e674',
      avatar: srcs[3],
    },
    {
      name: 'Квартиротека',
      inviteCode: '2076e290-17e9-4401-a5cd-9db6d56f49ca',
      avatar: srcs[4],
    },
  ]

  async created() {
    await this.$axios.get('/api/agency/list/').then((data) => {
      if (data.data.message) {
        this.setSnackbarValues('error darken-1', data.data.message)
        console.log(data.data.error)
        return
      }

      this.data = data.data
    })

    this.agencies = this.data
  }

  setInviteAgency() {
    if (!!this.model) {
      const user = JSON.parse(JSON.stringify(this.$store.state['user/user']))
      this.$axios
        .post('/api/agency/invite/create/' + this.model.inviteCode, {
          user: user,
        })
        .then((data) => {
          if (data.data.message) {
            this.setSnackbarValues('error darken-1', data.data.message)
            console.log(data.data.error)
            return
          }

          this.setSnackbarValues(
            'error darken-1',
            'Запрос на вступление в агентство отправлен'
          )

          setTimeout(() => {
            this.$router.push('/profile/' + this.userID)
          })
        })
      return
    }

    this.setSnackbarValues('error darken-1', 'Внимание, значение не указано')
    this.valid = false
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  @Watch('model')
  setValid() {
    this.valid = !!this.model
  }

  remove() {
    return (this.model = null)
  }

  get userID() {
    return JSON.parse(JSON.stringify(this.$store.state.user.user.id))
  }

  startFilterAgencies(item: any, queryText: any) {
    const keyword = queryText.toLowerCase()

    return (
      item.name.toLowerCase().indexOf(keyword) > -1 ||
      item.inviteCode.toLowerCase().indexOf(keyword) > -1
    )
  }

  get usableBlock() {
    return new ColorTheme().block()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
