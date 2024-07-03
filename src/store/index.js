import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import migisStore from '@/migis/modules/store'
import abilityPlugin from '@/migis/modules/store/plugins/ability'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    migis: migisStore,
  },
  plugins: [
    abilityPlugin,
  ],
  strict: process.env.DEV,
})
