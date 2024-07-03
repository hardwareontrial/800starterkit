import AppServices from '@/migis/modules/app/services'
import http from '@/migis/modules/libs/axios';
import store from '@/store';
import moment from 'moment';

class ReservationServices {
  constructor() {
    this.routename = 'reservation';
  }

  /** Room Resource Section */
  async getRoomResources() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/rooms/resources`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });

      if(response.data.success) {
        store.commit('migis/reservation/SET_ROOMRESOURCES', response.data.data, {root:true})
      }

      return response.data
    } catch (error) {
      throw error
    }
  };

  async createRoomResources(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/rooms/resources`, payload, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      await this.getRoomResources()
      return response.data
    } catch (error) {
      throw error
    }
  };

  async updateRoomResources(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.put(`${prefix}/${this.routename}/rooms/resources/${payload.id}`, payload, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      await this.getRoomResources()
      return response.data
    } catch (error) {
      throw error
    }
  };

  async validatorRoomResource(payload) {
    const errors = []
    if(!payload.name) { errors.push('Nama tidak boleh kosong.') }

    return { success: errors.length === 0, message: errors }
  };
  /** End Room Resource Section */

  /** Reservation Room Section */
  async getReservationRooms() {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.get(`${prefix}/${this.routename}/rooms`, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });

      if(response.data.success) {
        store.commit('migis/reservation/SET_RESERVATIONROOMS', response.data.data, {root:true})
      }

      return response.data
    } catch (error) {
      throw error
    }
  };

  async createReservationRoom(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.post(`${prefix}/${this.routename}/rooms`, payload, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      await this.getReservationRooms()
      return response.data
    } catch (error) {
      throw error
    }
  };

  async updateReservationRoom(payload) {
    try {
      await AppServices.init()
      const token = AppServices.getToken()
      const prefix = AppServices.getPrefix()
      const response = await http.put(`${prefix}/${this.routename}/rooms/${payload.rsv_room_id}`, payload, {
        headers: {Authorization: token ? `Bearer ${token}` : ''},
      });
      await this.getReservationRooms()
      return response.data
    } catch (error) {
      throw error
    }
  };

  async detailReservationRoom() {};

  validatorReservationRoom(form) {
    const errors = []
    
    if(!form.title) {errors.push('Isi keperluan pemesanan.')}
    if(!form.room_id) {errors.push('Pilih ruangan yang tersedia.')}
    if(!form.start_time) {errors.push('Tentukan tanggal dan waktu dimulai.')}
    if(!form.end_time) {errors.push('Tentukan tanggal dan waktu diakhiri.')}
    if(!form.status) {errors.push('Tentukan status reservasi.')}
    
    if(form.start_time && form.end_time) {
      const start = moment(form.start_time, 'YYYY-MM-DD HH:mm')
      const end = moment(form.end_time, 'YYYY-MM-DD HH:mm')
      const startHour = start.hour()
      const endHour = end.hour()

      if(!end.isAfter(start)) {errors.push('Jam berakhir harus lebih dari jam mulai.')}
      if(startHour < 7) {errors.push('Waktu dimulai setidaknya pukul 07:00.')}
      if(endHour > 16) {errors.push('Waktu berakhir setidaknya pukul 16:00.')}
    }

    return { success: errors.length === 0, message: errors }
  };
  /** End Reservation Room Section */

  /** Reservation Number-Letter */
  async getReservationNumberLetters() {};
  async createReservationNumberLetter() {};
  /** End Reservation Number-Letter */
}

export default new ReservationServices()