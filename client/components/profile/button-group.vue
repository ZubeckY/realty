<template>
  <div>
    <div class="profile-photo__group" v-if="!localEditMode">
      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             elevation="0" @click="$router.push('/')" small block>
        Перейти в каталог
      </v-btn>

      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             elevation="0" @click="$router.push('/admin')" small block>
        Админ панель
      </v-btn>
    </div>

    <div class="profile-photo__group">
      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             v-if="!localEditMode" elevation="0" @click="changeEditMode" small block>
        Редактировать
      </v-btn>

      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             v-if="localEditMode" elevation="0" @click="changeEditMode" small block>
        Сохранить
      </v-btn>

      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             v-if="localEditMode" elevation="0" @click="changeEditMode" small block>
        Отмена
      </v-btn>
    </div>

    <div class="profile-photo__group" v-if="!localEditMode">
      <v-btn class="radius-small white error--text text--darken-1 mt-2"
             elevation="0" @click="exitDialog = !exitDialog" small block>
        Выйти из профиля
      </v-btn>

      <action-dialog :dialog="exitDialog"
                   @changeDialog="changeExitDialog"
                   @isCanceled="closeExitDialog"
                   title="Выход из аккаунта"
                   text="Вы действительно хотите выйти из аккаунта?" />

    </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ProfileButtonGroup extends Vue {
  @Prop() editMode!: boolean;
  localEditMode: boolean = false;
  exitDialog: boolean = false;

  user: any = {
    id: 1,
    name: "Иван",
    surname: "Иванов",
    patronymic: "Иванович",
    role: "admin",
    email: "e-mail@mail.ru",
    phone: "+7-999-990-00-99"
  };

  created() {
    this.localEditMode = this.editMode;
    this.checkIDToValid();
  }

  changeExitDialog(value: boolean) {
    return this.exitDialog = value
  }

  closeExitDialog() {
    return this.exitDialog = false
  }

  async checkIDToValid() {
    try {
      const route: string[] = this.$router.currentRoute.path.split("/");
      const numericNeedID = route[route.length - 1];

      // Проверяем на цифру
      if (!Number.isInteger(Number(numericNeedID))) {
        return console.log("Не верное значение id");
      }

      await this.$axios.get("/api/users/findUserByID?userID=" + numericNeedID);

      console.log("");

    } catch (e) {
      console.log(e);
    }
  }

  changeEditMode() {
    this.localEditMode = !this.localEditMode;
    this.$emit("changeEditMode", this.localEditMode);
  }
}
</script>
<style>
.exitFromProfile__title {
  font-weight: bold;
}

</style>
