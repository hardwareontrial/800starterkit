import Vue from 'vue'
import axios from 'axios'

const http = axios.create({
  // baseURL: `http://${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}/v1/api/`,
  baseURL: `http://${process.env.VUE_APP_API_URL}/v1/api/`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // 'X-Custom-Header': 'foobar',
  }
});

Vue.prototype.$http = http

export default http