import { DictionaryValue } from './DictionaryValue.js'

export enum StatusType {
  flat = 'flat',
  apartment = 'apartment',
}

export const statusTypeText: DictionaryValue<StatusType> = {
  [StatusType['flat']]: 'Квартира',
  [StatusType['apartment']]: 'Апартаменты',
}
