import Vue from 'vue'
import store from '@/store'
import { abilitiesPlugin } from '@casl/vue'

const abilities = store.getters['migis/auth/userAbilities']

Vue.use(abilitiesPlugin, abilities)
