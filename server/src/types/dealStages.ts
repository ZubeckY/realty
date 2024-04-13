import { DictionaryValue } from './DictionaryValue'

export enum DealStages {
  new_client = 'new_client',
  no_answer = 'no_answer',
  is_warmed_up = 'is_warmed_up',
  going_to_deal = 'going_to_deal',
  is_closed = 'is_closed',
}

export const dealStagesTypeText: DictionaryValue<DealStages> = {
  [DealStages['new_client']]: 'потенциальный клиент',
  [DealStages['no_answer']]: 'нет ответа',
  [DealStages['is_warmed_up']]: 'покупатель прогрет',
  [DealStages['going_to_deal']]: 'переход в сделку',
  [DealStages['is_closed']]: 'закрыто и не реализовано',
}
