export const state = () => ({
  menu: [
    {
      position: 10,
      icon: "mdi-newspaper-variant",
      title: "Новости",
      link: "/news",
      access: true,
      showItem: true,
      routeName: "news",
      headerComponent: "news-header"
    },
    {
      position: 20,
      icon: "mdi-account",
      title: "Профиль",
      link: "/profile/1",
      access: true,
      showItem: true,
      routeName: "profile-id",
      headerComponent: "profile-header"
    },
    {
      position: 30,
      icon: "mdi-list-status",
      title: "Задачи",
      link: "/todo",
      access: true,
      showItem: true,
      routeName: "todo",
      headerComponent: ""
    },
    {
      position: 40,
      icon: "mdi-chart-scatter-plot-hexbin",
      title: "Админ панель",
      link: "/admin",
      access: true,
      showItem: true,
      routeName: "admin",
      headerComponent: "admin-header"
    },
    {
      position: 50,
      icon: "mdi-city",
      title: "Недвижимость",
      link: "/realty",
      access: true,
      showItem: true,
      routeName: "realty",
      headerComponent: "realty-header"
    },
    {
      position: 60,
      icon: "mdi-lead-pencil",
      title: "Лиды",
      link: "/leads",
      access: true,
      showItem: true,
      routeName: "leads",
      headerComponent: "leads-header"
    },
    {
      position: 70,
      icon: "mdi-filter-variant",
      title: "Сделки",
      link: "/deals",
      access: true,
      showItem: true,
      routeName: "deals",
      headerComponent: "deals-header"
    },
    {
      position: 80,
      icon: "mdi-account-multiple-outline",
      title: "Клиенты",
      link: "/clients",
      access: true,
      showItem: true,
      routeName: "clients",
      headerComponent: "clients-header"
    },
    {
      position: 90,
      icon: "mdi-ticket-confirmation",
      title: "Бронь",
      link: "/reservation",
      access: true,
      showItem: true,
      routeName: "reservation",
      headerComponent: "reservation-header"
    },
    {
      position: 100,
      icon: "mdi-file-arrow-left-right",
      title: "Фиды",
      link: "/feeds",
      access: true,
      showItem: true,
      routeName: "feeds",
      headerComponent: "feeds-header"
    },
    {
      position: 110,
      icon: "mdi-chess-rook",
      title: "Шахматка",
      link: "/chess",
      access: true,
      showItem: true,
      routeName: "chess",
      headerComponent: "chess-header"
    }
  ]
});
export const mutations = {};

export const actions = {};

export const getters = {
  getMenu(state: any) {
    return state.menu;
  }
};
