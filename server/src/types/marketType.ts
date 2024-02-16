import { DictionaryValue } from './DictionaryValue.js'

export enum MarketType {
  new_building = 'new_building',
  secondary_building = 'secondary_building',
}

export const marketTypeText: DictionaryValue<MarketType> = {
  [MarketType['new_building']]: 'Новостройка',
  [MarketType['secondary_building']]: 'Вторичное жильё',
}
