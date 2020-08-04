// import { getStorageKey } from '@/utils'

const app = {
  state: {
    language: localStorage.getItem('locale') ? localStorage.getItem('locale') : 'zh',
    keyword: ''
  },

  mutations: {
    TOGGLE_LANGUAGE: (state, language) => {
      state.language = language
      localStorage.setItem('locale', language)
    },

    SET_KEYWORD: (state, keyword) => {
      state.keyword = keyword
    }
  },

  actions: {
    ToggleLanguage({ commit }, language) {
      commit('TOGGLE_LANGUAGE', language)
    },

    SetKeyword({ commit }, keyword) {
      commit('SET_KEYWORD', keyword)
    }
  }
}

export default app
