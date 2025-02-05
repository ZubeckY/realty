import { DictionaryValue } from './DictionaryValue.js'

export enum AdStatus {
  Free = 'Free',
  Highlight = 'Highlight',
  XL = 'XL',
  x2_1 = 'x2_1',
  x2_7 = 'x2_7',
  x5_1 = 'x5_1',
  x5_7 = 'x5_7',
  x10_1 = 'x10_1',
  x10_7 = 'x10_7',
  x15_1 = 'x15_1',
  x15_7 = 'x15_7',
  x20_1 = 'x20_1',
  x20_7 = 'x20_7',
}

export const adStatusTypeText: DictionaryValue<AdStatus> = {
  [AdStatus['Free']]: 'обычное объявление, услуги не подключаются',
  [AdStatus['Highlight']]: '«Выделение цветом» (действует 7 дней)',
  [AdStatus['XL']]: '«XL-объявление» (действует 7 дней)',
  [AdStatus['x2_1']]: '«До 2 раз больше просмотров на 1 день»',
  [AdStatus['x2_7']]: '«До 2 раз больше просмотров на 7 дней»',
  [AdStatus['x5_1']]: '«До 5 раз больше просмотров на 1 день»',
  [AdStatus['x5_7']]: '«До 5 раз больше просмотров на 7 дней»',
  [AdStatus['x10_1']]: '«До 10 раз больше просмотров на 1 день»',
  [AdStatus['x10_7']]: '«До 10 раз больше просмотров на 7 дней».',
  [AdStatus['x15_1']]: '«До 15 раз больше просмотров на 1 день».',
  [AdStatus['x15_7']]: '«До 15 раз больше просмотров на 7 дней».',
  [AdStatus['x20_1']]: '«До 20 раз больше просмотров на 1 день».',
  [AdStatus['x20_7']]: '«До 20 раз больше просмотров на 7 дней».',
}
