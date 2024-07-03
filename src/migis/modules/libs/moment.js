import Vue from 'vue'
import moment from 'moment'

moment.locale('ID')

Vue.prototype.$moment = moment

export default moment