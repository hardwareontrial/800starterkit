<template>
  <b-row>
    <b-col cols="12">
      <b-card
        :title="editingMode ? 'Form Surat Jalan' : ''"
      >
        
        <b-row>
          <b-col cols="12" class="mb-50">
            <b-alert
              :show="alertPropsDetail.show"
              :variant="alertPropsDetail.variant"
            >
              <div class="alert-body">
                <iconify
                  class="mr-25"
                  :icon="alertPropsDetail.icon"
                />
                <span>
                  {{alertPropsDetail.message}}
                </span>
              </div>
            </b-alert>
          </b-col>

          <b-col cols="12" v-if="dataDeliveryNote">
            <b-row>
              <b-col
                cols="12"
                v-if="!editingMode"
              >
                <print-template-component
                  :deliveryData="dataDeliveryNote"
                />
              </b-col>
              
              <b-col
                cols="12"
                v-if="editingMode"
              >
                <form-component />
              </b-col>

              <b-col
                cols="12"
                class="text-center mt-1"
              >
                <b-button
                  class="ml-0"
                  variant="flat-primary"
                  v-if="!editingMode"
                  @click="handlePrinting"
                  :disabled="processing"
                >
                  <iconify
                    icon="tabler:printer"
                  />
                  <span
                    class="ml-50"
                  >
                    Cetak
                  </span>
                </b-button>
                <b-button
                  class="ml-50"
                  :variant="`flat-${processing ? 'secondary' : 'primary'}`"
                  v-if="dataDeliveryNote.print_count <= 0 && !processing"
                  @click="editingMode ? handleUpdate() : toEditing()"
                  :disabled="processing"
                >
                  <iconify
                    :icon="`tabler:${editingMode ? 'refresh' : 'edit-circle'}`"
                  />
                  <span
                    class="ml-50"
                  >
                    {{ editingMode ? 'Update' : 'Edit' }}
                  </span>
                </b-button>
                <b-button
                  class="ml-50"
                  :variant="`flat-${processing ? 'secondary' : 'danger'}`"
                  v-if="!processing"
                  @click="editingMode ? handleCancelEdit() : handleClose()"
                  :disabled="processing"
                >
                  <iconify
                    :icon="`tabler:${editingMode ? 'edit-circle-off' : 'arrow-left'}`"
                  />
                  <span
                    class="ml-50"
                  >
                    {{ editingMode ? 'Batal' : 'Kembali' }}
                  </span>
                </b-button>
              </b-col>

              <b-col
                cols="12"
                class="text-center mt-1"
                v-if="processing"
              >
                <b-button
                  class="ml-0"
                  variant="flat-secondary"
                  :disabled="processing"
                >
                  <iconify
                    icon="tabler:hourglass"
                  />
                  <span
                    class="ml-25"
                  >
                    Proses ...
                  </span>
                </b-button>
              </b-col>

            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col md="6" lg="4" v-if="dataDeliveryNote">
      <log-component :logs="dataDeliveryNote.logs.slice(0,5)"/>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BButton, BAlert, BCard,
} from 'bootstrap-vue'
import DeliveryNoteServices from '@/migis/modules/app/delivery-note/services'
import FormComponent from '@/migis/modules/app/delivery-note/components/Form.vue'
import PrintTemplateComponent from '@/migis/modules/app/delivery-note/components/PrintTemplate.vue'
import LogComponent from '@/migis/modules/app/delivery-note/components/Log.vue'

