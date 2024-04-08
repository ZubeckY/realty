import { TodoStatus } from '~/assets/script/models/TodoStatus'

export default function getColorTodo(item: string): string {
  switch (item) {
    case TodoStatus['created']:
      return 'green darken-1 white--text'
    case TodoStatus['manager_set']:
      return 'blue darken-1 white--text'
    case TodoStatus['in_process']:
      return 'amber darken-1 white--text'
    case TodoStatus['awaiting_confirmation']:
      return 'light-blue lighten-3 white--text'
    case TodoStatus['is_closed']:
      return 'red darken-1 white--text'
    default:
      return ''
  }
}
