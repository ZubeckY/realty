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
      link: "/profile/",
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
      access: 'agency',
      showItem: true,
      routeName: "todo",
      headerComponent: "todo-header"
    },
    {
      position: 40,
      icon: "mdi-chart-tree",
      title: "Админ панель",
      link: "/admin",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "admin",
      headerComponent: "admin-header"
    },
    {
      position: 50,
      icon: "mdi-city",
      title: "Недвижимость",
      link: "/realty",
      access: 'agency',
      showItem: true,
      routeName: "realty",
      headerComponent: "realty-header"
    },
    {
      position: 60,
      icon: "mdi-lead-pencil",
      title: "Лиды",
      link: "/leads",
      access: 'agency,role=admin&manager&rop',
      showItem: true,
      routeName: "leads",
      headerComponent: "leads-header"
    },
    {
      position: 70,
      icon: "mdi-filter-variant",
      title: "Сделки",
      link: "/deals",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "deals",
      headerComponent: "deals-header"
    },
    {
      position: 80,
      icon: "mdi-account-multiple-outline",
      title: "Клиенты",
      link: "/clients",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "clients",
      headerComponent: "clients-header"
    },
    {
      position: 90,
      icon: "mdi-ticket-confirmation",
      title: "Бронь",
      link: "/reservation",
      access: 'agency,role=admin',
      showItem: false,
      routeName: "reservation",
      headerComponent: "reservation-header"
    },
    {
      position: 100,
      icon: "mdi-file-arrow-left-right",
      title: "Фиды",
      link: "/feeds",
      access: 'agency',
      showItem: true,
      routeName: "feeds",
      headerComponent: "feeds-header"
    },
    {
      position: 110,
      icon: "mdi-chess-rook",
      title: "Шахматка",
      link: "/chess",
      access: 'agency',
      showItem: false,
      routeName: "chess",
      headerComponent: "chess-header"
    }
  ],
  menuAdmin: [
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
      link: "/profile/",
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
      access: 'agency',
      showItem: true,
      routeName: "todo",
      headerComponent: "todo-header"
    },
    {
      position: 40,
      icon: "mdi-chart-tree",
      title: "Админ панель",
      link: "/admin",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "admin",
      headerComponent: "admin-header"
    },
    {
      position: 40,
      icon: "mdi-home-circle",
      title: "Агентство",
      link: "/admin/agency",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "admin",
      headerComponent: "admin-header"
    },
    {
      position: 40,
      icon: "mdi-account-group",
      title: "Пользователи",
      link: "/admin/users",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "admin",
      headerComponent: "admin-header"
    },
    {
      position: 40,
      icon: "mdi-account-plus",
      title: "Заявки",
      link: "/admin/memberships",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "admin",
      headerComponent: "admin-header"
    },
    {
      position: 40,
      icon: "mdi-chart-line",
      title: "Статистика",
      link: "/admin/statistics",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "admin",
      headerComponent: "admin-header"
    },
    {
      position: 50,
      icon: "mdi-city",
      title: "Недвижимость",
      link: "/realty",
      access: 'agency',
      showItem: true,
      routeName: "realty",
      headerComponent: "realty-header"
    },
    {
      position: 60,
      icon: "mdi-lead-pencil",
      title: "Лиды",
      link: "/leads",
      access: 'agency,role=admin&manager&rop',
      showItem: true,
      routeName: "leads",
      headerComponent: "leads-header"
    },
    {
      position: 70,
      icon: "mdi-filter-variant",
      title: "Сделки",
      link: "/deals",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "deals",
      headerComponent: "deals-header"
    },
    {
      position: 80,
      icon: "mdi-account-multiple-outline",
      title: "Клиенты",
      link: "/clients",
      access: 'agency,role=admin',
      showItem: true,
      routeName: "clients",
      headerComponent: "clients-header"
    },
    {
      position: 90,
      icon: "mdi-ticket-confirmation",
      title: "Бронь",
      link: "/reservation",
      access: 'agency,role=admin',
      showItem: false,
      routeName: "reservation",
      headerComponent: "reservation-header"
    },
    {
      position: 100,
      icon: "mdi-file-arrow-left-right",
      title: "Фиды",
      link: "/feeds",
      access: 'agency',
      showItem: true,
      routeName: "feeds",
      headerComponent: "feeds-header"
    },
    {
      position: 110,
      icon: "mdi-chess-rook",
      title: "Шахматка",
      link: "/chess",
      access: 'agency',
      showItem: false,
      routeName: "chess",
      headerComponent: "chess-header"
    }
  ],
});
export const mutations = {};

export const actions = {};

export const getters = {
  getAdminMenu(state: any) {
    return state.menuAdmin;
  },
  getMenu(state: any) {
    return state.menu;
  }
};
