<template>
  <section class="profile">
    <div v-if="!loading" class="profile-container">
      <div class="profileInfo">
        <div class="profileInfo-container">
          <card class="profilePhoto">
            <div class="profilePhoto-container">
              <div class="profilePhoto__wrapper">
                <img
                  class="profilePhoto__img"
                  alt="profilePhoto-avatar"
                  :src="profilePhoto"
                />

                <div
                  v-if="!user"
                  class="profilePhoto__unknown d-flex justify-center align-center"
                >
                  <v-icon size="90">mdi-help</v-icon>
                </div>
              </div>

              <div v-if="!user">
                <h4 class="profileCard-title text-center mt-2 mb-1">
                  Пользователь не найден!
                </h4>
              </div>

              <div
                class="mt-2"
                v-if="currentUserItsMe || (userAdmin && isOurAgency)"
              >
                <v-btn
                  elevation="0"
                  class="radius-small"
                  :color="usableColor"
                  @click="switchEditMode"
                  outlined
                  block
                  small
                >
                  Редактировать
                  <v-icon class="ml-2" small>mdi-pencil</v-icon>
                </v-btn>
              </div>

              <div
                class="mt-2"
                v-if="
                  (currentUserItsMe || (userAdmin && isOurAgency)) && !editMode
                "
              >
                <v-btn
                  elevation="0"
                  class="radius-small"
                  :color="usableColor"
                  @click="devicesList = !devicesList"
                  outlined
                  block
                  small
                >
                  Устройства входа
                  <v-icon class="ml-2" small>mdi-cellphone-link</v-icon>
                </v-btn>

                <action-dialog
                  v-model="devicesList"
                  title="Активные устройства входа"
                  text=""
                  :popup="true"
                >
                  <div class="profileCard-devicesList">
                    <v-list
                      v-for="ud in deviceList"
                      :key="'user-device-item-' + ud.id"
                      class="profileCard-devicesList__container"
                      color="transparent"
                      :dark="usableTheme"
                      dense
                    >
                      <profile-device-item
                        :item="ud"
                        @uploadDeviceList="getAuthUserDevices"
                      />
                    </v-list>
                  </div>
                </action-dialog>
              </div>

              <div class="mt-2" v-if="currentUserItsMe && !editMode">
                <v-btn
                  elevation="0"
                  class="radius-small"
                  color="error darken-1"
                  @click="exitDialog = !exitDialog"
                  outlined
                  block
                  small
                >
                  Выйти из профиля
                  <v-icon class="ml-2" small>mdi-exit-to-app</v-icon>
                </v-btn>

                <action-dialog
                  v-model="exitDialog"
                  title="Выйти из профиля?"
                  text="Вы действительно хотите выйти из профиля?"
                  @isConfirm="exitFromProfile"
                />
              </div>
            </div>
          </card>

          <section class="profileSection ml-2">
            <div v-if="user">
              <card class="profileCard mb-2">
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">Линчая информация</h4>

                  <div class="profileInfo-infoGroup mr-2">
                    <div class="profileInfo-infoGroup__title">Имя</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.firstName ?? '' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Фамилия</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.lastName ?? '' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Отчество</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.patronymic ?? 'не указано' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">
                      Дата рождения
                    </div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.dateBirthday ?? 'не указано' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup mr-2">
                    <div class="profileInfo-infoGroup__title">О себе</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.aboutMe ?? '' }}
                    </div>
                  </div>
                </div>
              </card>

              <card class="profileCard mb-2">
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">Контактная информация</h4>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Телефон</div>
                    <div class="profileInfo-infoGroup__value">
                      <a v-if="user.phone" :href="'tel:' + user.phone">
                        {{ user.phone ?? 'не указано' }}
                      </a>
                      <span v-else>не указано</span>
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Email</div>
                    <div class="profileInfo-infoGroup__value">
                      <a :href="'mailto:' + user.email">{{ user.email }}</a>
                    </div>
                  </div>
                </div>
              </card>

              <card
                class="profileCard mb-2"
                v-if="currentUserItsMe || isOurAgency"
              >
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">
                    Корпоративная информация
                  </h4>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Роль</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.role ?? '' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Агентство</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ userAgency ?? '' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Должность</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.jobTitle ?? 'не указано' }}
                    </div>
                  </div>
                </div>
              </card>
            </div>

            <div v-if="user">
              <card
                class="profileCard ml-2 mb-2"
                v-if="currentUserItsMe || (userAdmin && isOurAgency)"
              >
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">Эффективность</h4>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">
                      Кол-во продаж
                    </div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.numberOfSales ?? '' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">
                      Тариф менеджера
                    </div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.coefficient ?? '' }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Сумма продаж</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.amountSales ?? '' }}
                    </div>
                  </div>
                </div>
              </card>
            </div>
          </section>

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
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { userPhoto } from '~/assets/script/functions/userPhoto'
import axiosAuthConfig from '~/assets/script/functions/axiosAuthConfig'
import getAuthToken from "~/assets/script/functions/getAuthToken";

