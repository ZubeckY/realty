import { DealStages } from '~/assets/script/models/DealStages'

export default function getColorDeal(item: string): string {
  switch (item) {
    case DealStages['new_client']:
      return 'green darken-1 white--text'
    case DealStages['no_answer']:
      return 'blue darken-1 white--text'
    case DealStages['is_warmed_up']:
      return 'amber darken-1 white--text'
    case DealStages['going_to_deal']:
      return 'light-blue lighten-3 white--text'
    case DealStages['is_closed']:
      return 'red darken-1 white--text'
    default:
      return ''
  }
}
