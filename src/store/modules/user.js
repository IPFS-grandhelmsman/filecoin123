// import { login, logout, getUserInfo } from '@/api/login'
import { login } from '@/api/common'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { getStorageKey } from '@/utils'

const user = {
  state: {
    // token: getToken(),
    // name: localStorage.getItem(getStorageKey('user-name')),
    // email: localStorage.getItem(getStorageKey('email')),
    // avatar: localStorage.getItem(getStorageKey('avatar')),
    // roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_NAME: (state, name) => {
      state.name = name
      localStorage.setItem(getStorageKey('user-name'), name)
    },

    SET_EMAIL: (state, email) => {
      state.email = email
      localStorage.setItem(getStorageKey('email'), email)
    },

    SET_AVATAR: (state, avatar) => {
      if (avatar) {
        state.avatar = avatar
        localStorage.setItem(getStorageKey('avatar'), avatar)
      }
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
      localStorage.setItem(getStorageKey('avatar'), roles)
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      const account = userInfo.account ? userInfo.account.trim() : 'admin'
      return new Promise((resolve, reject) => {
        login(account, userInfo.password).then(response => {
          if (response.Status === 1) {
            const data = response.Result

            setToken(data.userId)

            commit('SET_TOKEN', data.userId)
            commit('SET_EMAIL', data.email)
            commit('SET_ROLES', ['admin'])
            commit('SET_NAME', data.nick_name)
            commit('SET_AVATAR', data.img)
          }

          resolve(response)
        }).catch(error => {
          reject(error)
        })

        // setToken('0x601568199207182280')
        // commit('SET_TOKEN', 0x601568199207182280)
        // commit('SET_ROLES', ['admin'])
        // commit('SET_NAME', 'jason')
        // resolve()
      })
    },

    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(response => {
        //   const data = response.data
        //   if (data.roles && data.roles.length > 0) {
        //     commit('SET_ROLES', data.roles)
        //   } else {
        //     reject('getInfo: roles must be a non-null array !')
        //   }
        //   commit('SET_NAME', data.name)
        //   commit('SET_AVATAR', data.avatar)
        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
        resolve()
      })
    },

    Logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')

        removeToken()
        resolve()
      })
    },

    ForceLogout({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')

        removeToken()
        resolve()
      })
    }
  }
}

export default user
