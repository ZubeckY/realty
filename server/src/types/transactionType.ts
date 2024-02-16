import { DictionaryValue } from './DictionaryValue.js'

export enum TransactionType {
  sale = 'sale',
  assignment_of_lease = 'assignment_of_lease',
}

export const transactionTypeText: DictionaryValue<TransactionType> = {
  [TransactionType['sale']]: 'Продажа',
  [TransactionType['assignment_of_lease']]: 'Переуступка права аренды',
}



