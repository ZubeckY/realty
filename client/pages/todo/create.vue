<template>
  <div>
    <card class="mb-3">
      <h3 :class="usableText">Добавление задачи</h3>

      <div class="create__group mt-3">
        <div class="create__title">Стадия выполнения</div>
        <div class="mr-3">
          <v-autocomplete
            v-model="model.stage"
            :dark="usableTheme"
            :disabled="disabled"
            :items="todoStatusList"
            item-value="value"
            item-text="text"
            type="text"
            clearable
            outlined
            chips
            dense
          >
            <template v-slot:selection>
              <todo-status v-model="model.stage"></todo-status>
            </template>
          </v-autocomplete>
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Комментарий</div>
        <div class="mr-3">
          <v-textarea
            placeholder="Опишите, что нужно сделать в задаче"
            v-model="model.comment"
            :dark="usableTheme"
            :disabled="disabled"
            type="text"
            rows="3"
            outlined
            counter
            dense
          />
        </div>
      </div>

      <div class="create__group mb-3">
        <v-btn
          :color="usableColor"
          :loading="loading"
          :disabled="disabled"
          @click="createOne"
          outlined
          small
        >
          Создать
        </v-btn>
        <v-btn
          color="error darken-1"
          @click="$router.push('/news')"
          :disabled="disabled"
          outlined
          small
        >
          Отмена
        </v-btn>
      </div>
    </card>

    <v-snackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="2000"
      outlined
      text
    >
      <span v-html="snackbarMessage"></span>
    </v-snackbar>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { todoStatusTypeText } from '~/assets/script/models/TodoStatus'
import getAuthToken from '~/assets/script/functions/getAuthToken'

@Component({})
export default class Create extends Vue {
  loading: boolean = false
  disabled: boolean = false

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  model: any = {
    stage: 'created',
    user: '',
    manager: '',
    comment: '',
  }

  async createOne() {
    if (process.client) {
      let authToken = getAuthToken()

      if (!authToken) {
        return null
      }

      const agency = this.$store.state.user.user.agency
    }
  }

  get todoStatusList() {
    if (!this.currentRoleHigh) {
      return [
        {
          value: 'created',
          text: 'создано'
        },
        {
          value: 'in_process',
          text: 'в процессе выполнения'
        },
        {
          value: 'awaiting_confirmation',
          text: 'ожидает подтверждения'
        },
      ]
    }


    const list = Object.entries(todoStatusTypeText)
    const todoStatus: any = []
    for (let i = 0; i < list.length; i++) {
      todoStatus.push({
        text: list[i][1],
        value: list[i][0],
      })
    }
    return todoStatus
  }

  get currentRoleHigh() {
    return ['admin', 'rop', 'office_manager'].includes(this.currentUserRole)
  }

  get currentUserRole() {
    return this.$store.state.user.user.role
  }

  get usableColor() {
    return new ColorTheme().color()
  }

  get usableTheme() {
    return new ColorTheme().isDark()
  }

  get usableText() {
    return new ColorTheme().text()
  }
}
</script>
