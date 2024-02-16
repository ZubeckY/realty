import { DictionaryValue } from './DictionaryValue.js'

export enum LeaseAppliances {
  conditioner = 'conditioner',
  fridge = 'fridge',
  plate = 'plate',
  microwave = 'microwave',
  washer = 'washer',
  dishwasher = 'dishwasher',
  water_heater = 'water_heater',
  tv = 'tv',
  iron = 'iron',
  hairdryer = 'hairdryer',
}

export const leaseAppliancesTypeText: DictionaryValue<LeaseAppliances> = {
  [LeaseAppliances['conditioner']]: 'Кондиционер',
  [LeaseAppliances['fridge']]: 'Холодильник',
  [LeaseAppliances['plate']]: 'Плита',
  [LeaseAppliances['microwave']]: 'Микроволновка',
  [LeaseAppliances['washer']]: 'Стиральная машина',
  [LeaseAppliances['dishwasher']]: 'Посудомоечная машина',
  [LeaseAppliances['water_heater']]: 'Водонагреватель',
  [LeaseAppliances['tv']]: 'Телевизор',
  [LeaseAppliances['iron']]: 'Утюг',
  [LeaseAppliances['hairdryer']]: 'Фен',
}
