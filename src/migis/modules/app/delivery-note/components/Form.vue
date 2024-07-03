<template>
  <b-row>
    <!-- Alert -->
    <b-col cols="12">
      <custom-alert :alert="alertProps"/>
    </b-col>
    <!-- DO -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-do-number"
      >
        <template #label>Nomor DO :</template>
        <b-form-input
          id="frm-delivery-do-number"
          placeholder="Nomor DO"
          v-model="form.donumber"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- PO -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-po-number"
      >
        <template #label>Nomor PO :</template>
        <b-form-input
          id="frm-delivery-po-number"
          placeholder="Nomor PO"
          v-model="form.ponumber"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail Nama Customer -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-customer"
      >
        <template #label>Nama Customer<small class="text-danger">*</small> :</template>
        <b-form-input
          id="frm-delivery-customer"
          placeholder="Nama Customer"
          v-model="form.customernama"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail Alamat Cust -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-address"
      >
        <template #label>Alamat Customer<small class="text-danger">*</small> :</template>
        <b-form-input
          id="frm-delivery-address"
          placeholder="Alamat Customer"
          v-model="form.customeralamat"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail Kota Cust -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-city"
      >
        <template #label>Kota :</template>
        <b-form-input
          id="frm-delivery-city"
          placeholder="Kota"
          v-model="form.customerkota"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail Driver -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-driver"
      >
        <template #label>Nama Pengemudi<small class="text-danger">*</small> :</template>
        <b-form-input
          id="frm-delivery-driver"
          placeholder="Nama Pengemudi"
          v-model="form.drivernama"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail Nopol Driver -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-vehicle-no"
      >
        <template #label>Nomor Polisi<small class="text-danger">*</small> :</template>
        <b-form-input
          id="frm-delivery-vehicle-no"
          placeholder="Nomor Polisi"
          v-model="form.nopol"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail Item -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-item"
      >
        <template #label>Item<small class="text-danger">*</small> :</template>
        <v-select
          id="frm-delivery-item"
          label="text"
          :clearable="false"
          :options="itemOptions"
          :reduce="text => text.value"
          v-model="form.item"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail Quantiti -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-qty"
      >
        <template #label>Kuantiti<small class="text-danger">*</small> :</template>
        <b-form-input
          id="frm-delivery-qty"
          placeholder="Kuantiti"
          @keypress="isNumber($event)"
          v-model="form.qty"
          :disabled="processing"
        />
        
      </b-form-group>
    </b-col>
    <!-- Detail Uom -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-uom"
      >
        <template #label>UoM<small class="text-danger">*</small> :</template>
        <v-select
          id="frm-delivery-uom"
          label="text"
          :clearable="false"
          :options="uomOptions"
          :reduce="text => text.value"
          v-model="form.uom"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <!-- Detail tanggal Kirim -->
    <b-col cols="12" md="6">
      <b-form-group
        label-for="frm-delivery-deliverydate"
      >
        <template #label>Tanggal Kirim<small class="text-danger">*</small> :</template>
        <flat-pickr
          id="frm-delivery-driverydate"
          placeholder="Tanggal Pengiriman"
          class="form-control"
          :config="{ altInput: true, altFormat: 'j F Y', dateFormat: 'Y-m-d', locale: Indonesian }"
          v-model="form.tanggalkirim"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BFormInput, BFormGroup, BFormRadioGroup,
} from 'bootstrap-vue'
import CustomAlert from '@/migis/components/Alert.vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { Indonesian } from 'flatpickr/dist/l10n/id'
import DeliveryNoteServices from '@/migis/modules/app/delivery-note/services'

