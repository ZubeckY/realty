import { DictionaryValue } from './DictionaryValue.js'

export enum PropertyRights {
  owner = 'owner',
  mediator = 'mediator',
  developer = 'developer',
}

export const propertyRightsTypeText: DictionaryValue<PropertyRights> = {
  [PropertyRights['owner']]: 'Собственник',
  [PropertyRights['mediator']]: 'Посредник',
  [PropertyRights['developer']]: 'Застройщик',
}
