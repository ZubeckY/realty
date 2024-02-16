import { DictionaryValue } from './DictionaryValue.js'

export enum Courtyard {
  closed_area = 'closed_area',
  playground = 'playground',
  sports_ground = 'sports_ground',
}

export const courtyardTypeText: DictionaryValue<Courtyard> = {
  [Courtyard['closed_area']]: 'Закрытая территория',
  [Courtyard['playground']]: 'Детская площадка',
  [Courtyard['sports_ground']]: 'Спортивная площадка',
}
