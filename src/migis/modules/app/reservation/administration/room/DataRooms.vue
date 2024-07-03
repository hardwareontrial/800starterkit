<template>
  <app-collapse
    accordion
    type="margin"
  >

    <app-collapse-item title="Daftar">
      <b-table-simple bordered responsive>
        <b-thead>
          <b-tr>
            <b-th>Nama Ruangan</b-th>
            <b-th style="width: 25%">Status</b-th>
            <b-th style="width: 20%">Opsi</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="room in roomsList"
            :key="room.id"
          >
            <b-td>{{room.name}}</b-td>
            <b-td>
              <v-select
                :options="roomStatus"
                :reduce="text => text.value"
                :clearable="false"
                :disabled="processing"
                boundary="viewport"
                label="text"
                v-model="room.status"
              />
            </b-td>
            <b-td>
              <b-button
                variant="flat-primary"
                @click="updateRoom(room)"
                v-show="(!!room.is_active) !== room.status"
              >
                Update
              </b-button>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </app-collapse-item>

    <app-collapse-item title="Form">
      <custom-alert :alert="roomAlert"/>
      <b-form-group
        label-for="frm-rsv-roomrsc-name"
      >
        <template #label>
          <span>Nama Ruangan<span class="text-danger">*</span> :</span>
        </template>
        <b-form-input
          id="frm-rsv-roomrsc-name"
          :disabled="processing"
          v-model="formRoom.name"
        />
      </b-form-group>
      <b-button
        variant="flat-primary"
        class="mr-50"
        @click="createRoom"
      >
        <iconify icon="tabler:circle-plus" class="mr-50"/>
        Tambah
      </b-button>
      <b-button
        variant="flat-danger"
        class="mr-0"
        @click="cancelForm"
      >
        <iconify icon="tabler:circle-x" class="mr-0"/>
        Hapus
      </b-button>
    </app-collapse-item>

  </app-collapse>
</template>

<script>
import {
  BFormGroup, BFormInput, BTableSimple, BThead, BTh, BTbody, BTd, BTr,
  BButton,
} from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import vSelect from 'vue-select'
import ReservationService from '@/migis/modules/app/reservation/services'
import store from '@/store'
import CustomAlert from '@/migis/components/Alert.vue'

export default {
  components: {
    BFormGroup, BFormInput, BTableSimple, BThead, BTh, BTbody, BTd, BTr,
    BButton,
    AppCollapse, AppCollapseItem, vSelect, CustomAlert,
  },
  data() {
    return {
      processing: false,
      roomStatus: [
        { value: true, text: 'Active' },
        { value: false, text: 'Inactive' },
      ],
      roomsList: [],
      formRoom: {
        id: null,
        name: '',
        isActive: true,
      },
      roomAlert: { show: false, variant: '', message: null },
    }
  },
  methods: {
    handleProcessing(value) {
      this.processing = value
    },
    handleRoomAlert(show, variant, message) {
      this.roomAlert = { show: show, variant: variant, message: message }
    },
    getRooms() {
      const data = store.state.migis.reservation.roomResources
      this.roomsList = data.map(room => ({...room, status: room.is_active === 1 ? true : false}))
    },
    async updateRoom(room) {
      const data = { id: room.id, name: room.name, isActive: room.status };
      this.handleProcessing(true)
      const isValid = await ReservationService.validatorRoomResource(data)
      if(!isValid.success){
        this.handleProcessing(false)
        this.$bvToast.toast(`${isValid.message[0]}`, {
          title: 'RESERVASI',
          toaster: 'b-toaster-top-center',
          solid: false,
          variant: 'danger',
        })
      }else {
        try {
          const updating = await ReservationService.updateRoomResources(data)
          this.$bvToast.toast(`Ruangan berhasil diperbarui`, {
            title: 'RESERVASI',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          this.getRooms()
          this.handleProcessing(false)
        } catch (error) {
          this.$bvToast.toast(`${error.response.data || error}`, {
            title: 'RESERVASI',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          this.handleProcessing(false)
        }
      }
    },
    async createRoom() {
      this.handleProcessing(true)
      const isValid = await ReservationService.validatorRoomResource(this.formRoom)
      if(!isValid.success){
        this.handleRoomAlert(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleRoomAlert(false, '', null), 3000)
      }else {
        try {
          const creating = await ReservationService.createRoomResources(this.formRoom)
          this.$bvToast.toast(`Ruangan berhasil dibuat`, {
            title: 'RESERVASI',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          });
          this.getRooms()
          this.cancelForm()
          this.handleProcessing(false)
        } catch (error) {
          this.$bvToast.toast(`${error.response.data || error}`, {
            title: 'RESERVASI',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          this.handleProcessing(false)
        }
      }
    },
    cancelForm() {
      this.formRoom = { id: null, name: '', isActive: true }
    },
  },
  mounted() {
    this.getRooms()
  }
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>