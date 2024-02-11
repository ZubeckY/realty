import { DictionaryValue } from './DictionaryValue.js'

export enum Entrance {
  from_street = 'from_street',
  from_yard = 'from_yard',
}

export const entranceTypeText: DictionaryValue<Entrance> = {
  [Entrance['from_street']]: 'С улицы',
  [Entrance['from_yard']]: 'Со двора',
}
