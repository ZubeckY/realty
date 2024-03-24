export function TimesOfDay() {
  let hours = new Date().getHours()
  let result = setResult()

  setInterval(() => {
    hours = new Date().getHours()
    result = setResult()
  }, 60 * 60 * 1000)

  function setResult() {
    if (hours >= 0 && hours < 5) {
      return {
        greetings: 'Доброй ночи, ',
        time: 'night',
      }
    } else if (hours >= 5 && hours < 7) {
      return {
        greetings: 'Доброе утро, ',
        time: 'sunrise',
      }
    } else if (hours >= 7 && hours < 11) {
      return {
        greetings: 'Доброе утро, ',
        time: 'morning',
      }
    } else if (hours >= 11 && hours < 16) {
      return {
        greetings: 'Добрый день, ',
        time: 'afternoon',
      }
    } else if (hours >= 16 && hours < 18) {
      return {
        greetings: 'Добрый вечер, ',
        time: 'evening',
      }
    } else if (hours >= 18 && hours < 20) {
      return {
        greetings: 'Добрый вечер, ',
        time: 'sunset',
      }
    } else if (hours >= 20 && hours <= 23) {
      return {
        greetings: 'Доброй ночи, ',
        time: 'night',
      }
    }
  }

  return result
}
