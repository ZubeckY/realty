import { TimesOfDay } from '~/assets/script/functions/timesOfDay'

export class ColorTheme {
  isDark(): boolean {
    let result = setValue()

    setInterval(() => {
      result = setValue()
    }, 60 * 60 * 1000)

    function setValue() {
      switch (TimesOfDay().time) {
        case 'sunrise':
        case 'morning':
        case 'afternoon':
          return false
        case 'sunset':
        case 'evening':
        case 'night':
          return true
        default:
          return false
      }
    }

    return result
  }

  block(): string {
    let result = setValue(this.isDark())

    setInterval(() => {
      result = setValue(this.isDark())
    }, 60 * 60 * 1000)

    function setValue(isDark: boolean) {
      return isDark ? 'dark' : 'light'
    }

    return result
  }

  color(): string {
    let result = setValue(this.isDark())

    setInterval(() => {
      result = setValue(this.isDark())
    }, 60 * 60 * 1000)

    function setValue(isDark: boolean) {
      return isDark ? 'white' : 'primary darken-1'
    }

    return result
  }

  text(): string {
    let result = setValue(this.isDark())

    setInterval(() => {
      result = setValue(this.isDark())
    }, 60 * 60 * 1000)

    function setValue(isDark: boolean) {
      return isDark ? 'white--text' : 'primary--text text--darken-1'
    }

    return result
  }
}
