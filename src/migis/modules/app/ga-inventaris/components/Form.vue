<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BButton, BFormTextarea, BFormRadioGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import CustomAlert from '@/migis/components/Alert.vue'
import GaInventarisServices from '@/migis/modules/app/ga-inventaris/services'

export default {
  components: {
    BRow, BCol, BFormGroup, BFormInput, BButton, BFormTextarea, BFormRadioGroup,
    vSelect, flatPickr, CustomAlert,
  },
  data() {
    return {
      form: {
        id: null,
        kode_brg: '',
        nama_brg: '',
        tgl_beli: '',
        harga: null,
        toko: '',
        spesifikasi: '',
        serialnumber: '',
        pic_bagian_id: null,
        merk_id: null,
        lokasi_id: null,
        status_id: null,
        is_active: null,
        qrcode: '',
        user_id_1: null,
        user_id_2: null,
        notes: '',
        mtc_note: '',
      },
      alertProps: {show: false, variant: 'danger', message: null},
      editing: false,
      processing: false,
    }
  },
  methods: {
    isNumber(e) {
      e = (e) ? e : window.event;
      let cCode = (e.which) ? e.which : e.kCode;
      if ((cCode > 31 && (cCode < 48 || cCode > 57)) && (cCode < 40 || cCode > 41)) {
        e.preventDefault();
      } else {
        return true;
      }
    },
    setAlert(value) {
      this.alertProps = {show: value.show, variant: value.variant, message: value.message}
    },
    showFormMisc(value) {
      let miscprops = {event: false, data: {title: '', label: '', onForm: ''}};
      if(value === 'merk') {
        miscprops = {event: true, data: {title: 'Form Tambah Merk', label: 'Merk', onForm: 'merk'}}
      } else if(value === 'location') {
        miscprops = {event: true, data: {title: 'Form Tambah Lokasi', label: 'Lokasi', onForm: 'location'}}
      } else {
        miscprops
      }
      this.$root.$emit('gainventarisFormMisc', miscprops)
    },
    handleProcessing(value) {
      this.processing = value
      this.$root.$emit('formGainventarisProcessing', value)
    },
    handleEditValue(value) {
      this.editing = value
    },
    validator() {
      const errors = []
      const {nama_brg, tgl_beli, merk_id, lokasi_id, status_id, user_id_1, mtc_note} = this.form
      if(!nama_brg) errors.push('Nama tidak boleh kosong.')
      if(!tgl_beli) errors.push('Masukkan tanggal pembelian/penerimaan barang.')
      if(!merk_id) errors.push('Pilih salah satu merk.')
      if(!lokasi_id) errors.push('Pilih salah satu lokasi penempatan.')
      if(!status_id) { 
        errors.push('Pilih salah satu type barang.') 
      } else if(status_id === 2 && !user_id_1) {
         errors.push('Pilih salah satu user.')
      } else if(status_id === 4 && !mtc_note) {
        errors.push('Berikan alasan perbaikan.')
      }
      return { success: errors.length === 0, message: errors }
    },
    resetFormCreating() {
      this.form = {
        id: null,
        kode_brg: '',
        nama_brg: '',
        tgl_beli: '',
        harga: null,
        toko: '',
        spesifikasi: '',
        serialnumber: '',
        pic_bagian_id: null,
        merk_id: null,
        lokasi_id: null,
        status_id: null,
        is_active: null,
        qrcode: '',
        user_id_1: null,
        user_id_2: null,
        notes: '',
        mtc_note: '',
      }
    },
    async submitCreating() {
      this.handleProcessing(true)
      this.setAlert({show: false, variant: 'danger', message: null})
      const isValid = this.validator()
      if(!isValid.success) {
        this.setAlert({show: true, variant: 'danger', message: isValid.message})
        this.handleProcessing(false)
        setTimeout(() => {
          this.setAlert({show: false, variant: 'danger', message: null})
        }, 3000)
      } else {
        try {
          this.form.is_active = JSON.stringify(true)
          const response = await GaInventarisServices.create({form: this.form})
          this.resetFormCreating()
          this.handleProcessing(false)
          this.$nextTick(() => {
            this.$root.$emit('formGainventarisCreated', response.data)
          })
        } catch (error) {
          console.error(error)
          this.handleProcessing(false)
          this.$bvToast.toast(`${error}`, {
            title: 'Ga Inventaris ',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'danger',
          })
        }
      }
    },
    setFormUpdate(value) {
      this.form = {
        id: value.id,
        kode_brg: value.kode_brg,
        nama_brg: value.nama_brg,
        tgl_beli: value.tgl_beli,
        harga: value.harga,
        toko: value.toko,
        spesifikasi: value.spesifikasi,
        serialnumber: value.serialnumber,
        pic_bagian_id: value.pic_bagian_id,
        merk_id: value.merk_id,
        lokasi_id: value.lokasi_id,
        status_id: value.status_id,
        is_active: value.is_active,
        qrcode: value.qrcode,
        user_id_1: value.user_id_1,
        user_id_2: value.user_id_2,
        notes: value.notes,
        mtc_note: value.mtc_note,
      }
    },
    async submitUpdating() {
      this.handleProcessing(true)
      this.setAlert({show: false, variant: 'danger', message: null})
      const isValid = this.validator()
      if(!isValid.success) {
        this.setAlert({show: true, variant: 'danger', message: isValid.message})
        this.handleProcessing(false)
        setTimeout(() => {
          this.setAlert({show: false, variant: 'danger', message: null})
        }, 3000)
      } else {
        try {
          const response = await GaInventarisServices.update({form: this.form, id: this.form.id, keyword: ''})
          this.resetFormCreating()
          this.handleProcessing(false)
          this.$nextTick(() => {
            this.$root.$emit('formGainventarisUpdated', response)
          })
        } catch (error) {
          console.error(error)
          this.handleProcessing(false)
          this.$bvToast.toast(`${error}`, {
            title: 'Ga Inventaris ',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'danger',
          })
        }
      }
    },
  },
  computed: {
    userData() {
      return this.$store.getters['migis/auth/userData']
    },
    listPIC() {
      if(!this.userData) { return [] }
      else {
        const isAdmin = this.$store.getters['migis/auth/userIsAdmin']
        const props = this.$store.state.migis.gainventaris.typeProps
        const optionsAll = Object.keys(props[3]).map(key => ({value: parseInt(key), text: props[3][key]}))
        if(!isAdmin){
          const userDeptId = this.userData.position?.dept_id
          if(userDeptId === 6) { return optionsAll.filter(item => item.value === 3) }
          else if(userDeptId) { return optionsAll.filter(item => item.value !== 3) }
          return []
        }
        return optionsAll
      }
    },
    listUserActive() { return this.$store.getters['migis/user/usersNoAdminNoExtActive'] },
    listMerk() { return this.$store.getters['migis/gainventaris/gaInvMerk'] },
    listLocation() { return this.$store.getters['migis/gainventaris/gaInvLocation'] },
    typeOptions() {
      const props = this.$store.state.migis.gainventaris.typeProps
      const statusArray = Object.keys(props[0]).map(key => ({
        value: parseInt(key),
        text: props[0][key],
        disabled: parseInt(key) === 4 ? !this.editing : false,
      }))
      return statusArray
    },
  },
  created() {
    this.$root.$on('formGainventarisCreate', () => {
      this.submitCreating()
    });
    this.$root.$on('formGainventarisCreateOnClose', () => {
      this.resetFormCreating()
    });
    this.$root.$on('formGainventarisEditing', (data) => {
      this.setFormUpdate(data)
    });
    this.$root.$on('formGainventarisEdit', () => {
      this.submitUpdating()
    });
    this.$root.$on('formGainventarisEditValue', (value) => {
      this.handleEditValue(value)
    });
  },
  beforeDestroy() {
    this.$root.$off('formGainventarisCreate');
    this.$root.$off('formGainventarisCreateOnClose');
    this.$root.$off('formGainventarisEditing');
    this.$root.$off('formGainventarisEdit');
    this.$root.$off('formGainventarisEditValue');
  },
}
</script>

