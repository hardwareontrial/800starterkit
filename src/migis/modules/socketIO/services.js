import io from 'socket.io-client'
import store from "@/store";
import AuthorizationService from '@/migis/modules/app/authorization/services'
import { getToken, verifyToken } from '@/migis/modules/libs/vue-cookies'

class SocketIOService {
  constructor() {}

  initialize() {
    try {
      // const socket = io(`http://${process.env.VUE_APP_WEBSOCKET_URL}:${process.env.VUE_APP_WEBSOCKET_PORT}`,{
        const socket = io(`http://${process.env.VUE_APP_WEBSOCKET_URL}`,{
        transports: ['websocket'],
        path: '/socket.io',
      });

      socket.on('connect', async () => {
        store.commit('migis/socket/SET_SOCKET', socket)
        store.commit('migis/socket/SET_SOCKET_PROPS', socket)
        store.commit('migis/SET_ALERT_MODAL', {show: true, variant: 'primary', message: 'CONNECTED', icon: 'tabler:square-rounded-check'}, {root: true})
        store.commit('migis/socket/SET_ERR_MESSAGE', null, { root: true });
        const token = await getToken()
        if(token) {
          const decryptedToken = await verifyToken();
          await AuthorizationService.sendAuthenticate()
          socket.on(`auth:auth-user-${decryptedToken.user_id}:updated-role-permission`, async (response) => {
            console.log(response)
            const updatedRolePermission = await AuthorizationService.getAuthenticated({userdata: response})
          });
        }
        setTimeout(async () => {
          store.commit('migis/SET_ALERT_MODAL', {show: false, variant: 'primary', message: 'CONNECTED', icon: 'tabler:square-rounded-check'}, {root: true})
          store.commit('migis/socket/SET_ERR_MESSAGE', 'CONNECTED', { root: true });
        }, 3000)


      });

      socket.on('connect_error', async (err) => {
        store.commit('migis/SET_ALERT_MODAL', {show: true, variant: 'danger', message: '[ERR] CONNECTION', icon: 'tabler:square-rounded-x'}, {root: true})
        store.commit('migis/auth/SET_LOGGEDIN', false, {root: true})
        store.commit('migis/socket/SET_ERR_MESSAGE', '[ERR] CONNECTION', { root: true });
      });

      socket.on('disconnect', async (err) => {
        store.commit('migis/SET_ALERT_MODAL', {show: true, variant: 'warning', message: '[ERR] DISCONNECTED', icon: 'tabler:square-square-x'}, {root: true})
        store.commit('migis/auth/SET_LOGGEDIN', false, {root: true})
        store.commit('migis/socket/SET_ERR_MESSAGE', '[ERR] DISCONNECTED', { root: true });
      });

    } catch (error) {
      store.commit('migis/socket/SET_ERR_MESSAGE', e)
    }
  };
}

export default new SocketIOService()