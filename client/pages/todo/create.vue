<template>
  <v-form v-model="valid">
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
            :rules="[rules.required]"
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

      <div class="create__group mt-3" v-if="showSetUsers">
        <div class="create__title">Менеджер</div>
        <div class="mr-3">
          <todo-user
            v-model="model.manager"
            :disabled="disabled"
            :rules="[rules.required]"
          />
        </div>
      </div>

      <div class="create__group mt-3" v-if="showSetUsers">
        <div class="create__title">Исполнитель</div>
        <div class="mr-3">
          <todo-user
            v-model="model.user"
            :disabled="disabled"
            :rules="[rules.required]"
          />
        </div>
      </div>

      <div class="create__group mt-3">
        <div class="create__title">Комментарий</div>
        <div class="mr-3">
          <v-textarea
            placeholder="Опишите, что нужно сделать в задаче"
            :rules="[rules.required]"
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
          :disabled="disabled || !valid"
          @click="createOne"
          outlined
          small
        >
          Создать
        </v-btn>
        <v-btn
          color="error darken-1"
          @click="$router.push('/todo')"
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
  </v-form>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ColorTheme } from '~/assets/script/functions/colorTheme'
import { todoStatusTypeText } from '~/assets/script/models/TodoStatus'
import getAuthToken from '~/assets/script/functions/getAuthToken'
import axiosAuthConfig from '~/assets/script/functions/axiosAuthConfig'

@Component({})
export default class Create extends Vue {
  valid: boolean = false
  loading: boolean = false
  disabled: boolean = false
  showSetUsers: boolean = false

  snackbar: boolean = false
  snackbarColor: string = ''
  snackbarMessage: string = ''

  model: any = {
    stage: 'created',
    user: '',
    manager: '',
    comment: '',
  }

  rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= (len ?? 8) ||
      `Недопустимая длина символов, требуется ${len} символов`,
    maxValue: (len: any) => (v: any) =>
      (v || '') < len ||
      `Недопустимое значение, максимальное значение - ${len}`,
    required: (v: any) => !!v || 'Это поле обязательно к заполнению',
  }

  created() {
    if (!this.currentRoleHigh) {
      this.model.user = this.currentUser
      this.model.manager = this.currentUser
      this.showSetUsers = false
      return
    }
    this.showSetUsers = true
  }

  async createOne() {
    if (process.client) {
      let authToken = getAuthToken()

      if (!authToken) {
        return null
      }

      const agency = this.currentUser.agency

      this.loading = true
      this.disabled = true

      await this.$axios
        .post(
          '/api/todo/create',
          {
            model: this.model,
            agency,
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

          this.setSnackbarValues('success darken-1', 'Успешно')

          this.loading = false
          this.disabled = true

          setTimeout(() => {
            this.$router.push('/todo')
          }, 1000)
        })
    }
  }

  setSnackbarValues(color: string, message: string) {
    this.snackbar = true
    this.snackbarColor = color
    this.snackbarMessage = message
  }

  get todoStatusList() {
    if (!this.currentRoleHigh) {
      return [
        {
          value: 'created',
          text: 'создано',
        },
        {
          value: 'in_process',
          text: 'в процессе выполнения',
        },
        {
          value: 'awaiting_confirmation',
          text: 'ожидает подтверждения',
        },
        {
          value: 'is_closed',
          text: 'завершено',
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

  get currentUser() {
    return this.$store.state.user.user
  }

  get currentUserRole() {
    return this.currentUser.role
  }

  get currentRoleHigh() {
    return ['admin', 'rop', 'office_manager'].includes(this.currentUserRole)
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
