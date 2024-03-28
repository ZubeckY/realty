<template>
  <section class="profile">
    <div class="profile-container">
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
              </div>

              <div class="mt-2">
                <v-btn
                  elevation="0"
                  class="radius-small"
                  color="primary darken-1"
                  @click="editMode = !editMode"
                  outlined
                  block
                  small
                >
                  Редактировать
                </v-btn>

                <action-dialog v-model="editMode" />
              </div>

              <div class="mt-2">
                <v-btn
                  elevation="0"
                  class="radius-small"
                  color="primary darken-1"
                  @click="devicesList = !devicesList"
                  outlined
                  block
                  small
                >
                  Устройства
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
                      <v-list-item
                        three-line
                        class="profileCard-devicesList__item pa-1"
                      >
                        <v-list-item-content>
                          <v-list-item-title
                            class="d-flex flex-row justify-space-between"
                          >
                            <div>{{ ud['device'] }}</div>
                            <div>{{ normalizeLastSeen(ud['lastSeen']) }}</div>
                          </v-list-item-title>
                          <v-list-item-subtitle
                            class="d-flex flex-row justify-space-between align-center py-1"
                          >
                            <div>{{ ud['userAgent'] }}</div>
                            <div>
                              <div
                                v-if="isCurrentAgent(ud['value'])"
                                class="success darken-1 pa-1 radius-small"
                              >
                                Текущий
                              </div>
                              <v-btn v-else icon small color="error darken-1">
                                <v-icon>mdi-trash</v-icon>
                              </v-btn>
                            </div>
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            {{ ud['ip'] }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </action-dialog>
              </div>

              <div class="mt-2">
                <v-btn
                  elevation="0"
                  class="radius-small"
                  color="primary darken-1"
                  @click="exitDialog = !exitDialog"
                  outlined
                  block
                  small
                >
                  Выйти из профиля
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
            <div>
              <card class="profileCard mb-2">
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">Линчая информация</h4>

                  <div class="profileInfo-infoGroup mr-2">
                    <div class="profileInfo-infoGroup__title">Имя</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.firstName }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Фамилия</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.lastName }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Отчество</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.patronymic }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">
                      Дата рождения
                    </div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.dateBirthday }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup mr-2">
                    <div class="profileInfo-infoGroup__title">О себе</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.aboutMe }}
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
                      <a :href="'tel:' + user.phone">{{ user.phone }}</a>
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

              <card class="profileCard mb-2">
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">
                    Корпоративная информация
                  </h4>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Роль</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.role }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Агентство</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.agency }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Должность</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.jobTitle }}
                    </div>
                  </div>
                </div>
              </card>
            </div>

            <div>
              <card class="profileCard ml-2 mb-2">
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">Эффективность</h4>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">
                      Кол-во продаж
                    </div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.numberOfSales }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">
                      Тариф менеджера
                    </div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.coefficient }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Сумма продаж</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.amountSales }}
                    </div>
                  </div>
                </div>
              </card>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'

@Component
export default class Profile extends Vue {
  editMode: boolean = false
  exitDialog: boolean = false

  deviceList: any = []
  devicesList: boolean = false

  user: any = {}

  async created() {
    let currentRoute = this.$router.currentRoute.path
    let array = currentRoute.split('/')
    let id = array[array.length - 1]

    if (!Number(id)) return

    await this.userByID()

    console.log(this.user)
  }

  async getAuthUserDevices() {
    await this.$axios
      .post('/api/auth/get-my-devices/', {
        id: this.user.id,
      })
      .then((data) => {
        return (this.deviceList = data.data)
      })
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
      return
    }

    return null
  }

  get savedUser() {
    return JSON.parse(JSON.stringify(this.$store.state.user.user))
  }

  get currentUserItsMe() {
    return this.savedUser.id == this.checkIDToValid
  }

  changeEditMode() {
    this.editMode = !this.editMode
  }

  get profilePhoto() {
    return (
      this.user.avatar ||
      'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
    )
  }

  normalizeLastSeen(date: any) {
    const DATE = new Date(date)
    const monthList = [
      'янв',
      'фев',
      'мар',
      'апр',
      'май',
      'июн',
      'июл',
      'авг',
      'сен',
      'окт',
      'ноя',
      'дек',
    ]

    return (
      DATE.getDate() +
      ' ' +
      monthList[DATE.getMonth()] +
      ' ' +
      DATE.getFullYear()
    )
  }

  isCurrentAgent(hash: string) {
    if (process.client) {
      const token: any = localStorage.getItem('token')
      return token.includes(hash)
    }
  }

  async exitFromProfile() {
    if (process.client) {
      const token: any = localStorage.getItem('token')
      await this.$axios
        .post('/api/auth/logout/' + token)
        .then((data) => {
          localStorage.removeItem('token')
          window.location.reload()
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }
}
</script>
