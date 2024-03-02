export const state = () => ({
  menu: [
    {
      position: 10,
      icon: "mdi-newspaper-variant",
      title: "Новости",
      link: '/news',
      access: true,
      showItem: true
    },
    {
      position: 20,
      icon: "mdi-account",
      title: "Профиль",
      link: '/profile/1',
      access: true,
      showItem: true
    },
    {
      position: 30,
      icon: "mdi-chart-scatter-plot-hexbin",
      title: "Админ панель",
      link: '/admin',
      access: true,
      showItem: true
    },
    {
      position: 40,
      icon: "mdi-city",
      title: "Недвижимость",
      link: "/",
      access: true,
      showItem: true
    },
    {
      position: 50,
      icon: "mdi-lead-pencil",
      title: "Лиды",
      link: "/leads",
      access: true,
      showItem: true
    },
    {
      position: 60,
      icon: "mdi-filter-variant",
      title: "Сделки",
      link: "/deals",
      access: true,
      showItem: true
    },
    {
      position: 70,
      icon: "mdi-account-multiple-outline",
      title: "Клиенты",
      link: "/clients",
      access: true,
      showItem: true
    },
    {
      position: 80,
      icon: "mdi-ticket-confirmation",
      title: "Бронь",
      link: "/reservation",
      access: true,
      showItem: true
    },
    {
      position: 90,
      icon: "mdi-file-arrow-left-right",
      title: "Фиды",
      link: "/feeds",
      access: true,
      showItem: true
    },
    {
      position: 100,
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
    return JSON.parse(JSON.stringify(state.menu))
  }
};
