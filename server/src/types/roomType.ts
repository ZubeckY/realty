import { DictionaryValue } from './DictionaryValue.js'

export enum RoomType {
  isolated = "isolated",
  adjoining = "adjoining"
}

export const roomTypeText: DictionaryValue<RoomType> = {
  [RoomType['isolated']]: 'Изолированные',
  [RoomType['adjoining']]: 'Смежные',
}