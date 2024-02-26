export const state = () => ({
  activeTheme: 'standard',
  themes: {
    standard: {
      background: 'defaultBack',
      input: 'defaultInput',
      title: 'primary--text text--darken-1',
      primaryColor: 'primary darken-1',
      text: 'black--text',
      color: 'black',
      article: 'defaultArticle',
    },
    nightGlow: {
      background: 'nightGlowBack',
      input: 'nightGlowInput',
      title: 'white--text',
      primaryColor: 'white',
      text: 'white--text',
      color: 'white',
      article: 'nightGlowArticle',
    },
    dark: {
      background: 'darkBack',
      input: 'darkInput',
      title: 'white--text',
      primaryColor: 'white',
      text: 'white--text',
      color: 'white',
      article: 'darkArticle',
    }
  },
})

export const mutations = {
}

export const actions = {

}
export const getters = {

}
