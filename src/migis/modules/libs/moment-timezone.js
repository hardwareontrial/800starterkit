import Vue from 'vue'
import momentTz from 'moment-timezone'

momentTz.tz.setDefault('Asia/Jakarta')
momentTz.locale('ID')

Vue.prototype.$momentTz = momentTz

export default momentTz