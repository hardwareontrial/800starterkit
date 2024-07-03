import { Ability } from '@casl/ability'

export default {
  namespaced: true,
  state: {
    isLoggedIn: false,
    initialAbilities: [
      { action: 'read', subject: 'App' },
    ],
    userId: null,
    userData: null,
    userAbilities: [],
  },
  actions: {},
  mutations: {
    SET_LOGGEDIN(state, payload) {
      state.isLoggedIn = payload
    },
    SET_USERABILITIES(state, payload) {
      state.userAbilities = payload
    },
    SET_USERID(state, payload) {
      state.userId = payload
    },
    SET_USERDATA(state, payload) {
      state.userData = payload
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn
    },
    userAbilities(state) {
      return new Ability(state.initialAbilities)
    },
    userData(state) {
      return state.userData
    },
    userIsAdmin(state) {
      if(!state.userData){ return false }
      return !!state.userData.is_admin
    }
  },
  modules: {},
}
