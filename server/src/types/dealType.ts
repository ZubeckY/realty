import { DictionaryValue } from './DictionaryValue.js'

export enum DealType {
  direct_sale = 'direct_sale',
  alternative_sale = 'alternative_sale',
}

export const dealTypeText: DictionaryValue<DealType> = {
  [DealType['direct_sale']]: 'Прямая продажа',
  [DealType['alternative_sale']]: 'Альтернативная',
}
