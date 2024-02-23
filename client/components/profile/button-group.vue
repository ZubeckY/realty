<template>
  <div>
    <div class="profile-photo__group">
      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             v-if="!localEditMode" elevation="0" @click="changeEditMode" block>
        Редактировать
      </v-btn>

      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             v-if="localEditMode" elevation="0" @click="changeEditMode" block>
        Сохранить
      </v-btn>

      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             v-if="localEditMode" elevation="0" @click="changeEditMode" block>
        Отмена
      </v-btn>
    </div>

    <div class="profile-photo__group" v-if="!localEditMode">
      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             elevation="0" block>
        Заблокировать
      </v-btn>

      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             elevation="0" block>
        Админ панель
      </v-btn>

      <v-btn class="radius-small white primary--text text--darken-1 mt-2"
             elevation="0" block>
        Кнопка пустышка
      </v-btn>
    </div>

  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

@Component
export default class ProfileButtonGroup extends Vue {
  @Prop() editMode!: boolean
  localEditMode: boolean = false

  created() {
    this.localEditMode = this.editMode
  }

  changeEditMode() {
    this.localEditMode = !this.localEditMode
    this.$emit('changeEditMode', this.localEditMode)
  }
}
</script>
