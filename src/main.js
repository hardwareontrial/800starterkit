import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

// import router from './router'
import store from './store'
import App from './App.vue'

import router from '@/migis/modules/router'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'

// Migis Modules & Components
import '@/migis/modules/libs'
import '@/migis/components/global-components'
import '@/migis/fonts'
import { getToken, verifyToken } from '@/migis/modules/libs/vue-cookies'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  async created() { await store.dispatch('migis/socket/init', '', {root: true}) },
  async beforeDestroy() {
    const _socket = store.state.migis.socket.socket
    const token = await getToken()
    if(token) {
      const decryptedToken = await verifyToken();
      // _socket.off(`auth:auth-user-${decryptedToken.user_id}:updated-role-permission`)
    }
    _socket.off('isLoggedIn')
    _socket.off('isLoggedOut')
  }
}).$mount('#app')
