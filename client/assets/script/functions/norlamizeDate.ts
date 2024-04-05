export function normalizeDate(date: any) {
  const DATE = new Date(date)
  const monthList = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек"
  ]

  return (
    DATE.getDate() +
    " " +
    monthList[DATE.getMonth()] +
    " " +
    DATE.getFullYear()
  )
}