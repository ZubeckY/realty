import { TimesOfDay } from '~/assets/script/functions/timesOfDay'

export class ColorTheme {
  isDark(): boolean {
    switch (TimesOfDay().time) {
      case 'morning':
      case 'afternoon':
        return false
      case 'evening':
      case 'night':
        return true
      default:
        return false
    }
  }

  block(): string {
    return this.isDark() ? 'dark' : 'light'
  }

  text(): string {
    return this.isDark() ? 'white--text' : 'primary--text text--darken-1'
  }
}
