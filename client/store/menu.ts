export const state = () => ({
  menu: [
    {
      position: 10,
      icon: "mdi-account",
      title: "Профиль",
      link: '/profile/1',
      access: true,
      showItem: true
    },
    {
      position: 20,
      icon: "mdi-city",
      title: "Недвижимость",
      link: "/",
      access: true,
      showItem: true
    },
    {
      position: 30,
      icon: "mdi-lead-pencil",
      title: "Лиды",
      link: "/leads",
      access: true,
      showItem: true
    },
    {
      position: 40,
      icon: "mdi-triangle-down",
      title: "Воронка",
      link: "/funnel",
      access: true,
      showItem: true
    },
    {
      position: 50,
      icon: "mdi-account-multiple-outline",
      title: "Клиенты",
      link: "/clients",
      access: true,
      showItem: true
    },
    {
      position: 60,
      icon: "mdi-ticket-confirmation",
      title: "Бронь",
      link: "/reservation",
      access: true,
      showItem: true
    },
    {
      position: 70,
      icon: "mdi-file-arrow-left-right",
      title: "Фиды",
      link: "/feeds",
      access: true,
      showItem: true
    },
    {
      position: 80,
      icon: "mdi-chess-rook",
      title: "Шахматка",
      link: "/chess",
      access: true,
      showItem: true
    }
  ]
});
export const mutations = {
};

export const actions = {};
export const getters = {
  getMenu(state: any) {
    return state.menu
  }
};
