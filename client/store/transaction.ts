export const state = () => ({
  stage: []
});

export const mutations = {};
export const actions = {
  getColor(state: any, item: string) {
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
};
export const getters = {};
