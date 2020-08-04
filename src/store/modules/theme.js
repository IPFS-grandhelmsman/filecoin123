const theme = {
  state: {
    immersive: false,
    color: '#333',
    opacity: 1.0,
    withHeader: true,
    withFooter: true
  },

  mutations: {
    SET_IMMERSIVE: (state, immersive) => {
      state.immersive = immersive
    },

    SET_COLOR: (state, color) => {
      state.color = color
    },

    SET_OPACITY: (state, opacity) => {
      state.opacity = opacity
    },

    SET_WITH_HEADER: (state, withHeader) => {
      state.withHeader = withHeader
    },

    SET_WITH_FOOTER: (state, withFooter) => {
      state.withFooter = withFooter
    }
  },

  actions: {
    SetImmersive({ commit }, immersive) {
      commit('SET_IMMERSIVE', immersive)
    },

    SetColor({ commit }, color) {
      commit('SET_COLOR', color)
    },

    SetOpacity({ commit }, opacity) {
      commit('SET_OPACITY', opacity)
    },

    SetWithHeader({ commit }, withHeader) {
      commit('SET_WITH_HEADER', withHeader)
    },

    SetWithFooter({ commit }, withFooter) {
      commit('SET_WITH_FOOTER', withFooter)
    }
  }
}

export default theme
