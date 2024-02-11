import { DictionaryValue } from './DictionaryValue.js'

export enum Decoration {
  without_finishing = 'without_finishing',
  pre_finishing = 'pre_finishing',
  finishing = 'finishing',
  office = 'office',
}

export const decorationTypeText: DictionaryValue<Decoration> = {
  [Decoration['without_finishing']]: 'Без отделки',
  [Decoration['pre_finishing']]: 'Предчистовая',
  [Decoration['finishing']]: 'Чистовая',
  [Decoration['office']]: 'Офисная',
}