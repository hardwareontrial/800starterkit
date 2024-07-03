import AppServices from '@/migis/modules/app/services'
import store from '@/store';
import http from '@/migis/modules/libs/axios';
import moment from 'moment';

class HRServices {
  constructor() {
    this.routename = 'hr';
  };

  /** Organization Section */
  // Position
  async getPositionAll() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/position/all`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      })
      if(response.data.success) {
        store.commit('migis/hr/SET_POSITIONS', response.data.data)
      }
      return response.data
    } catch (error) {
      throw error
    }
  };

  async createPosition(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()

      const creatingForm = {
        id: payload.id,
        unique_str: payload.unique_str,
        name: payload.name.toUpperCase(),
        deptId: payload.department_id,
        level: payload.level,
        superPos: payload.parent_position_id,
        employeeIds: JSON.stringify(payload.users),
        isActive: JSON.stringify(payload.isActive),
      }

      const response = await http.post(`${prefix}/${this.routename}/position/create`, creatingForm, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      
      await this.getPositionAll()
      await this.getDeptsAll()

      return response.data
    } catch (error) {
      throw error
    }
  };

  async updatePosition(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()

      const updatingForm = {
        id: payload.id,
        unique_str: payload.unique_str,
        name: payload.name.toUpperCase(),
        deptId: payload.department_id,
        level: payload.level,
        superPos: payload.parent_position_id,
        employeeIds: JSON.stringify(payload.users),
        isActive: JSON.stringify(payload.isActive),
      }

      const response = await http.put(`${prefix}/${this.routename}/position/${payload.id}/update`, updatingForm, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      
      await this.getPositionAll()
      await this.getDeptsAll()

    } catch (error) {
      throw error
    }
  };

  validatorPosition(form) {
    const errors = []
    if(!form.name) errors.push('Nama tidak boleh kosong.');
    if(!form.level) errors.push('Pilih salah satu level posisi.');
    if(!form.department_id) errors.push('Pilih salah satu departemen.');
    
    return { success: errors.length === 0, message: errors }
  };
  // End Position

  // Department
  async getDeptsAll() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/dept/all`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });

      if(response.data.success) {
        if(response.data.data) {
          store.commit('migis/hr/SET_DEPTS', response.data.data)
        }
      }

      return response.data
    } catch (error) {
      throw error
    }
  };
  
  async createDept(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()

      const creatingForm = {
        id: payload.id,
        name: payload.name.toUpperCase(),
        isActive: JSON.stringify(payload.isActive),
        positions: JSON.stringify(payload.positions_id)
      };
      
      const response = await http.post(`${prefix}/${this.routename}/dept/create`, creatingForm, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      
      await this.getDeptsAll()
      await this.getPositionAll()

      return response.data
    } catch (error) {
      throw error
    }
  };

  async detailDept(payload) {
    try {
      const response = await http.get(`${prefix}/${this.routename}/dept/${payload.id}/detail`, creatingForm, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      
      return response.data
    } catch (error) {
      throw error
    }
  };

  async updateDept(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()

      const updatingForm = {
        id: payload.id,
        name: payload.name.toUpperCase(),
        isActive: JSON.stringify(payload.isActive),
        positions: JSON.stringify(payload.positions_id)
      };
      
      const response = await http.put(`${prefix}/${this.routename}/dept/${payload.id}/update`, updatingForm, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      
      await this.getDeptsAll()
      await this.getPositionAll()

      return response.data
    } catch (error) {
      throw error
    }
  };

  validatorDept(formDept) {
    const errors = [];

    if(!formDept.name) errors.push('Nama tidak boleh kosong');

    return { success: errors.length === 0, message: errors }
  };
  // End Department
  /** End Organization Section */

  /** Sync-Attn Section */
  async synchronizeAttendance(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const form = {
        startDate: payload.start_time,
        endDate: payload.end_time
      }
      const response = await http.post(`${prefix}/${this.routename}/attn/sync`, form, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      
      return response.data
    } catch (error) {
      throw error
    }
  };

  async getTextFileAttendance(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const form = {
        startDate: moment(payload.start_time).format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(payload.end_time).format('YYYY-MM-DD HH:mm:ss'),
      }
      const response = await http.post(`${prefix}/${this.routename}/attn/export`, form, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
        responseType: 'blob',
      });
      return response
    } catch (error) {
      throw error
    }
  };

  async getAttnStatistic() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const statistics = await http.get(`${prefix}/${this.routename}/attn/statistic`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      return statistics.data
    } catch (error) {
      throw error
    }
  };

  async getAttnLogs() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const logs = await http.get(`${prefix}/${this.routename}/attn/log`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      return logs.data
    } catch (error) {
      throw error
    }
  };

  validatorAttn(form) {
    const errors = []

    if(!form.start_time) {errors.push('Tentukan tanggal dan waktu dimulai.')}
    if(!form.end_time) {errors.push('Tentukan tanggal dan waktu diakhiri.')}

    if(form.start_time && form.end_time) {
      const start = moment(form.start_time, 'YYYY-MM-DD HH:mm')
      const end = moment(form.end_time, 'YYYY-MM-DD HH:mm')
      const startHour = start.hour()
      const endHour = end.hour()

      if(!end.isAfter(start)) {errors.push('Jam berakhir harus lebih dari jam mulai.')}
    }
    return { success: errors.length === 0, message: errors }
  };
  /** End Sync-Attn Section */
}

export default new HRServices()