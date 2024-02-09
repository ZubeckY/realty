import { DictionaryValue } from './DictionaryValue.js'

export enum Role {
  ADMIN = 'admin',
  ROP = 'rop',
  OFFICE_MANAGER = 'office_manager',
  MANAGER = 'manager',
  UNKNOWN = 'unknown',
  BLOCK = 'block',
}

export const roleTypeText: DictionaryValue<Role> = {
  [Role['ADMIN']]: 'Администратор',
  [Role['ROP']]: 'Руководитель отдела продаж',
  [Role['OFFICE_MANAGER']]: 'Офис менеджер',
  [Role['MANAGER']]: 'Менеджер',
  [Role['UNKNOWN']]: 'Неизвестный',
  [Role['BLOCK']]: 'Заблокирован',
}
