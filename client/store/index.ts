export const state = () => ({
  activeTheme: "standard",
  themes: {
    standard: {
      background: "defaultBack",
      backgroundImageActive: false,
      input: "defaultInput",
      title: "primary--text text--darken-1",
      primaryColor: "primary darken-1",
      text: "black--text",
      color: "black",
      article: "defaultArticle"
    },
    dark: {
      background: "defaultBack",
      backgroundImageActive: true,
    }
  }
});

export const mutations = {};
export const actions = {};
export const getters = {};
