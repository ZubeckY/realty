export enum RealtyType {
  apartment = 'apartment',
  house = 'house',
  land_plot = 'land_plot',
  garage = 'garage',
  commerce = 'commerce',
}

export const realtyTypeText = {
  [RealtyType['apartment']]: 'Квартиры',
  [RealtyType['house']]: 'Дома, коттеджи',
  [RealtyType['land_plot']]: 'Земельный участок',
  [RealtyType['garage']]: 'Гаражи и машиноместа',
  [RealtyType['commerce']]: 'Коммерция',
}
