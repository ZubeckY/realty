import { Stages } from '~/assets/script/models/Stages'

export default function getColorDeal(item: string): string {
  switch (item) {
    case Stages['new_client']:
      return 'green darken-1 white--text'
    case Stages['no_answer']:
      return 'blue darken-1 white--text'
    case Stages['is_warmed_up']:
      return 'amber darken-1 white--text'
    case Stages['transition_to_deal']:
      return 'light-blue lighten-3 white--text'
    case Stages['is_closed']:
      return 'red darken-1 white--text'
    default:
      return ''
  }
}
