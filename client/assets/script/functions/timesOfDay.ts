export function TimesOfDay() {
  const hours = new Date().getHours();

  if (hours >= 0 || hours < 6) {
    return {
      greetings: "Доброй ночи, ",
      time: "night"
    };
  }

  if (hours >= 6 && hours < 11) {
    return {
      greetings: "Доброе утро, ",
      time: "morning"
    };
  }

  if (hours >= 11 && hours < 17) {
    return {
      greetings: "Добрый день, ",
      time: "afternoon"
    };
  }

  if (hours >= 17 && hours < 20) {
    return {
      greetings: "Добрый вечер, ",
      time: "evening"
    };
  }

  if (hours >= 20 || hours <= 23) {
    return {
      greetings: "Доброй ночи, ",
      time: "night"
    };
  }

  return {
    greetings: "Добрый день, ",
    time: "afternoon"
  };
}
