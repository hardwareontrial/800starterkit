<template>
  <b-container>

    <b-row class="mb-50">
      <b-col
        cols="12"
        md="6"
        class="d-flex align-items-center justify-content-start"
      >
        <b-form-group
          label="Tanggal"
          label-for="rsv-room-date-select"
          label-cols-md="4"
        >
          <flat-pickr
            id="rsv-room-date-select"
            class="form-control"
            :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d'}"
            v-model="selectedDate"
          />
        </b-form-group>
      </b-col>

      <b-col
        cols="12"
        md="6"
        class="d-flex align-items-center justify-content-end"
      >
        <b-button
          variant="flat-primary"
          :to="{name: 'reservation-room-create'}"
        >
          <iconify icon="tabler:circle-plus" class="mr-50"/>
          <span>Buat Reservasi</span>
        </b-button>
      </b-col>

      <b-col cols="12">
        <b-card no-body>
          <b-table-simple
            responsive
            bordered
          >
            <b-thead>
              <b-tr>
                <b-th
                  style="width: 13%;"
                  class="text-center"
                >
                  Waktu
                </b-th>
                <b-th
                  v-for="room in rooms"
                  :key="room.id"
                  class="text-center"
                >
                  {{room.name}}
                </b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <tr
                v-for="hour in hours" :key="hour"
              >
                <td> {{ formattedHour(hour) }} </td>
                <template v-for="room in rooms">
                  <template v-if="isReservationStart(room.id, hour)">
                    <td :rowspan="getRowSpan(room.id, hour)" :key="room.id" class="reservation-cell" @click="showReservation(room.id, hour)">
                      {{ getReservation(room.id, hour).title }}
                    </td>
                  </template>
                  <template v-else-if="!isReservationInProgress(room.id, hour)">
                    <td :key="room.id"></td>
                  </template>
                </template>
              </tr>
            </b-tbody>
          </b-table-simple>
        </b-card>
      </b-col>

      <b-col cols="12">
        <b-modal
          v-model="showDetailReservation"
          hide-footer
          no-close-on-backdrop
          no-close-on-esc
          no-enforce-focus
          hide-header
          centered
          title="Detail Reservasi"
        >
          <div class="modal-body" v-if="selectedReservation">
            <b-card-title>
              Detail
            </b-card-title>
            <b-table-simple bordered>
              <b-thead>
                <b-tr>
                  <b-th style="width: 35%;">Ruangan</b-th>
                  <b-td> {{selectedReservation.room.name}} </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Pemesan</b-th>
                  <b-td> {{selectedReservation.creatorData.fname}} </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Keperluan</b-th>
                  <b-td> {{selectedReservation.title}} </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Waktu Mulai</b-th>
                  <b-td> {{$momentTz(selectedReservation.start_time).format('DD MMM YYYY, HH:mm')}} </b-td>
                </b-tr>
                <b-tr>
                  <b-th>Waktu Akhir</b-th>
                  <b-td> {{$momentTz(selectedReservation.end_time).format('DD MMM YYYY, HH:mm')}} </b-td>
                </b-tr>
              </b-thead>
            </b-table-simple>
          </div>
          <div class="modal-footer">
            <b-button
              variant="flat-danger"
              @click="closeDetailReservation(false)"
            >
              <iconify icon="tabler:circle-x" class="mr-50"/>
              Tutup
            </b-button>
          </div>
        </b-modal>
      </b-col>
    </b-row>
    
  </b-container>
</template>

<script>
import {
  BRow, BCol, BContainer, BModal, BCardTitle, BButton, BCard,
  BTableSimple, BThead, BTbody, BTh, BTd, BTr, BFormGroup,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import store from '@/store'

export default {
  components: {
    BRow, BCol, BContainer, BModal, BCardTitle, BButton, BCard,
    BTableSimple, BThead, BTbody, BTh, BTd, BTr, BFormGroup,
    flatPickr,
  },
  data() {
    return {
      showDetailReservation: false,
      selectedReservation: null,
      selectedDate: this.$momentTz().format('YYYY-MM-DD'),
      hours: Array.from({length: 10}, (_, i) => i +7),
    }
  },
  methods: {
    formattedHour(hour) {
      return `${hour}:00 - ${hour +1}:00`
    },
    formattedTime(dateTime) {
      const date = new Date(dateTime)
      return `${date.getHours()}:${String(date.getMinutes().padStart(2, '0'))}`
    },
    showReservation(roomId, hour) {
      const reservation = this.getReservation(roomId, hour)
      this.selectedReservation = reservation
      this.handleShowDetailReservation(true)
    },
    getReservation(roomId, hour) {
      return this.reservations.find(reservation => {
        return reservation.room_id === roomId && reservation.startHour <= hour && reservation.endHour > hour
      });
    },
    getRowSpan(roomId, hour) {
      const reservation = this.getReservation(roomId, hour)
      return reservation ? reservation.endHour - reservation.startHour : 1
    },
    isReservationStart(roomId, hour) {
      return this.reservations.some(reservation => {
        return reservation.room_id === roomId && reservation.startHour === hour
      })
    },
    isReservationInProgress(roomId, hour) {
      return this.reservations.some(reservation => {
        return reservation.room_id === roomId && reservation.startHour < hour && reservation.endHour > hour
      });
    },
    handleShowDetailReservation(value) { this.showDetailReservation = value },
    closeDetailReservation(value) {
      this.selectedReservation = null
      this.handleShowDetailReservation(false)
    }
  },
  computed: {
    rooms() {
      return store.getters['migis/reservation/getRoomResourceActiveOnly']
    },
    reservations() {
      const reservations = store.getters['migis/reservation/getReservationByDateByRoomId'](this.selectedDate, '')
      if(reservations.length <= 0) { return [] }
      const filteredReservedOnly = reservations.filter(event => event.status === 'reserved')
      return filteredReservedOnly.map(reservation => {
        reservation.startHour = new Date(reservation.start_time).getHours()
        reservation.endHour = new Date(reservation.end_time).getHours()
        return reservation
      })
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style scoped>
  .reservation-cell {
    background-color: #e0f7fa;
    cursor: pointer;
    padding: 5px;
    border: 1px solid #0097a7;
  }
</style>