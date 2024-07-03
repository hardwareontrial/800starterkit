import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import home from '@/migis/modules/home/route'
import auth from '@/migis/modules/auth/route'
import dashboard from '@/migis/modules/dashboard/route'
import app from '@/migis/modules/app/route'
import { checkToken } from '../libs/vue-cookies'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    auth,
    home,
    dashboard,
    app,
    {
      path: '*',
      name: '404-not-found',
      component: () => import('@/migis/modules/app/error/404.vue'),
      meta: {
        subject: 'App',
        actions: 'read',
        redirectIfLoggedIn: false,
      },
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const hasToken = await checkToken()
  const abilities = await store.getters['migis/auth/userAbilities']
  store.commit('migis/auth/SET_LOGGEDIN', hasToken, {root: true})
  const canNavigate = to => to.matched.some(route => abilities.can(route.meta.action || 'read', route.meta.subject))
  
  if(!canNavigate(to)) {
    if(!hasToken) {
      return next({name: 'auth-login-view'})
    }
    store.commit('migis/SET_UNAUTHORIZEDALERT', true, {root: true})
  }
  
  if(hasToken && to.meta.redirectIfLoggedIn) { next({name: 'dashboard-view'}) }
  
  let documentTitle = `${ process.env.VUE_APP_TITLE }`
  if(to.meta.tabTitle){
    documentTitle += ` | ${ to.meta.tabTitle }`
  }
  document.title = documentTitle;
  store.commit('migis/SET_UNAUTHORIZEDALERT', false, {root: true})
  return next()
})

router.afterEach(() => {

  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
