import { removeToken } from "@/migis/modules/libs/vue-cookies";
import SocketIOServices from '@/migis/modules/socketIO/services'
import AuthorizationService from '@/migis/modules/app/authorization/services'
import router from '@/migis/modules/router'

export default {
  namespaced: true,
  state: {
    socket: null,
    socketProps: {
      id: null,
      connected: false,
    },
    err_message: null,
  },
  actions: {
    async init(context){
      try {
        const initialize = SocketIOServices.initialize()
        return true
      } catch (error) {
        throw error
      }
    },
    async emitting(context, payload){
      return new Promise((resolve, reject) => {
        context.state.socket.emit(payload.eventName, payload.eventMessage)
        
        context.state.socket.on('isLoggedIn', async (response) => {
          await AuthorizationService.getAuthenticated({userdata: response.data})
          resolve(response)
        });

        context.state.socket.on('isLoggedOut', async (response) => {
          if(response.success) {
            context.commit('migis/auth/SET_LOGGEDIN', false, { root: true });
            context.commit('migis/auth/SET_USERABILITIES', context.rootState.migis.auth.initialAbilities, { root: true });
            context.commit('migis/auth/SET_USERDATA', null, { root: true });
            context.commit('migis/auth/SET_USERID', null, { root: true });
            await removeToken()
            if(router.currentRoute.name !== 'auth-login-view'){
              await router.replace({name: 'auth-login-view'}).catch(() => true);
            }
            resolve(response)
          } else {
            context.commit('migis/SET_ALERT_MODAL', {show: true, variant: 'danger', message: '[ERR] SIGNOUT FAILED!', icon: 'tabler:logout-2'}, {root: true})
            reject(response)
          }
        });
      })
    },
  },
  mutations: {
    SET_SOCKET(state, payload){
      state.socket = payload
    },
    SET_SOCKET_PROPS(state, payload) {
      state.socketProps = {
        id: payload.id,
        connected: payload.connected,
      }
    },
    SET_ERR_MESSAGE(state, payload) {
      state.err_message = payload
    },
  },
  getters: {},
  modules: {},
}
