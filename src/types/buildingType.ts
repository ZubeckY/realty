import { DictionaryValue } from './DictionaryValue.js'

export enum BuildingType {
  business_center = 'business_center',
  shopping_mall = 'shopping_mall',
  administrative_building = 'administrative_building',
  living_house = 'living_house',
  another_building = 'another_building',
}

export const buildingTypeText: DictionaryValue<BuildingType> = {
  [BuildingType['business_center']]: 'Бизнес-центр',
  [BuildingType['shopping_mall']]: 'Торговый центр',
  [BuildingType['administrative_building']]: 'Административное здание',
  [BuildingType['living_house']]: 'Жилой дом',
  [BuildingType['another_building']]: 'Другой',
}
