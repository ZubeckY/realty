import { DictionaryValue } from './DictionaryValue.js'

export enum Layout {
  office_layout = 'office_layout',
  open_layout = 'open_layout',
}

export const layoutTypeText: DictionaryValue<Layout> = {
  [Layout['office_layout']]: 'Кабинетная',
  [Layout['open_layout']]: 'Открытая',
}
