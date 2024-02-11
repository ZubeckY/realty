import { DictionaryValue } from './DictionaryValue.js'

export enum Renovation {
  needed = 'needed',
  redecorating = 'redecorating',
  european = 'european',
  designer = 'designer',
}

export const renovationTypeText: DictionaryValue<Renovation> = {
  [Renovation['needed']]: 'Требуется',
  [Renovation['redecorating']]: 'Косметический',
  [Renovation['european']]: 'Евро',
  [Renovation['designer']]: 'Дизайнерский',
}





