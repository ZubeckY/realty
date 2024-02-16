import { DictionaryValue } from './DictionaryValue.js'

export enum StatusType {
  flat = 'flat',
  apartment = 'apartment',
}

export const statusTypeText: DictionaryValue<StatusType> = {
  [StatusType['flat']]: 'Квартриа',
  [StatusType['apartment']]: 'Апартаменты',
}
