import { DictionaryValue } from './DictionaryValue.js'

export enum SSAdditionally {
  furniture = 'furniture',
  appliances = 'appliances',
  conditioner = 'conditioner',
  wardrobe = 'wardrobe',
  panoramic_windows = 'panoramic_windows',
}

export const SSAdditionallyTypeText: DictionaryValue<SSAdditionally> = {
  [SSAdditionally['furniture']]: 'Мебель',
  [SSAdditionally['appliances']]: 'Бытовая техника',
  [SSAdditionally['conditioner']]: 'Кондиционер',
  [SSAdditionally['wardrobe']]: 'Гардеробная',
  [SSAdditionally['panoramic_windows']]: 'Панорамные окна',
}
