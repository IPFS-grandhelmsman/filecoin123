const app = {
  state: {
    language: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh'
  },

  mutations: {
    TOGGLE_LANGUAGE: (state, language) => {
      state.language = language
      localStorage.setItem('locale', language)
    }
  },

  actions: {
    ToggleLanguage({ commit }, language) {
      commit('TOGGLE_LANGUAGE', language)
    }
  }
}

export default app
