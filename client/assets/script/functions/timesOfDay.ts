export function TimesOfDay() {
  const hours = new Date().getHours()

  if (hours >= 0 && hours < 5) {
    return {
      greetings: 'Доброй ночи, ',
      time: 'night',
    }
  } else if (hours >= 5 && hours < 7) {
    return {
      greetings: 'Добрый утро, ',
      time: 'evening',
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
      greetings: 'Доброе вечер, ',
      time: 'morning',
    }
  } else if (hours >= 18 && hours < 20) {
    return {
      greetings: 'Добрый вечер, ',
      time: 'evening',
    }
  } else if (hours >= 20 && hours <= 23) {
    return {
      greetings: 'Доброй ночи, ',
      time: 'night',
    }
  }

  return {
    greetings: 'Добрый день, ',
    time: 'afternoon',
  }
}
