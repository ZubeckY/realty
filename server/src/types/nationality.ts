import { DictionaryValue } from './DictionaryValue.js'

export enum Nationality {
  RUSSIA = 'russia',
  UKRAINE = 'ukraine',
  AZERBAIJAN = 'azerbaijan',
  ARMENIA = 'armenia',
  BELARUS = 'belarus',
  KAZAKHSTAN = 'kazakhstan',
  KYRGYZSTAN = 'kyrgyzstan',
  MOLDOVA = 'moldova',
  TAJIKISTAN = 'tajikistan',
  TURKMENISTAN = 'turkmenistan',
  UZBEKISTAN = 'uzbekistan',
}

export const nationalityTypeText: DictionaryValue<Nationality> = {
  [Nationality['RUSSIA']]: 'Россия',
  [Nationality['UKRAINE']]: 'Украина',
  [Nationality['AZERBAIJAN']]: 'Азербайджан',
  [Nationality['ARMENIA']]: 'Армения',
  [Nationality['BELARUS']]: 'Беларусь',
  [Nationality['KAZAKHSTAN']]: 'Казахстан',
  [Nationality['KYRGYZSTAN']]: 'Киргизия',
  [Nationality['MOLDOVA']]: 'Молдова',
  [Nationality['TAJIKISTAN']]: 'Таджикистан',
  [Nationality['TURKMENISTAN']]: 'Туркмения',
  [Nationality['UZBEKISTAN']]: 'Узбекистан',
}
