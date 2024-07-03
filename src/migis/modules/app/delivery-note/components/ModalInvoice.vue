<template>
  <b-modal
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    centered
    title="Invoice"
    v-model="show"
    size="sm"
  >
    <b-row>
      <b-col cols="12">
        <custom-alert :alert="alert"/>
      </b-col>
      <b-col cols="12">
        <b-form-group
          label="Nomor Invoice"
          label-for="frm-delivery-invoice"
        >
          <b-form-input
            id="form-add-merk"
            v-model="invoice_no"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" class="text-right">
        <b-button
          class="mr-25"
          variant="flat-primary"
          v-if="!processing"
          @click="onSubmit"
        >
          <iconify
            icon="tabler:flag-check"
          />
          <span
            class="ml-25"
          >
            Post
          </span>
        </b-button>
        <b-button
          @click="onCancel"
          variant="flat-danger"
          v-if="!processing"
        >
          <iconify
            icon="tabler:arrow-left"
          />
          <span
            class="ml-25"
          >
            Batal
          </span>
        </b-button>
        <!-- <b-button
          class="mr-25"
          variant="secondary"
          disabled
          v-if="processing"
        >
          <b-spinner small class="mr-"/>
        </b-button> -->
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import {
  BModal, BRow, BCol, BFormGroup, BFormInput, BButton, BSpinner,
} from 'bootstrap-vue'
import CustomAlert from '@/migis/components/Alert.vue'
import DeliveryNoteServices from '@/migis/modules/app/delivery-note/services'

export default {
  components: {
    BModal, BRow, BCol, BFormGroup, BFormInput, BButton, BSpinner,
    CustomAlert,
  },
  data() {
    return {
      alert: { show: false, variant: 'danger', message: null },
      processing: false,
      show: false,
      invoice_no: '',
      id: null,
      form: {},
      btnRequest: null,
    }
  },
  methods: {
    handleShow(value) {
      this.show = value
    },
    resetForm() {
      this.id = null
      this.btnRequest = null
      this.form = {}
    },
    resetAlert() {
      this.alert = { show: false, variant: 'danger', message: null }
    },
    handleProcessing(value) {
      this.processing = value
    },
    async onSubmit() {
      try {
        this.handleProcessing(true)
        this.form.invoice_no = this.invoice_no
        DeliveryNoteServices.deliveryId = this.id
        DeliveryNoteServices.keywordToUpdate = 'update-post-invoice'
        const update = await DeliveryNoteServices.update({
          form: this.form,
          btnRequest: 4
        })
        this.handleProcessing(false)
        this.handleShow(false)
      } catch (error) {
        console.error(error)
        this.handleProcessing(false)
      }
    },
    onCancel() {
      this.$root.$emit('cancelDeliveryNoteInvoice', {deliveryId: this.id, event: false})
      this.resetForm()
      this.resetAlert()
      this.handleShow(false)
    },
  },
  created() {
    this.$root.$on('modalDeliveryNoteInvoice', (data) => {
      this.form = {
        donumber: data.deliveryData.po_no,
        ponumber: data.deliveryData.do_no,
        is_processing: false,
        is_remark: true,
        invoice_no: data.deliveryData.invoice_no,
        print_count: data.deliveryData.print_count,
        customernama: data.deliveryData.detail.detail_customer,
        customeralamat: data.deliveryData.detail.detail_address,
        customerkota: data.deliveryData.detail.detail_city,
        nopol: data.deliveryData.detail.detail_nopol,
        drivernama: data.deliveryData.detail.detail_driver,
        item: data.deliveryData.detail.detail_item,
        qty: data.deliveryData.detail.detail_qty,
        uom: data.deliveryData.detail.detail_uom,
        tanggalkirim: data.deliveryData.detail.detail_sending_date,
      }
      this.btnRequest = 4
      this.id = data.deliveryData.delivery_no
      this.handleShow(data.event)
    })
  },
  beforeDestroy() {
    this.$root.$off('modalDeliveryNoteInvoice')
    this.resetForm()
    this.resetAlert()
    this.handleShow(false)
  }
}
</script>

<style>

</style>
