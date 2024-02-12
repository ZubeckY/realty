import { DictionaryValue } from './DictionaryValue.js'

export enum NDAdditionally {
  wardrobe = 'wardrobe',
  panoramic_windows = 'panoramic_windows',
}

export const NDAdditionallyTypeText: DictionaryValue<NDAdditionally> = {
  [NDAdditionally['wardrobe']]: 'Гардеробная',
  [NDAdditionally['panoramic_windows']]: 'Панорамные окна',
}
