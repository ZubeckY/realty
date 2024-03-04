export default function getColorDeal(item: string): string {
  switch (item) {
    case "потенциальный клиент":
      return "yellow darken-1 white--text";
    case "первый звонок":
      return "orange darken-1 white--text";
    case "покупатель прогрет":
      return "red darken-1 white--text";
    case "переход в сделку":
      return "lime darken-1 white--text";
    case "закрыто и не реализовано":
      return "green darken-1 white--text";
    default:
      return "";
  }
}
