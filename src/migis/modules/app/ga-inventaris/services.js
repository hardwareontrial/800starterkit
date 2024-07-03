import { getToken } from '@/migis/modules/libs/vue-cookies'
import http from '@/migis/modules/libs/axios';
import store from '@/store';
import AppServices from '@/migis/modules/app/services'

class GaInventaris {
  constructor() {
    this.routename = 'gainventaris';
  }

  async init() {
    await this.getDataAll()
    await this.getDataLocation()
    await this.getDataMerk()
  };

  release() {
    store.commit('migis/gainventaris/SET_GAINVLIST', [])
    store.commit('migis/gainventaris/SET_MERKLIST', [])
    store.commit('migis/gainventaris/SET_LOCATIONLIST', [])
    store.commit('migis/user/SET_USERS', [])
  };

  async getDataAll() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/all`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      if(response.data.success) {
        store.commit('migis/gainventaris/SET_GAINVLIST', response.data.data)
      }
      return response.data
    } catch (error) {
      throw error
    }
  };

  async getDataPaginate() {}
  async create(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/new`, 
      { form: payload.form },
      {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        params: { updateKeyword: payload.keyword }
      })
      return response.data
    } catch (error) {
      throw error
    }
  };
  
  async update(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.put(`${prefix}/${this.routename}/update/${payload.id}`, 
      { form: payload.form },
      {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        params: { updateKeyword: payload.keyword }
      })
      return response.data
    } catch (error) {
      throw error
    }
  };

  async delete(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.delete(`${prefix}/${this.routename}/data/${payload.id}`, 
      {
        headers: { Authorization: token ? `Bearer ${token}` : '' },
        params: { kode_brg: payload.unique }
      })
      return response.data
    } catch (error) {
      throw error
    }
  }
  
  async getDataLocation() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/all-location`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      if(response.data.success) {
        store.commit('migis/gainventaris/SET_LOCATIONLIST', response.data.data)
      }
      return response.data
    } catch (error) {
      throw error
    }
  };

  async createLocation(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/new/location`, payload, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      return response.data
    } catch (error) {
      throw error
    }
  };
  
  async getDataMerk() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/all-merk`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      if(response.data.success) {
        store.commit('migis/gainventaris/SET_MERKLIST', response.data.data)
      }
      return response.data
    } catch (error) {
      throw error
    }
  };

  async createMerk(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/new/merk`, payload, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      return response.data
    } catch (error) {
      throw error
    }
  };
}

export default new GaInventaris()