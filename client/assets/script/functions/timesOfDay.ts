export function TimesOfDay() {
  const hours = new Date().getHours();

  if (hours >= 6 && hours < 11) {
    return {
      greetings: "Доброе утро, ",
      time: "morning"
    };
  }

  if (hours >= 11 && hours < 16) {
    return {
      greetings: "Добрый день, ",
      time: "afternoon"
    };
  }

  if (hours >= 16 && hours < 22) {
    return {
      greetings: "Добрый вечер, ",
      time: "evening"
    };
  }

  if (hours >= 22 || hours <= 6) {
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
