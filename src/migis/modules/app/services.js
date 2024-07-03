import {getToken} from "@/migis/modules/libs/vue-cookies";
import store from "@/store";

class AppServices {
  constructor() {
    this.token = null;
    this.prefix = null;
  }

  async init() {
    this.token = await getToken()
    this.prefix = await store.getters['migis/getPrefix']('DatabaseA')
  }

  getToken() {
    return this.token
  }

  getPrefix(value) {
    return this.prefix
  }
}

export default new AppServices()