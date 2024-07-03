<template>
  <b-row>
    <b-col cols="12"></b-col>
    <b-col cols="12">
      <datatable-component
        @loadPerPage="handlePerPage"
        @changePage="handlePagination"
        @search="handleSearch"
        :items="reservations.items"
        :fields="fields"
        :meta="reservations.meta"
        :height="dspHeight"
      >
        <template #datatable-top-left>
          <!-- <b-row>
            <b-col cols="12">
              <b-row>
                <b-col>
                  <flat-pickr
                    id="frm-rsv-room-end"
                    class="form-control"
                    :config="{
                      altInput: true,
                      altFormat: 'j F Y',
                      dateFormat: 'Y-m-d',
                      enableTime: false,
                    }"
                    v-model="selectedDate"
                  />
                </b-col>
                <b-col>
                  <v-select
                    :options="rooms"
                    :reduce="name => name.id"
                    :clearable="false"
                    label="name"
                    v-model="selectedRoom"
                  />
                </b-col>
              </b-row>
            </b-col>
          </b-row> -->
        </template>

        <template #cell(number)="data">
          {{data.item.reservationData.number}}
        </template>
        <template #cell(room)="data">
          {{data.item.room.name}}
        </template>
        <template #cell(start)="data">
          {{$momentTz(data.item.start_time).format('MMM D, YYYY, HH:mm') }} Wib
          <!-- {{data.item.start_time}} -->
        </template>
        <template #cell(end)="data">
          {{$momentTz(data.item.end_time).format('MMM D, YYYY, HH:mm') }} Wib
          <!-- {{data.item.end_time}} -->
        </template>
        <template #cell(creator)="data">
          {{data.item.creatorData.fname}}
        </template>
        <template #cell(status)="data">
          <!-- {{data.item.status}} -->
          <b-badge
            :variant="data.item.status === 'reserved' ? 'success' : 'secondary'"
          >
            {{data.item.status}}
          </b-badge>
        </template>
        <template #cell(opt)="data">
          <div class="cursor-pointer" @click="editReservation(data.item)">
            <iconify icon="tabler:edit"/>
          </div>
        </template>
      </datatable-component>
    </b-col>
    <b-col cols="12">
      <b-modal
        v-model="showDetailReservation"
        hide-footer
        no-close-on-backdrop
        no-close-on-esc
        no-enforce-focus
        hide-header-close
        centered
        title="Detail Reservasi"
      >
        <div class="modal-body">
          <form-component
            ref="frmReservationRoom"
          />
        </div>
        <div class="modal-footer">
          <b-button
            variant="flat-primary"
            class="mr-50"
            @click="submitUpdate"
          >
            <iconify icon="tabler:send" class="mr-50"/>
            Update
          </b-button>
          <b-button
            variant="flat-danger"
            @click="cancelDetailReservation"
          >
            <iconify icon="tabler:circle-x" class="mr-50"/>
            Tutup
          </b-button>
        </div>
      </b-modal>
    </b-col>
  </b-row>
</template>

<script>
import DatatableComponent from '@/migis/components/Datatable.vue'
import {
  BButton, BDropdown, BDropdownItem, BBadge, BSpinner, BRow, BCol,
  BModal,
} from 'bootstrap-vue'
import store from '@/store'
import FormComponent from '@/migis/modules/app/reservation/room/components/Form.vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    DatatableComponent,
    BButton, BDropdown, BDropdownItem, BBadge, BSpinner, BRow, BCol,
    BModal,
    FormComponent, 
    vSelect, flatPickr,
  },
  data() {
    return {
      currentPage: 1,
      limit: 10,
      searchQuery: '',
      fields: [
        {label: 'Nomor', key: 'number', thStyle: { width: "13%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Ruangan', key: 'room', thStyle: { width: "16%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Mulai', key: 'start',  thStyle: { width: "16%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Berakhir', key: 'end',  thStyle: { width: "16%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Pemesan', key: 'creator',  thStyle: { width: "19%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Status', key: 'status',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Opsi', key: 'opt',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      showDetailReservation: false,
      selectedDate: this.$moment().format('YYYY-MM-DD'),
      selectedRoom: '',
    }
  },
  methods: {
    handlePerPage(value) {
      this.limit = value
    },
    handlePagination(value) {
      this.currentPage = value
    },
    handleSearch(value) {
      this.searchQuery = value
    },
    handleShowDetailReservation(value) {
      this.showDetailReservation = value
    },
    editReservation(reservation) {
      this.handleShowDetailReservation(true)
      this.$nextTick(() => this.$refs.frmReservationRoom.setFormEditing(reservation))
    },
    submitUpdate() {
      this.$refs.frmReservationRoom.submitUpdate()
    },
    cancelDetailReservation() {
      this.$refs.frmReservationRoom.resetForm
      this.handleShowDetailReservation(false)
    },
  },
  computed: {
    reservations() {
      const data = store.getters['migis/reservation/getReservationRoomPaginate'](this.limit, this.currentPage, this.searchQuery)
      return {
        items: data.items,
        meta: {
          from: data.from,
          to: data.to,
          total: data.total,
          per_page: data.per_page,
          current_page: data.currentPage,
        }
      }
    },
    rooms() {
      const rooms = this.$store.state.migis.reservation.roomResources
      const newArray = [{id: '', name: 'SEMUA RUANGAN'}];
      rooms.forEach(room => newArray.push(room))
      return newArray
    },
    dspHeight(){
      const currentHeight = store.state.app.windowHeight;
      const height = Math.round(0.7 * currentHeight);
      return height
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>