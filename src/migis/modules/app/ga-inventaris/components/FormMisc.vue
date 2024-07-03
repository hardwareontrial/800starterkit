<template>
  <b-modal
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    :title="props.title"
    v-model="show"
    size="sm"
  >
    <b-row>
      <b-col cols="12">
        <custom-alert :alert="alert"/>
      </b-col>
      <b-col cols="12">
        <b-form-group
          :label="`Nama ${props.label}:`"
          :label-for="`form-add-${props.label}`"
        >
          <b-form-input
            v-model="name"
            :id="`form-add-${props.label}`"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12" class="text-right" v-if="!processing && props.onForm">
        <b-button
          class="mr-25"
          variant="flat-primary"
          @click="props.onForm === 'location' ? addLocation() : addMerk()"
        >
          <iconify
            icon="tabler:send"
          />
          <span
            class="ml-25"
          >
            Tambah
          </span>
        </b-button>
        <b-button
          variant="flat-danger"
          @click="onClose"
        >
          <iconify
            icon="tabler:circle-x"
          />
          <span
            class="ml-25"
          >
            Batal
          </span>
        </b-button>
      </b-col>
      <b-col cols="12" class="text-right" v-if="processing">
        <b-button
          class="mr-0"
          variant="flat-secondary"
          disabled
        >
          <b-spinner small class="mr-0"/>
          <span class="ml-25">
            Processing
          </span>
        </b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import {
  BModal, BRow, BCol, BFormGroup, BFormInput, BButton, BSpinner,
} from 'bootstrap-vue'
import CustomAlert from '@/migis/components/Alert.vue'
import GaInventarisServices from '@/migis/modules/app/ga-inventaris/services'

export default {
  components: {
    BModal, BRow, BCol, BFormGroup, BFormInput, BButton, BSpinner,
    CustomAlert,
  },
  data(){
    return{
      name: '',
      alert: { show: false, variant: 'danger', message: null },
      processing: false,
      show: false,
      props: { title: '', label: '', onForm: '' },
    }
  },
  methods: {
    validator(){
      const errors = []
      if(this.name === '' || this.name === undefined || this.name === null){ errors.push('Nama tidak boleh kosong') }
      return {
        success: errors.length === 0, message: errors
      }
    },
    resetAlert(){
      this.alert = { show: false, variant: 'danger', message: null }
    },
    setModalProps(value) {
      this.props = { title: value.title, label: value.label, onForm: value.onForm }
    },
    handleShow(value) {
      this.show = value
    },
    handleProcessing(value) {
      this.processing = value
    },
    onClose() {
      this.name = ''
      this.setModalProps({title: '', label: '', onForm: ''})
      this.handleShow(false)
    },
    async addLocation() {
      this.handleProcessing(true)
      this.resetAlert()
      const isValid = this.validator()
      if(!isValid.success) {
        this.alert = { show: true, variant: 'danger', message: isValid.message }
        this.handleProcessing(false)
        setTimeout(() => {
          this.resetAlert()
        }, 3000);
      } else {
        try {
          const response = await GaInventarisServices.createLocation({name: this.name})
          await GaInventarisServices.getDataLocation()
          this.handleProcessing(false)
          this.onClose()
        } catch (error) {
          this.alert = { show: true, variant: 'danger', message: error.message || error }
          this.handleProcessing(false)
          setTimeout(() => {
            this.resetAlert()
          }, 3000);
        }
      }
    },
    async addMerk() {
      this.handleProcessing(true)
      this.resetAlert()
      const isValid = this.validator()
      if(!isValid.success) {
        this.alert = { show: true, variant: 'danger', message: isValid.message }
        this.handleProcessing(false)
        setTimeout(() => {
          this.resetAlert()
        }, 3000);
      } else {
        try {
          const response = await GaInventarisServices.createMerk({name: this.name})
          await GaInventarisServices.getDataMerk()
          this.handleProcessing(false)
          this.onClose()
        } catch (error) {
          this.alert = { show: true, variant: 'danger', message: error.message || error }
          this.handleProcessing(false)
          setTimeout(() => {
            this.resetAlert()
          }, 3000);
        }
      }
    },
  },
  created() {
    this.$root.$on('gainventarisFormMisc', (value) => {
      this.setModalProps(value.data)
      this.handleShow(value.event)
    })
  },
}
</script>

<style>

</style>