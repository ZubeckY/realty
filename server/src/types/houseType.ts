import { DictionaryValue } from './DictionaryValue.js'

export enum HouseType {
  brick = 'brick',
  panel = 'panel',
  block = 'block',
  monolith = 'monolith',
  monolith_brick = 'monolith_brick',
  wooden = 'wooden',
}

export const houseTypeText: DictionaryValue<HouseType> = {
  [HouseType['brick']]: 'Кирпичный',
  [HouseType['panel']]: 'Панельный',
  [HouseType['block']]: 'Блочный',
  [HouseType['monolith']]: 'Монолитный',
  [HouseType['monolith_brick']]: 'Монолитно-кирпичный',
  [HouseType['wooden']]: 'Деревянный',
}
