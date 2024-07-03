import { getToken } from '@/migis/modules/libs/vue-cookies'
import http from '@/migis/modules/libs/axios';
import store from '@/store';

class DeliveryNote {
  constructor() {
    this.token = null;
    this.prefix = null;
    this._current_page = 1;
    this._per_page = 10;
    this._query = '';
    this._delivery_id = '';
    this._keywordToUpdate = '';
    this._inputRange = '';
  }

  set currentPage(value) {
    this._current_page = value;
  }

  set limitPerPage(value) {
    this._per_page = value;
  }

  set searchQuery(value) {
    this._query = value;
  }
  
  set deliveryId(value) {
    this._delivery_id = value
  }

  set keywordToUpdate(value) {
    this._keywordToUpdate = value
  }

  set inputRange(value) {
    this._inputRange = value
  }

  async init() {
    this.token = await getToken()
    this.prefix = await store.getters['migis/getPrefix']('DatabaseA')
  }

  async getDataPaginate() {
    try {
      await this.init()
      const response = await http.get(`${this.prefix}/deliverynote/all-paginate`, {
        headers: {Authorization: this.token ? `Bearer ${this.token}` : ''},
        params: {
          currentPage: this._current_page,
          limit: this._per_page,
          search: this._query,
        },
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  async getDetail() {
    try {
      await this.init()
      const response = await http.get(`${this.prefix}/deliverynote/data/${this._delivery_id}`, {
        headers: {Authorization: this.token ? `Bearer ${this.token}` : ''},
      })
      return response.data
    } catch (error) {
      throw error
    }
  }

  async create(payload) {
    try {
      await this.init()
      const creating = await http.post(`${this.prefix}/deliverynote/new`, payload, {
        headers: {Authorization: this.token ? `Bearer ${this.token}` : ''},
      })
      return creating.data
    } catch (error) {
      throw error
    }
  }

  async update(payload) {
    try {
      await this.init()
      const update = await http.put(`${this.prefix}/deliverynote/data/${this._delivery_id}`, payload, {
        headers: {Authorization: this.token ? `Bearer ${this.token}` : ''},
        params: {
          keyword: this._keywordToUpdate
        },
      })
      return update.data
    } catch (error) {
      throw error
    }
  }

  async getStatistic() {
    try {
      await this.init()
      const statistic = await http.get(`${this.prefix}/deliverynote/statistic`, {
        headers: {Authorization: this.token ? `Bearer ${this.token}` : ''},
        params: {
          inputRange: this._inputRange
        },
      })
      return statistic.data
    } catch (error) {
      throw error
    }
  }
}

export default new DeliveryNote()