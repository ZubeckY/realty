import { DictionaryValue } from './DictionaryValue.js'

// Дома, дачи, коттеджы

export enum ParkingTypeHouse {
  none = 'none',
  garage = 'garage',
  parking_place = 'parking_place',
}

export const parkingHouseTypeText: DictionaryValue<ParkingTypeHouse> = {
  [ParkingTypeHouse['none']]: 'Нет',
  [ParkingTypeHouse['garage']]: 'Гараж',
  [ParkingTypeHouse['parking_place']]: 'Парковочное место',
}

// Коммерческая недвижимость
export enum ParkingTypeCommerce {
  none = 'none',
  street = 'street',
  inside_house = 'inside_house',
}

export const parkingCommerceTypeText: DictionaryValue<ParkingTypeCommerce> = {
  [ParkingTypeCommerce['none']]: 'Нет',
  [ParkingTypeCommerce['street']]: 'На улице',
  [ParkingTypeCommerce['inside_house']]: 'В здании',
}



