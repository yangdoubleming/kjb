import { login, logout, getInfo } from '@/api/login'
import { getUser, setUser, removeUser } from '@/utils/auth'

const user = {
  state: {
    user: getUser(),
    menus: {}
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          setUser(response)
          commit('SET_USER', response);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetMenus({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(getUser().token).then(response => {
          commit('SET_MENUS', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_USER', '')
          commit('SET_MENUS', {})
          removeUser()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_USER', '')
        removeUser()
        resolve()
      })
    }
  }
}

export default user
