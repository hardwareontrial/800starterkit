import socketStore from './socketIO'
import authStore from './auth'
import gaInventarisStore from '@/migis/modules/app/ga-inventaris/store'
import usersStore from '@/migis/modules/app/user/store'
import authorizationStore from '@/migis/modules/app/authorization/store'
import hrStore from '@/migis/modules/app/hr/store'
import reservationStore from '@/migis/modules/app/reservation/store'

import { getToken } from '@/migis/modules/libs/vue-cookies'
import appMenu from '@/migis/modules/libs/app-menu'

export default {
  namespaced: true,
  state: {
    prefix: {
      DatabaseA: '97c6',
    },
    alertModal: {
      show: true,
      variant: 'danger',
      message: '[ERR] CONNECTION',
      icon: 'tabler:square-rounded-x',
    },
    unAuthorizedAlert: false,
    pageMenuName: '',
  },
  actions: {
    async init(context){},
  },
  getters: {
    getPrefix: (state) => (database) => {
      const list = state.prefix
      const prefix = list[database]
      return prefix
    },
    horizontalMenu: (state, getters, rootGetters) => (keyword) => {
      const checkToken = getToken()
      const appMenus = appMenu.data
      return appMenus.filter(item => {
        return (
          !item.isHeader &&
          (checkToken ? item.title !== 'Login' : '') &&
          item.title.toLowerCase().includes(keyword.toLowerCase())
        )
      })
    },
    verticalMenu(state, getters, rootGetters) {
      const checkToken = getToken()
      const appMenus = appMenu.data
      const groupedByParent = appMenus.reduce((acc, item) => {
        const {title, parentGroup, childGroup, icon, route, children} = item
        const formattedItem = { title, route: route.name, icon, parentGroup, childGroup }
        const formattedItemChildren = children ? children.map(child => ({title: child.title, route: child.route.name, icon: child.icon})) : undefined
        if(formattedItemChildren) { formattedItem.children = formattedItemChildren }
        if(!acc[parentGroup]) acc[parentGroup] = []
        acc[parentGroup].push(formattedItem)
        return acc
      }, {})

      for(const parentGroup in groupedByParent) {
        groupedByParent[parentGroup] = groupedByParent[parentGroup].sort((a,b) => a.title.localeCompare(b.title))
      }

      const result = []
      for(const parentGroup in groupedByParent) {
        result.push({ header: parentGroup, parentGroup, childGroup: parentGroup })
        result.push(...groupedByParent[parentGroup])
      }

      return result.filter(item => {
        return (item.header !== '' || item.childGroup !== '') && item.title !== 'Apps' && item.title !== 'Main' && (checkToken ? item.title !== 'Login' : '');
      });
    },
  },
  mutations: {
    SET_ALERT_MODAL(state, payload) {
      state.alertModal = {
        show: payload.show,
        variant: payload.variant,
        message: payload.message,
        icon: payload.icon,
      }
    },
    SET_UNAUTHORIZEDALERT(state, payload) {
      state.unAuthorizedAlert = payload
    },
    SET_PAGEMENU_NAME(state, payload) {
      state.pageMenuName = payload
    },
  },
  modules: {
    auth: authStore,
    socket: socketStore,
    gainventaris: gaInventarisStore,
    user: usersStore,
    authorization: authorizationStore,
    hr: hrStore,
    reservation: reservationStore,
  },
}
