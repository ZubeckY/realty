import { DictionaryValue } from './DictionaryValue.js'

export enum AgencyLegalForm {
  fiz = 'fiz',
  ur = 'ur',
  ip = 'ip',
}

export const agencyLegalFormTypeText: DictionaryValue<AgencyLegalForm> = {
  [AgencyLegalForm['fiz']]: 'Физическое лицо',
  [AgencyLegalForm['ip']]: 'ИП',
  [AgencyLegalForm['ur']]: 'Юридическое лицо',
}
