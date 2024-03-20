export const state = () => ({
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    agency: {
      id: 0
    }
  }
});

export const mutations = {
  setUserValues(state: any, payload: any) {
    state.user = { ...payload }
  }
}

export const actions = {
  async userValues({ dispatch, commit }: any, payload: any) {
    commit('setUserValues', payload.payload)
  }

}
export const getters = {};
