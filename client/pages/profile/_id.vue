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
                  block
                  small
                  dark
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
                  block
                  small
                  dark
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
                      class="profileCard-devicesList__container"
                      color="transparent"
                      dense
                    >
                      <v-list-item
                        three-line
                        class="profileCard-devicesList__item pa-1"
                      >
                        <v-list-item-content>
                          <v-list-item-title class="d-flex flex-row justify-space-between">
                            <div>Other 0.0.0</div>
                            <div>12.05</div>
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Chrome 122.0.0 / Windows 10.0.0
                          </v-list-item-subtitle>
                          <v-list-item-subtitle>
                            127.0.0.1
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
                  @click="editMode = !editMode"
                  block
                  small
                  dark
                >
                  Выйти из профиля
                </v-btn>

                <action-dialog v-model="editMode" />
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
                      {{ user.name }}
                    </div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Фамилия</div>
                    <div class="profileInfo-infoGroup__value">
                      {{ user.surname }}
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
            </div>

            <div>
              <card class="profileCard ml-2 mb-2">
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

              <card class="profileCard ml-2 mb-2">
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

@Component
export default class Profile extends Vue {
  editMode: boolean = false
  exitDialog: boolean = false

  deviceList: any = []
  devicesList: boolean = false

  user: Record<string, unknown> = {
    name: 'Иван',
    surname: 'Иванов',
    patronymic: 'Иванович',
    dateBirthday: '11.11.2020',
    aboutMe: 'Произвольный текст, вводимый пользователем',

    email: 'email@mail.ru',
    phone: '+7(999)-999-99-99',

    role: 'Админ',
    agency: 'Название агентства',
    jobTitle: 'Менеджер',
    avatar:
      'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',

    numberOfSales: 15,
    coefficient: '30%',
    amountSales: 24_000_000,
  }

  created() {
    let currentRoute = this.$router.currentRoute.path
    let array = currentRoute.split('/')
    let id = array[array.length - 1]

    if (!Number(id)) return
    this.checkIDToValid()
  }

  async checkIDToValid() {
    try {
      const route: string[] = this.$router.currentRoute.path.split('/')
      const numericNeedID = route[route.length - 1]

      // Проверяем на цифру
      if (!Number.isInteger(Number(numericNeedID))) {
        return console.log('Неверное значение id')
      }

      // await this.$axios.get("/api/users/findUserByID?userID=" + numericNeedID);
    } catch (e) {
      console.log(e)
    }
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
}
</script>
<style>
.exitFromProfile__title {
  font-weight: bold;
}
</style>
