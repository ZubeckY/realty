import { DictionaryValue } from './DictionaryValue.js'

export enum ViewFromWindows {
  yard = 'yard',
  street = 'street',
  sunny_side = 'sunny_side',
}

export const viewFromWindowsTypeText: DictionaryValue<ViewFromWindows> = {
  [ViewFromWindows['yard']]: 'Во двор',
  [ViewFromWindows['street']]: 'На улицу',
  [ViewFromWindows['sunny_side']]: 'На солнечную сторону',
}