export default {
  components: {
    BRow, BCol, BFormInput, BFormGroup, BFormRadioGroup,
    CustomAlert, vSelect, flatPickr,
  },
  data() {
    return{
      Indonesian,
      processing: false,
      alertProps: { show: false, variant: '', message: null },
      itemOptions: [
        { text: 'LIQUID CO2', value: 'LIQUID CO2' },
        { text: 'DRY ICE', value: 'DRY ICE' },
        { text: 'DRY ICE (pallete)', value: 'DRY ICE (pallete)' },
        { text: 'OXYGEN', value: 'OXYGEN' },
        { text: 'ARGON', value: 'ARGON' },
        { text: 'NITROGEN', value: 'NITROGEN' },
      ],
      uomOptions: [
        { text: 'KG', value: 'KG' },
        { text: 'LITER', value: 'LITER' },
        { text: 'CRADDLE', value: 'CV' },
        { text: 'TABUNG', value: 'BT' },
      ],
      form: {
        donumber: '',
        ponumber: '',
        is_processing: '',
        is_remark: '',
        invoice_no: '',
        print_count: '',
        customernama: '',
        customeralamat: '',
        customerkota: '',
        nopol: '',
        drivernama: '',
        item: '',
        qty: '',
        uom: '',
        tanggalkirim: '',
      },
      delivery_no: null,
      btnRequest: null,
    }
  },
  methods: {
    isNumber(e){
      e = (e) ? e : window.event;
      let cCode = (e.which) ? e.which : e.kCode;
      if ((cCode > 31 && (cCode < 48 || cCode > 57)) && (cCode < 40 || cCode > 41)) {
        e.preventDefault();
      } else {
        return true;
      }
    },
    resetAlert() {
      this.alertProps = { show: false, variant: '', message: null }
    },
    handleProcessing(value) {
      this.processing = value
      this.$root.$emit('formDeliveryNoteProcessing', {processing: value})
    },
    validator() {
      const errors = []
      if(!this.form.customernama){ errors.push('Nama Customer tidak boleh kosong') }
      if(!this.form.customeralamat){ errors.push('Alamat Customer tidak boleh kosong') }
      if(!this.form.nopol){ errors.push('Nopol tidak boleh kosong') }
      if(!this.form.drivernama){ errors.push('Nama Pengemudi tidak boleh kosong') }
      if(!this.form.item){ errors.push('Item tidak boleh kosong') }
      if(!this.form.qty){ errors.push('Kuantiti tidak boleh kosong') }
      if(!this.form.uom){ errors.push('UoM tidak boleh kosong') }
      if(!this.form.tanggalkirim){ errors.push('Tanggal kirim tidak boleh kosong') }
      return {
        success: errors.length === 0, message: errors
      }
    },
    resetFormCreating() {
      this.form = {
        donumber: '',
        ponumber: '',
        is_processing: '',
        is_remark: '',
        invoice_no: '',
        print_count: '',
        customernama: '',
        customeralamat: '',
        customerkota: '',
        nopol: '',
        drivernama: '',
        item: '',
        qty: '',
        uom: '',
        tanggalkirim: '',
      }
      this.delivery_no = null
      this.btnRequest = null
    },
    async submitCreating() {
      this.btnRequest = 1
      this.resetAlert()
      this.handleProcessing(true)
      const isValid = this.validator()
      if(!isValid.success){
        this.handleProcessing(false)
        this.alertProps = { show: true, variant: 'danger', message: isValid.message }
        setTimeout(() => { this.resetAlert() }, 4000)
      }else{
        try {
          const creating = await DeliveryNoteServices.create({form: this.form, btnRequest: this.btnRequest})
          this.resetFormCreating()
          this.handleProcessing(false)
          this.$nextTick(() => {
            this.$root.$emit('formDeliveryNoteCreated', creating.data)
          }) 
        } catch (error) {
          console.error(error)
          this.handleProcessing(false)
          this.$bvToast.toast(`${error}`, {title: 'Failed to Create Surat Jalan', toaster: 'b-toaster-top-center', solid: false, variant: 'danger'})
        }
      }
    },
    formUpdating(data) {
      this.form = {
        donumber: data.do_no,
        ponumber: data.po_no,
        is_processing: data.is_processing,
        is_remark: data.is_remark,
        invoice_no: data.invoice_no,
        print_count: data.print_count,
        customernama: data.detail.detail_customer,
        customeralamat: data.detail.detail_address,
        customerkota: data.detail.detail_city,
        nopol: data.detail.detail_nopol,
        drivernama: data.detail.detail_driver,
        item: data.detail.detail_item,
        qty: data.detail.detail_qty,
        uom: data.detail.detail_uom,
        tanggalkirim: data.detail.detail_sending_date,
      }
      this.delivery_no = data.delivery_no
    },
    resetFormUpdating(data) {
      this.form = {
        donumber: data.do_no,
        ponumber: data.po_no,
        is_processing: data.is_processing,
        is_remark: data.is_remark,
        invoice_no: data.invoice_no,
        print_count: data.print_count,
        customernama: data.detail.detail_customer,
        customeralamat: data.detail.detail_address,
        customerkota: data.detail.detail_city,
        nopol: data.detail.detail_nopol,
        drivernama: data.detail.detail_driver,
        item: data.detail.detail_item,
        qty: data.detail.detail_qty,
        uom: data.detail.detail_uom,
        tanggalkirim: data.detail.detail_sending_date,
      }
      this.delivery_no = data.delivery_no
      this.btnRequest = null
    },
    async submitUpdating() {
      this.btnRequest = 2
      this.resetAlert()
      this.handleProcessing(true)
      const isValid = this.validator()
      if(!isValid.success){
        this.handleProcessing(false)
        this.alertProps = { show: true, variant: 'danger', message: isValid.message }
        setTimeout(() => { this.resetAlert() }, 4000)
      }else{
        try {
          DeliveryNoteServices.deliveryId = this.$route.params.unique
          DeliveryNoteServices.keywordToUpdate = 'update-form-sj'
          const update = await DeliveryNoteServices.update({form: this.form, btnRequest: this.btnRequest})
          this.handleProcessing(false)
          this.$nextTick(() => {
            this.$root.$emit('formDeliveryNoteUpdated', update.data)
          }) 
        } catch (error) {
          console.error(error.message)
          this.handleProcessing(false)
          this.$bvToast.toast(`${error}`, {title: 'Failed to Update Surat Jalan', toaster: 'b-toaster-top-center', solid: false, variant: 'danger'})
        }
      }
    },
  },
  created() {
    this.$root.$on('formDeliveryNoteCreate', () => {
      this.submitCreating()
    });
    this.$root.$on('formDeliveryNoteCreateOnClose', () => {
      this.resetFormCreating()
    });
    this.$root.$on('formDeliveryNoteEditing', (data) => {
      this.formUpdating(data)
    });
    this.$root.$on('formDeliveryNoteResetEditing', (data) => {
      this.resetFormUpdating(data)
    });
    this.$root.$on('formDeliveryNoteEdit', () => {
      this.submitUpdating()
    });
  },
  beforeDestroy() {
    this.$root.$off('formDeliveryNoteCreate');
    this.$root.$off('formDeliveryNoteCreateOnClose');
    this.$root.$off('formDeliveryNoteEditing');
    this.$root.$off('formDeliveryNoteResetEditing');
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>