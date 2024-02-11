import { DictionaryValue } from './DictionaryValue.js'

export enum Category {
  apartment = 'apartment',
  house = 'house',
  land_plot = 'land_plot',
  garage = 'garage',
  commerce = 'commerce',
}

export const categoryTypeText: DictionaryValue<Category> = {
  [Category['apartment']]: 'Квартиры',
  [Category['house']]: 'Дома, коттеджи',
  [Category['land_plot']]: 'Земельный участок',
  [Category['garage']]: 'Гаражи и машиноместа',
  [Category['commerce']]: 'Коммерция',
}
