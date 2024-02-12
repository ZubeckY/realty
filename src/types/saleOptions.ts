import { DictionaryValue } from './DictionaryValue.js'

export enum SaleOptions {
  possible_mortgage = "possible_mortgage",
  selling_share = "selling_share",
  auction = "auction",
}

export const saleOptionsTypeText: DictionaryValue<SaleOptions> = {
  [SaleOptions['possible_mortgage']]: 'Можно в ипотеку',
  [SaleOptions['selling_share']]: 'Продажа доли',
  [SaleOptions['auction']]: 'Аукцион ',
}