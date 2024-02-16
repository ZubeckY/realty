import { DictionaryValue } from './DictionaryValue.js'

// Дома, дачи, коттеджы
export enum ObjectTypeHouse {
  house = 'house',
  dacha = 'dacha',
  cottage = 'cottage',
  townhouse = 'townhouse',
}

export const objectHouseTypeText: DictionaryValue<ObjectTypeHouse> = {
  [ObjectTypeHouse['house']]: 'Дом',
  [ObjectTypeHouse['dacha']]: 'Дача',
  [ObjectTypeHouse['cottage']]: 'Коттедж',
  [ObjectTypeHouse['townhouse']]: 'Таунхаус',
}

// Земельные участки
export enum ObjectTypeLand {
  settlements = 'settlements',
  agricultural = 'agricultural',
  industrial = 'industrial',
  subsidiary_plot = 'subsidiary_plot',
}

export const objectLandTypeText: DictionaryValue<ObjectTypeLand> = {
  [ObjectTypeLand['settlements']]: 'Поселений (ИЖС)',
  [ObjectTypeLand['agricultural']]: 'Сельхозназначения (СНТ, ДНП)',
  [ObjectTypeLand['industrial']]: 'Промназначения',
  [ObjectTypeLand['subsidiary_plot']]: 'Личное подсобное хозяйство (ЛПХ)',
}

// Гаражи и машиноместа
export enum ObjectTypeGarage {
  garage = 'garage',
  parking_space = 'parking_space',
}

export const objectGarageTypeText: DictionaryValue<ObjectTypeGarage> = {
  [ObjectTypeGarage['garage']]: 'Гараж',
  [ObjectTypeGarage['parking_space']]: 'Машиноместо',
}

// Коммерческая недвижимость
export enum ObjectTypeCommerce {
  office_space = 'office_space',
  free_premises = 'free_premises',
  commercial_premises = 'commercial_premises',
  warehouse_space = 'warehouse_space',
  production_room = 'production_room',
  catering_premises = 'catering_premises',
  hotel = 'hotel',
  car_service = 'car_service',
  building = 'building',
}

export const objectCommerceTypeText: DictionaryValue<ObjectTypeCommerce> = {
  [ObjectTypeCommerce['office_space']]: 'Офисное помещение',
  [ObjectTypeCommerce['free_premises']]: 'Помещение свободного назначения',
  [ObjectTypeCommerce['commercial_premises']]: 'Торговое помещение',
  [ObjectTypeCommerce['warehouse_space']]: 'Складское помещение',
  [ObjectTypeCommerce['production_room']]: 'Производственное помещение',
  [ObjectTypeCommerce['catering_premises']]: 'Помещение общественного питания',
  [ObjectTypeCommerce['hotel']]: 'Гостиница',
  [ObjectTypeCommerce['car_service']]: 'Автосервис',
  [ObjectTypeCommerce['building']]: 'Здание',
}