export default {
  components: {
    BRow, BCol, BButton, BAlert, BCard,
    FormComponent, PrintTemplateComponent, LogComponent,
  },
  data() {
    return {
      alertPropsDetail: { show: false, variant: '', message: null, icon: '' },
      dataDeliveryNote: null,
      editingMode: false,
      processing: false,
    }
  },
  methods: {
    resetAlertPropsDetail() {
      this.alertPropsDetail ={ show: false, variant: '', message: null, icon: '' }
    },
    handleProcessing(value) {
      console.log(value)
      this.processing = value
    },
    handleClose() {
      this.resetAlertPropsDetail()
      this.dataDeliveryNote = null
      this.$router.push({name: 'deliveryNote-dashboard-view'})
    },
    handleEditing(value) {
      this.editingMode = value
    },
    handleCancelEdit() {
      this.$root.$emit('formDeliveryNoteResetEditing', this.dataDeliveryNote)
      this.handleEditing(false)
    },
    handleUpdate() {
      this.$root.$emit('formDeliveryNoteEdit', {processing: true})
    },
    toEditing() {
      this.handleEditing(true)
      this.$nextTick(() => {
        this.$root.$emit('formDeliveryNoteEditing', this.dataDeliveryNote)
      })
    },
    async getDetail() {
      try {
        // TODO: Add loading state
        DeliveryNoteServices.deliveryId = this.$route.params.unique
        const dn = await DeliveryNoteServices.getDetail()
        if(!dn.data){
          this.alertPropsDetail = { show: true, variant: 'danger', message: 'Data Not Found', icon: 'tabler:playstation-x' }
        } else {
          this.dataDeliveryNote = dn.data
          if(this.dataDeliveryNote.print_count > 0) {
            this.alertPropsDetail = {
              show: true,
              variant: 'primary',
              message: `TOTAL PRINT: ${this.dataDeliveryNote.print_count}. DATA TIDAK BISA DIRUBAH.`,
              icon: 'tabler:info-circle'
            } 
          }
        }
      } catch (error) {
        console.error(error)
      }
    },
    handlePrinting() {
      this.$root.$emit('printingDeliveryNote')
    },
    async handleDeliveryPrinted() {
      try {
        const form = {
          donumber: this.dataDeliveryNote.do_no,
          ponumber: this.dataDeliveryNote.po_no,
          is_processing: this.dataDeliveryNote.is_processing,
          is_remark: this.dataDeliveryNote.is_remark,
          invoice_no: this.dataDeliveryNote.invoice_no,
          print_count: this.dataDeliveryNote.print_count +1,
          customernama: this.dataDeliveryNote.detail.detail_customer,
          customeralamat: this.dataDeliveryNote.detail.detail_address,
          customerkota: this.dataDeliveryNote.detail.detail_city,
          nopol: this.dataDeliveryNote.detail.detail_nopol,
          drivernama: this.dataDeliveryNote.detail.detail_driver,
          item: this.dataDeliveryNote.detail.detail_item,
          qty: this.dataDeliveryNote.detail.detail_qty,
          uom: this.dataDeliveryNote.detail.detail_uom,
          tanggalkirim: this.dataDeliveryNote.detail.detail_sending_date,
        }
        DeliveryNoteServices.deliveryId = this.$route.params.unique
        DeliveryNoteServices.keywordToUpdate = 'update-print-count'
        const update = await DeliveryNoteServices.update({
          form: form,
          btnRequest: 3
        })
        await this.getDetail()
        this.handleEditing(false)
      } catch (error) {
        console.error(error)
        this.handleEditing(false)
        this.$bvToast.toast(`${error}`, {title: 'Failed to Update Surat Jalan', toaster: 'b-toaster-top-center', solid: false, variant: 'danger'})
      }
    }
  },
  mounted() {
    this.getDetail()
  },
  created() {
    this.$root.$on('formDeliveryNoteProcessing', (data) => { this.handleProcessing(data.processing) })
    this.$root.$on('printedDeliveryNote', () => {
      this.handleDeliveryPrinted()
    })
    this.$root.$on('formDeliveryNoteUpdated', async () => {
      await this.getDetail()
      this.handleEditing(false)
    })
  },
  beforeDestroy() {
    this.$root.$off('formDeliveryNoteProcessing')
    this.$root.$off('formDeliveryNoteUpdated')
    this.resetAlertPropsDetail()
    this.dataDeliveryNote = null
  }
}
</script>

<style></style>