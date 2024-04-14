export enum TodoStatus {
  created = 'created',
  manager_set = 'manager_set',
  in_process = 'in_process',
  awaiting_confirmation = 'awaiting_confirmation',
  is_closed = 'is_closed',
}

export const todoStatusTypeText = {
  [TodoStatus['created']]: 'создано',
  [TodoStatus['manager_set']]: 'поставлен ответственный',
  [TodoStatus['in_process']]: 'в процессе выполнения',
  [TodoStatus['awaiting_confirmation']]: 'ожидает подтверждения',
  [TodoStatus['is_closed']]: 'завершено',
}
