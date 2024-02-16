import { DictionaryValue } from './DictionaryValue.js'

export enum OperationType {
  selling = 'selling',
}

export const operationTypeText: DictionaryValue<OperationType> = {
  [OperationType['selling']]: 'Продам',
}
