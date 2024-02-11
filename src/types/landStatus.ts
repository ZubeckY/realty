import { DictionaryValue } from './DictionaryValue.js'

export enum LandStatus {
  IJS = 'IJS',
  CNT = 'CNT',
  DNP = 'DNP',
  FARM = 'FARM',
  LPH = 'LPH',
}

export const landStatusTypeText: DictionaryValue<LandStatus> = {
  [LandStatus['IJS']]: 'Индивидуальное жилищное строительство (ИЖС)',
  [LandStatus['CNT']]: 'Садовое некоммерческое товарищество (СНТ)',
  [LandStatus['DNP']]: 'Дачное некоммерческое партнёрство (ДНП)',
  [LandStatus['FARM']]: 'Фермерское хозяйство',
  [LandStatus['LPH']]: 'Личное подсобное хозяйство (ЛПХ)',
}
