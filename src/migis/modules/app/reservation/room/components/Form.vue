<template>
  <b-row>
    <b-col cols="12">
      <custom-alert :alert="formAlert"/>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-rsv-room-title"
      >
        <template #label>
          <span>Keperluan<span class="text-danger">*</span> :</span>
        </template>
        <b-form-input
          id="frm-rsv-room-title"
          :disabled="processing"
          v-model="reservation_room.title"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-rsv-room-room"
      >
        <template #label>
          <span>Ruangan<span class="text-danger">*</span> :</span>
        </template>
        <v-select
          :disabled="processing"
          :options="rooms"
          :reduce="name => name.id"
          :clearable="false"
          label="name"
          id="frm-rsv-room-room"
          v-model="reservation_room.room_id"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-rsv-room-start"
      >
        <template #label>
          <span>Waktu Mulai<span class="text-danger">*</span> :</span>
        </template>

        <flat-pickr
          id="frm-rsv-room-start"
          class="form-control"
          :config="{
            altInput: true,
            altFormat: 'j F Y, H:i',
            dateFormat: 'Y-m-d H:i',
            enableTime: true,
            //'disable': [
              // function(date) { return (date.getDay() === 6 || date.getDay() === 0) }
            //],
          }"
          v-model="reservation_room.start_time"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-rsv-room-end"
      >
        <template #label>
          <span>Waktu Berakhir<span class="text-danger">*</span> :</span>
        </template>

        <flat-pickr
          id="frm-rsv-room-end"
          class="form-control"
          :config="{
            altInput: true,
            altFormat: 'j F Y, H:i',
            dateFormat: 'Y-m-d H:i',
            enableTime: true,
            //'disable': [
              // function(date) { return (date.getDay() === 6 || date.getDay() === 0) }
            //],
          }"
          :disabled="processing"
          v-model="reservation_room.end_time"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12" v-if="reservation_room.rsv_id">
      <b-form-group
        label-for="frm-rsv-room-status"
      >
        <template #label>
          <span>Status<span class="text-danger">*</span> :</span>
        </template>
        <v-select
          :disabled="processing"
          :options="optionsStatus"
          :reduce="text => text.value"
          :clearable="false"
          label="text"
          id="frm-rsv-room-status"
          v-model="reservation_room.status"
        />
      </b-form-group>
      <b-form-group
        label-for="frm-rsv-room-notes"
      >
        <template #label>
          <span>Catatan<span class="text-danger"></span> :</span>
        </template>
        <b-form-textarea
          id="frm-rsv-room-notes"
          :disabled="processing"
          v-model="reservation_room.notes"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import {
  BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
import CustomAlert from '@/migis/components/Alert.vue'
import ReservationServices from '@/migis/modules/app/reservation/services'

export default {
  components: {
    vSelect, flatPickr,
    BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
    CustomAlert,
  },
  data() {
    return {
      processing: false,
      optionsStatus: [
        {value: 'reserved', text: 'Terpesan'},
        {value: 'cancelled', text: 'Batal'},
      ],
      reservation_room: {
        rsv_room_id: null,
        rsv_id: '',
        title: '',
        status: 'reserved',
        start_time: '',
        end_time: '',
        room_id: null,
        creator_id: null,
        logs: [],
        notes: '',
      },
      formAlert: { show: false, variant: '', message: null },
    }
  },
  computed: {
    rooms() {
      return this.$store.getters['migis/reservation/getRoomResorceActiveOnly']
    },
  },
  methods: {
    handleProcessing(value) {
      this.processing = value
    },
    handleFormAlert(show, variant, message) {
      this.formAlert = { show: show, variant: variant, message: message }
    },
    setFormEditing(reservation) {
      this.reservation_room = {
        rsv_room_id: reservation.rsv_room_id,
        rsv_id: reservation.rsv_id,
        title: reservation.title,
        status: reservation.status,
        start_time: reservation.start_time,
        end_time: reservation.end_time,
        room_id: reservation.room_id,
        creator_id: reservation.creator_id,
        logs: [],
        notes: reservation.notes
      }
    },
    resetForm() {
      this.reservation_room = {
        rsv_room_id: null,
        rsv_id: '',
        title: '',
        status: '',
        start_time: '',
        end_time: '',
        room_id: null,
        creator_id: null,
        logs: [],
        notes: '',
      }
    },
    async submitCreate() {
      this.handleProcessing(true)
      const isValid = ReservationServices.validatorReservationRoom(this.reservation_room)
      if(!isValid.success) {
        this.handleFormAlert(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleFormAlert(false, '', null), 3000)
      }else{
        try {
          const creating = await ReservationServices.createReservationRoom(this.reservation_room)
          this.$bvToast.toast(`Reservasi berhasil dibuat`, {
            title: 'RESERVASI',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          });
          this.$emit('formResevationRoomSuccess', creating)
          this.resetForm()
          this.handleProcessing(false)
        } catch (error) {
          this.handleFormAlert(true, 'danger', error.response.data || error)
          setTimeout(() => this.handleFormAlert(false, '', null), 3000)
          this.handleProcessing(false)
        }
      }
    },
    async submitUpdate() {
      this.handleProcessing(true)
      const isValid = ReservationServices.validatorReservationRoom(this.reservation_room)
      if(!isValid.success) {
        this.handleFormAlert(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleFormAlert(false, '', null), 3000)
      }else{
        try {
          const updating = await ReservationServices.updateReservationRoom(this.reservation_room)
          this.$bvToast.toast(`Reservasi berhasil diperbarui`, {
            title: 'RESERVASI',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          });
          this.$emit('formResevationRoomSuccess', updating)
          this.resetForm()
          this.handleProcessing(false)
        } catch (error) {
          this.handleFormAlert(true, 'danger', error.response.data || error)
          setTimeout(() => this.handleFormAlert(false, '', null), 3000)
          this.handleProcessing(false)
        }
      }
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>