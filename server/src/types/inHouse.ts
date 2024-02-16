import { DictionaryValue } from './DictionaryValue.js'

export enum InHouse {
  concierge = "concierge",
  garbage_chute = "garbage_chute",
  gas_supply = "gas_supply",
}

export const inHouseTypeText: DictionaryValue<InHouse> = {
  [InHouse['concierge']]: 'Консьерж',
  [InHouse['garbage_chute']]: 'Мусоропровод',
  [InHouse['gas_supply']]: 'Газоснабжение',
}