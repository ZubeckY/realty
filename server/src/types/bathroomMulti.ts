import { DictionaryValue } from './DictionaryValue.js'

export enum BathroomMulti {
  combined = 'combined',
  separated = 'separated',
}

export const bathroomMultiTypeText: DictionaryValue<BathroomMulti> = {
  [BathroomMulti['combined']]: 'Совмещённый',
  [BathroomMulti['separated']]: 'Раздельный',
}