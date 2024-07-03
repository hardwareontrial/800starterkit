<template>
  <b-modal
    v-model="showModal"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    centered
    size="lg"
    title="Form Posisi"
  >
    <div class="modal-body">
      <b-row>
        <b-col cols="12">
          <custom-alert :alert="alertPosition" />
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrposition-name"
          >
            <template #label>
              <span>Nama Jabatan<span class="text-danger">*</span> :</span>
            </template>
            <b-form-input
              id="frm-hrposition-name"
              :disabled="processing"
              v-model="formPosition.name"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrposition-dept"
          >
            <template #label>
              <span>Departemen<span class="text-danger">*</span> :</span>
            </template>
            <v-select
              :disabled="processing"
              :options="activeDepartment"
              :reduce="name => name.id"
              v-model="formPosition.department_id"
              :clearable="false"
              label="name"
              id="frm-hrposition-dept"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrposition-level"
          >
            <template #label>
              <span>Level Jabatan<span class="text-danger">*</span> :</span>
            </template>
            <v-select
              @input="filterActiveParentPosition"
              :disabled="processing"
              :options="levelOptions"
              :reduce="text => text.value"
              v-model="formPosition.level"
              :clearable="false"
              label="text"
              id="frm-hrposition-level"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <form-user-active
        :asterisk="false"
        :processing="processing"
        :userProp="formPosition.users"
        @updateFormUsers="handleFromFormUser"
        label="User"
      />
      <b-row>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrposition-parent"
          >
            <template #label>
              <span>Jabatan Atasan : </span>
            </template>
            <v-select
              :disabled="processing"
              :options="upperPositionOptions"
              :reduce="name => name.id"
              v-model="formPosition.parent_position_id"
              label="name"
              id="frm-hrposition-parent"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-hrposition-status"
          >
            <template #label>
              <span>Status<span class="text-danger">*</span> :</span>
            </template>
            <v-select
              :disabled="processing"
              :options="statusOptions"
              :reduce="text => text.value"
              :clearable="false"
              label="text"
              id="frm-hrposition-status"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" class="text-right">
          <b-button
            variant="flat-primary"
            class="mr-50"
            @click="formPosition.id ? submitUpdate() : submitCreate()"
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
import FormUserActive from '@/migis/components/Form/FormUserList.vue'

export default {
  components: {
    BModal, BButton, BRow, BCol, BFormGroup, BFormInput,
    vSelect,
    CustomAlert, FormUserActive,
  },
  data() {
    return {
      showModal: false,
      processing: false,
      formPosition: {
        id: null,
        unique_str: '',
        name: '',
        level: null,
        department_id: null,
        parent_position_id: null,
        users: [],
        isActive: true,
      },
      statusOptions: [
        { value: true, text: 'Active' },
        { value: false, text: 'Inactive' },
      ],
      levelOptions: [
        { value: 2, text: 'BOD'},
        { value: 3, text: 'GM'},
        { value: 4, text: 'MANAGER'},
        { value: 5, text: 'SUPERVISOR'},
        { value: 6, text: 'SENIOR STAFF, STAFF, OPERATOR, ADMIN, NON-MANAGERIAL'},
      ],
      alertPosition: { show: false, variant: '', message: null },
      upperPositionOptions: [],
    }
  },
  methods: {
    handleShowModal(value) { this.showModal = value },
    handleProcessing(value) { this.processing = value },
    handleAlertPosition(show, variant, message) { this.alertPosition = { show: show, variant: variant, message: message } },
    clearForm() {
      this.formPosition = {
        id: null,
        unique_str: '',
        name: '',
        department_id: null,
        parent_position_id: null,
        users: [],
        isActive: true,
      }
      this.upperPositionOptions = []
    },
    closeModal() {
      this.clearForm()
      this.handleShowModal(false)
    },
    handleFromFormUser(value) {
      this.formPosition.users = value
    },
    handleFormEditing(position) {
      const hasUserIds = position.hasUsers.map(user => user.user_id)
      this.formPosition.id = position.id
      this.formPosition.unique_str = position.position_unique_str
      this.formPosition.name = position.name
      this.formPosition.level = position.level
      this.formPosition.department_id = position.department_id
      this.formPosition.parent_position_id = position.parent_position_id
      this.formPosition.users = hasUserIds
      this.formPosition.isActive = position.is_active === 1 ? true : false
      this.filterActiveParentPosition(this.formPosition.level);
    },
    async submitUpdate() {
      this.handleProcessing(true)
      const isValid = HRServices.validatorPosition(this.formPosition)
      if(!isValid.success) {
        this.handleAlertPosition(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleAlertPosition(false, '', null), 3000)
      } else {
        try {
          const updating = await HRServices.updatePosition(this.formPosition)
          this.$bvToast.toast(`${this.formPosition.name} berhasil diperbarui.`, {
            title: 'HR',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          this.clearForm()
          this.handleProcessing(false)
        } catch (error) {
          this.handleAlertPosition(true, 'danger', error.message || error)
          this.handleProcessing(false)
          setTimeout(() => this.handleAlertPosition(false, '', null), 3000)
        }
      }
    },
    async submitCreate() {
      this.handleProcessing(true)
      const isValid = HRServices.validatorPosition(this.formPosition)
      if(!isValid.success) {
        this.handleAlertPosition(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleAlertPosition(false, '', null), 3000)
      } else {
        try {
          const creating = await HRServices.createPosition(this.formPosition)
          this.$bvToast.toast(`${this.formPosition.name.toUpperCase()} berhasil dibuat.`, {
            title: 'HR',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          this.clearForm()
          this.handleProcessing(false)
        } catch (error) {
          this.handleAlertPosition(true, 'danger', error.message || error)
          this.handleProcessing(false)
          setTimeout(() => this.handleAlertPosition(false, '', null), 3000)
        }
      }
    },
    filterActiveParentPosition(value) {
      // this.upperPositionOptions = this.activeParentPosition.filter(position => position.level < value)
      this.upperPositionOptions = this.activeParentPosition.filter(position => {
        const deptId = this.formPosition.department_id;
        const deptMatch = value <= 4 ? true : (position.department_id === deptId);
        const upperPositionLevel = position.level < value;
        return deptMatch && upperPositionLevel
      })
    },
  },
  computed: {
    activeDepartment() {
      return this.$store.getters['migis/hr/getActiveDepartment']
    },
    activeParentPosition() {
      return this.$store.getters['migis/hr/getActivePosition']
    },
  },
  watch: {
    'formPosition.department_id': {
      handler(val, oldVal) {
        this.upperPositionOptions = []
        if(val) { this.filterActiveParentPosition(this.formPosition.level) }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>