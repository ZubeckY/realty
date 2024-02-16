import { DictionaryValue } from './DictionaryValue.js'

export enum BalconyOrLoggiaMulti {
  balcony = 'balcony',
  loggia = 'loggia',
}

export const balconyOrLoggiaTypeText: DictionaryValue<BalconyOrLoggiaMulti> = {
  [BalconyOrLoggiaMulti['balcony']]: 'Балкон',
  [BalconyOrLoggiaMulti['loggia']]: 'Лоджия',
}