@Component
export default class Profile extends Vue {
  user: any = {}
  userEdit: any = {}

  loading: boolean = true

  editMode: boolean = false
  exitDialog: boolean = false

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  deviceList: any = []
  devicesList: boolean = false

  async created() {
    let currentRoute = this.$router.currentRoute.path
    let array = currentRoute.split('/')
    let id = array[array.length - 1]

    if (!Number(id)) return

    await this.userByID()
  }

  async getAuthUserDevices() {
    if (process.client) {
      let authToken = getAuthToken()

      if (!authToken) {
        return null
      }

      await this.$axios
        .post(
          '/api/auth/get-my-devices/',
          {
            id: this.user.id,
          },
          {
            ...axiosAuthConfig(authToken, '', 'crm_client'),
          }
        )
        .then((data) => {
          return (this.deviceList = data.data)
        })
    }
  }

  get checkIDToValid() {
    const route: string[] = this.$router.currentRoute.path.split('/')
    const numericNeedID = route[route.length - 1]

    // Проверяем на цифру
    if (!Number.isInteger(Number(numericNeedID))) {
      return console.log('Неверное значение id')
    }

    return +numericNeedID
  }

  async userByID() {
    if (this.currentUserItsMe) {
      this.user = this.savedUser
      await this.getAuthUserDevices()

      this.loading = false

      return
    }

    if (process.client) {
      let authToken = getAuthToken()

      if (!authToken) {
        return null
      }

      await this.$axios
        .get('/api/user/' + this.checkIDToValid, {
          ...axiosAuthConfig(authToken, '', 'crm_client'),
        })
        .then((data: any) => {
          if (data.data?.message) {
            this.setSnackbarValues('error darken-1', data.data.message)
            console.log(data.data.error)
            return
          }

          return (this.user = data.data)
        })
        .finally(async () => {
          if (this.userAdmin && this.isOurAgency) {
            await this.getAuthUserDevices()
          }
          this.loading = false
        })
    }
  }

  get savedUser() {
    return JSON.parse(JSON.stringify(this.$store.state.user.user))
  }

  get currentUserItsMe() {
    return this.savedUser.id == this.checkIDToValid
  }

  /* EditMode */
  switchEditMode() {
    if (!this.editMode) {
      this.changeEditMode()
      this.setUserEditMode()
    } else {
      this.changeEditMode()
      this.clearUserEditMode()
    }
  }

  changeEditMode() {
    this.editMode = !this.editMode
  }

  setUserEditMode() {
    this.userEdit = this.savedUser
  }

  clearUserEditMode() {
    this.userEdit = {}
  }

  get profilePhoto() {
    return userPhoto(this.user?.avatar?.src)
  }

  async exitFromProfile() {
    if (process.client) {
      const token: any = getAuthToken()

      await this.$axios
        .post('/api/auth/logout/' + token, {
          ...axiosAuthConfig(token, '', 'crm_client'),
        })
        .then((data) => {
          if (data.data?.message) {
            this.setSnackbarValues('error darken-1', data.data.message)
            console.log(data.data.error)
            return
          }

          this.setSnackbarValues('success darken-1', 'Успешно')

          setTimeout(() => {
            localStorage.removeItem('token')
            window.location.reload()
          }, 1000)
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.exitDialog = false
        })
    }
  }

  get userAgency() {
    if (this.user.agency) {
      return this.user.agency.title
    } else {
      return 'не указано'
    }
  }

  get userAdmin() {
    return this.savedUser.role === 'admin'
  }

  get isOurAgency() {
    return this.savedUser?.agency?.id === this.user?.agency?.id
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableColor() {
    return new ColorTheme().color()
  }
}
</script>