<template>
  <b-row>
    <!-- Alert -->
    <b-col cols="12">
      <custom-alert :alert="alertProps"/>
    </b-col>
    <!-- Penanggung Jawab -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="create-gainv-name"
      >
        <template #label>
          <span>PIC<span class="text-danger">*</span> :</span>
        </template>
        <v-select
          :disabled="processing"
          :options="listPIC"
          :reduce="text => text.value"
          v-model="form.pic_bagian_id"
          label="text"
          id="create-gainv-pic"
        />
      </b-form-group>
    </b-col>
    <!-- Nama Brg -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="create-gainv-name"
      >
        <template #label>
          <span>Nama Barang<span class="text-danger">*</span> :</span>
        </template>
        <b-form-input
          id="create-gainv-name"
          :disabled="processing"
          v-model="form.nama_brg"
        />
      </b-form-group>
    </b-col>
    <!-- Serial Number -->
    <b-col cols="12" md="6">
      <b-form-group
        label="Serial Number :"
        label-for="create-gainv-sn"
      >
        <b-form-input
          id="create-gainv-sn"
          :disabled="processing"
          v-model="form.serialnumber"
        />
      </b-form-group>
    </b-col>
    <!-- Tgl Beli -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="create-gainv-buydate"
      >
        <template #label>
          <span>Tanggal Beli<span class="text-danger">*</span> :</span>
        </template>

        <flat-pickr
          id="create-gainv-buydate"
          class="form-control"
          :config="{ altInput: true, altFormat: 'F j, Y', dateFormat: 'Y-m-d'}"
          v-model="form.tgl_beli"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Toko -->
    <b-col cols="12" md="6">
      <b-form-group
        label="Toko :"
        label-for="create-gainv-store"
      >
        <b-form-input
          id="create-gainv-store"
          v-model="form.toko"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Harga -->
    <b-col cols="12" md="6">
      <b-form-group
        label="Harga :"
        label-for="create-gainv-price"
      >
        <b-form-input
          id="create-gainv-price"
          @keypress="isNumber($event)"
          v-model="form.harga"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Merk -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="create-gainv-merk"
      >
        <template #label>
          <span>Merk<span class="text-danger">*</span> :</span>
        </template>

        <v-select
          :disabled="processing"
          :options="listMerk"
          :reduce="name=>name.id"
          :clearable="true"
          v-model="form.merk_id"
          label="name"
          id="create-gainv-merk"
        />
        <small
          v-if="!processing"
          class="text-primary"
          style="cursor: pointer;"
          @click="showFormMisc('merk')"
        >
          Tambah Baru
        </small>
      </b-form-group>
    </b-col>
    <!-- Penempatan -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="create-gainv-location"
      >
        <template #label>
          <span>Penempatan<span class="text-danger">*</span> :</span>
        </template>

        <v-select
          :disabled="processing"
          :options="listLocation"
          :reduce="name=>name.id"
          :clearable="true"
          v-model="form.lokasi_id"
          label="name"
          id="create-gainv-location"
        />
        <small
          v-if="!processing"
          class="text-primary"
          style="cursor: pointer;"
          @click="showFormMisc('location')"
        >
          Tambah Baru
        </small>
      </b-form-group>
    </b-col>
    <!-- Spesifikasi -->
    <b-col cols="12" md="6">
      <b-form-group
        label="Spesifikasi :"
        label-for="create-gainv-spec"
      >
        <b-form-textarea
          rows="3"
          max-rows="8"
          id="create-gainv-spec"
          v-model="form.spesifikasi"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Type -->
    <b-col cols="12" md="6">
      <b-form-group
      >
        <template #label>
          <span>Type<span class="text-danger">*</span> :</span>
        </template>

        <b-form-radio-group
          :disabled="processing"
          :options="typeOptions"
          :stacked="false"
          v-model="form.status_id"
          name="radiog-gainv-type"
        />
      </b-form-group>
    </b-col>
    <!-- Notes -->
    <b-col cols="12" md="6">
      <b-form-group
        label="Catatan :"
        label-for="create-gainv-note"
      >
        <b-form-textarea
          rows="3"
          max-rows="8"
          id="create-gainv-note"
          v-model="form.notes"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- MTC Note -->
    <b-col cols="6" v-if="form.status_id === 4">
      <b-form-group
        label-for="create-gainv-mtcnote"
      >
        <template #label>
          <span>Catatan Perawatan<span class="text-danger">*</span> :</span>
        </template>
        <b-form-textarea
          rows="3"
          max-rows="8"
          id="create-gainv-mtcnote"
          v-model="form.mtc_note"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Assign User -->
    <b-col cols="6" v-if="form.status_id === 2">
      <b-form-group
        label-for="create-gainv-assignuser"
      >
        <template #label>
          <span>Assign Users<span class="text-danger">*</span> :</span>
        </template>

        <v-select
          :disabled="processing"
          :options="listUserActive"
          :reduce="fname => fname.user_id"
          v-model="form.user_id_1"
          label="fname"
          placeholder="User #1"
          id="create-gainv-pic1"
        />
        <v-select
        :disabled="processing"
          :options="listUserActive"
          :reduce="fname => fname.user_id"
          v-model="form.user_id_2"
          label="fname"
          placeholder="User #2"
          class="mt-25"
          id="create-gainv-pic2"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>


<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>