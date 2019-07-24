import { login, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    userInfo: {
      id: '',
      username: '',
      avatar: '',
      nickname: ''
    },
    status: '',
    access_token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.access_token = token
    },
    SET_USERINFO_ID: (state, userId) => {
      state.userInfo.id = userId
    },
    SET_USERINFO_USERNAME: (state, username) => {
      state.userInfo.username = username
    },
    SET_USERINFO_NICKNAME: (state, nickname) => {
      state.userInfo.nickname = nickname
    },
    SET_USERINFO_AVATAR: (state, avatar) => {
      state.userInfo.avatar = avatar
    },
    SET_STATUS: (state, status) => {
      state.status = status
    }
  },

  actions: {
    // user login
    login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          const accessToken = data.access_token
          commit('SET_TOKEN', accessToken)
          setToken(accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (!response.data) {
            reject(new Error('Verification failed, please login again.'))
          }
          const data = response.data
          commit('SET_USERINFO_ID', data.id)
          commit('SET_USERINFO_USERNAME', data.username)
          commit('SET_USERINFO_NICKNAME', data.nickname)
          commit('SET_USERINFO_AVATAR', data.avataricon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    fedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
