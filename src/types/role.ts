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

export const roleRating: DictionaryValue<Role> = {
  [Role['ADMIN']]: '100',
  [Role['ROP']]: '60',
  [Role['OFFICE_MANAGER']]: '50',
  [Role['MANAGER']]: '30',
  [Role['UNKNOWN']]: '10',
  [Role['BLOCK']]: '0',
}
