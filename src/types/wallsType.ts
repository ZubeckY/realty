import { DictionaryValue } from './DictionaryValue.js'

export enum WallsType {
  brick = 'brick',
  timber = 'timber',
  log = 'log',
  gas_block = 'gas_block',
  metal = 'metal',
  foam_block = 'foam_block',
  sandwich_panels = 'sandwich_panels',
  reinforced_concrete = 'reinforced_concrete',
  experimental_materials = 'experimental_materials',
}

export const wallsTypeText: DictionaryValue<WallsType> = {
  [WallsType['brick']]: 'Кирпич',
  [WallsType['timber']]: 'Брус',
  [WallsType['log']]: 'Бревно',
  [WallsType['gas_block']]: 'Газоблоки',
  [WallsType['metal']]: 'Металл',
  [WallsType['foam_block']]: 'Пеноблоки',
  [WallsType['sandwich_panels']]: 'Сэндвич-панели',
  [WallsType['reinforced_concrete']]: 'Ж/б панели',
  [WallsType['experimental_materials']]: 'Экспериментальные материалы',
}