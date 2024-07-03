<template>
  <b-modal
    v-model="showModal"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    centered
    size="lg"
    title="Form Departemen"
  >
    <div class="modal-body">
      <b-row>
        <b-col cols="12">
          <custom-alert :alert="alertDept" />
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrdept-name"
          >
            <template #label>
              <span>Nama Departemen<span class="text-danger">*</span> :</span>
            </template>
            <b-form-input
              id="frm-hrdept-name"
              :disabled="processing"
              v-model="formDept.name"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrdept-positions"
          >
            <template #label>
              <span>Jabatan Terkait<span class="text-danger">*</span> :</span>
            </template>
            <v-select
              :disabled="processing"
              :options="positionsList"
              :reduce="name => name.id"
              v-model="formDept.positions_id"
              multiple
              label="name"
              id="frm-hrdept-positions"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrdept-status"
          >
            <template #label>
              <span>Status<span class="text-danger">*</span> :</span>
            </template>
            <v-select
              :disabled="processing"
              :options="statusOptions"
              :reduce="text => text.value"
              :clearable="false"
              v-model="formDept.isActive"
              label="text"
              id="frm-hrdept-status"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" class="text-right">
          <b-button
            variant="flat-primary"
            class="mr-50"
            @click="formDept.id ? submitUpdate() : submitCreate()"
          >
            <iconify icon="tabler:send" class="mr-50" />
            Kirim
          </b-button>
          <b-button
            variant="flat-danger"
            class="mr-0"
            @click="closeModal"
          >
            <iconify icon="tabler:circle-x" class="mr-50" />
            Tutup
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
import {
  BModal, BButton, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import CustomAlert from '@/migis/components/Alert.vue'
import HRServices from '@/migis/modules/app/hr/services'

export default {
  components: {
    BModal, BButton, BRow, BCol, BFormGroup, BFormInput,
    vSelect,
    CustomAlert,
  },
  data() {
    return {
      showModal: false,
      processing: false,
      formDept: {
        id: null,
        unique_str: '',
        name: '',
        isActive: true,
        positions_id: [],
      },
      statusOptions: [
        { value: true, text: 'Active' },
        { value: false, text: 'Inactive' },
      ],
      alertDept: { show: false, variant: '', message: null },
    }
  },
  methods: {
    handleShowModal(value) { this.showModal = value },
    handleProcessing(value) { this.processing = value },
    handleAlertDept(show, variant, message) { this. alertDept = { show: show, variant: variant, message: message } },
    clearForm() {
      this.formDept = {
        id: null,
        name: '',
        isActive: true,
        positions_id: [],
      }
    },
    closeModal() {
      this.clearForm()
      this.handleShowModal(false)
    },
    handleFormEditing(department) {
      const positionsIds = department.positions.map(item => item.id)
      this.formDept.id = department.id
      this.formDept.name = department.name
      this.formDept.isActive = department.is_active === 1 ? true : false
      this.formDept.positions_id = positionsIds
    },
    async submitCreate() {
      this.handleProcessing(true)
      const isValid = HRServices.validatorDept(this.formDept)
      if(!isValid.success) {
        this.handleAlertDept(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleAlertDept(false, '', null), 3000)
      } else {
        try {
          const creating = await HRServices.createDept(this.formDept)
          this.$bvToast.toast(`Departemen berhasil dibuat.`, {
            title: 'HR',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          this.clearForm()
          this.handleProcessing(false)
        } catch (error) {
          this.handleAlertDept(true, 'danger', error.message || error)
          this.handleProcessing(false)
          setTimeout(() => this.handleAlertDept(false, '', null), 3000)
        }
      }
    },
    async submitUpdate() {
      this.handleProcessing(true)
      const isValid = HRServices.validatorDept(this.formDept)
      if(!isValid.success) {
        this.handleAlertDept(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleAlertDept(false, '', null), 3000)
      } else {
        try {
          const updating = await HRServices.updateDept(this.formDept)
          this.$bvToast.toast(`Departemen berhasil diperbarui.`, {
            title: 'HR',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          this.clearForm()
          this.handleProcessing(false)
        } catch (error) {
          this.handleAlertDept(true, 'danger', error.message || error)
          this.handleProcessing(false)
          setTimeout(() => this.handleAlertDept(false, '', null), 3000)
        }
      }
    },
  },
  computed: {
    positionsList() {
      return this.$store.state.migis.hr.positions
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>