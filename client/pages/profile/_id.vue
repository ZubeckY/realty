<template>
  <section class="profile">
    <div class="profile-container">

      <div class="profileInfo">
        <div class="profileInfo-container">

          <card class="profilePhoto">
            <div class="profilePhoto-container">
              <profile-avatar />
              <profile-button-group :editMode="editMode"
                                    @changeEditMode="changeEditMode" />
            </div>
          </card>

          <section class="profileSection ml-2">

            <div>
              <card class="profileCard mb-2">
                <div class="profileCard-container">
                  <div class="profileInfo-infoGroup mr-2">
                    <div class="profileInfo-infoGroup__title">Статус</div>
                    <div class="profileInfo-infoGroup__value">Онлайн</div>
                  </div>
                </div>
              </card>

              <card class="profileCard mb-2">
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">Линчая информация</h4>

                  <div class="profileInfo-infoGroup mr-2">
                    <div class="profileInfo-infoGroup__title">Имя</div>
                    <div class="profileInfo-infoGroup__value">{{ user.name }}</div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Фамилия</div>
                    <div class="profileInfo-infoGroup__value">{{ user.surname }}</div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Отчество</div>
                    <div class="profileInfo-infoGroup__value">{{ user.patronymic }}</div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Дата рождения</div>
                    <div class="profileInfo-infoGroup__value">{{ user.dateBirthday }}</div>
                  </div>

                  <div class="profileInfo-infoGroup mr-2">
                    <div class="profileInfo-infoGroup__title">О себе</div>
                    <div class="profileInfo-infoGroup__value">{{ user.aboutMe }}</div>
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
                  <h4 class="profileCard-title mb-2">Корпоративная информация</h4>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Роль</div>
                    <div class="profileInfo-infoGroup__value">{{ user.role }}</div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Агентство</div>
                    <div class="profileInfo-infoGroup__value">{{ user.agency }}</div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Должность</div>
                    <div class="profileInfo-infoGroup__value">{{ user.jobTitle }}</div>
                  </div>

                </div>
              </card>
            </div>

            <div>
              <card class="profileCard ml-2 mb-2">
                <div class="profileCard-container">
                  <h4 class="profileCard-title mb-2">Эффективность</h4>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Кол-во продаж</div>
                    <div class="profileInfo-infoGroup__value">{{ user.efficiency.numberOfSales }}</div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Тариф менеджера</div>
                    <div class="profileInfo-infoGroup__value">{{ user.efficiency.coefficient }}</div>
                  </div>

                  <div class="profileInfo-infoGroup">
                    <div class="profileInfo-infoGroup__title">Сумма продаж</div>
                    <div class="profileInfo-infoGroup__value">{{ user.efficiency.amountSales }}</div>
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
  themes: any = this.$store.state.themes;
  activeTheme: string = this.$store.state.activeTheme;
  editMode: boolean = false;
  user: any = {
    name: "Иван",
    surname: "Иванов",
    patronymic: "Иванович",
    dateBirthday: "11.11.2020",
    aboutMe: "Произвольный текст, вводимый пользователем",

    email: "email@mail.ru",
    phone: "+7(999)-999-99-99",

    role: "Админ",
    agency: "Название агентства",
    jobTitle: "Менеджер",
    avatar: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg",

    efficiency: {
      numberOfSales: 15,
      coefficient: '30%',
      amountSales: 24_000_000,
    }
  };


  created() {
    let currentRoute = this.$router.currentRoute.path
    let array = currentRoute.split('/')
    let id = array[array.length - 1]

    if (!Number(id)) return;

  }

  changeEditMode(value: boolean) {
    this.editMode = value;
  }

}
</script>
<style>
.profileSection {
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
}

.profileCard {
  width: 250px;
  height: fit-content;
}

.profileInfo-infoGroup {
  margin-bottom: 7px;
}

.profileInfo-infoGroup:last-child {
  margin-bottom: 0;
}

.profileInfo-infoGroup__title {
  font-size: 13px;
  font-weight: bold;
}

.profileInfo-infoGroup__value {
  font-size: 14px;
}
</style>
