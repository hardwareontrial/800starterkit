<script>
import {
  BModal, BButton, BSpinner, BRow, BCol
} from 'bootstrap-vue'
import FormRole from '../../components/FormRole.vue'
import FormPermission from '../../components/FormPermission.vue'
import AuthorizationService from '@/migis/modules/app/authorization/services'
import AlertComponent from '@/migis/components/Alert.vue'

export default {
  components: {
    BModal, BButton, BSpinner, BRow, BCol,
    FormRole, FormPermission,
    AlertComponent,
  },
  data() {
    return {
      show: false,
      updateForm: {
        user_id: null,
        user_unique_str: '',
        fname: '',
        position: null,
        userPermissions: [],
        userRoles: []
      },
      processing: false,
      alertProps: {show: false, variant: '', message: null },
    }
  },
  methods: {
    handleShow(value) { this.show = value },
    handleData(data) {
      const mappedRole = data.userRoles.map(item => item.id)
      const mappedPermission = data.userPermissions.map(item => item.id)
      this.updateForm = {
        user_id: data.user_id,
        user_unique_str: data.user_unique_str,
        fname: data.fname,
        position: data.position_id,
        userPermissions: mappedPermission,
        userRoles: mappedRole
      }
    },
    handleProcessing(value) { this.processing = value },
    handleAlertProp(value) {
      this.alertProps = {show: value.show, variant: value.variant, message: value.message }
    },
    updateFromFormRole(value) { this.updateForm.userRoles = value },
    updateFromFormPermission(value) { this.updateForm.userPermissions = value },
    closeModalRoleUser() {
      this.updateForm = {
        user_id: null,
        user_unique_str: '',
        fname: '',
        position: null,
        userPermissions: [],
        userRoles: []
      }
      this.handleShow(false)
    },
    async submitUpdateRoleUser() {
      try {
        this.handleProcessing(true)
        this.handleAlertProp({show: false, variant: '', message: null })
        const updating = await AuthorizationService.updateUserRolePermission(this.updateForm)
        await AuthorizationService.init()
        this.handleAlertProp({
          show: true,
          variant: 'success',
          message: `Update user ${updating.data.fname} berhasil.`
        })
        this.handleProcessing(false)
        setTimeout(() => {
          this.handleAlertProp({show: false, variant: '', message: null })
        }, 3000);
      } catch (error) {
        console.error(error)
        this.handleAlertProp({show: true, variant: 'danger', message: error.message || error })
        this.handleProcessing(false)
        setTimeout(() => {
          this.handleAlertProp({show: false, variant: '', message: null })
        }, 3000);
      }
    },
  },
  created() {
    this.$root.$on('showAuthRoleUserModal', (data) => {
      this.handleShow(true)
      this.handleData(data)
    })
  },
  beforeDestroy() {
    this.$root.$off('showAuthRoleUserModal')
  }
}
</script>

<template>
  <b-modal
    no-close-on-backdrop
    no-close-on-esc
    no-stacking
    hide-footer
    hide-header-close
    v-model="show"
    centered
    size="lg"
    :title="`AUTHORIZATION USER ${updateForm.fname}`"
  >
    <b-row>
      <b-col cols="12">
        <alert-component :alert="alertProps" />
      </b-col>
    </b-row>
    <form-role
      ref="refRoleUserRole"
      :processing="processing"
      :roleProp="this.updateForm.userRoles"
      @updateFormRole="updateFromFormRole"
    />

    <form-permission
      ref="refRoleUserPermission"
      :processing="processing"
      :permissionProp="this.updateForm.userPermissions"
      @updateFormPermission="updateFromFormPermission"
    />
    <div class="modal-footer">
      <div v-if="!processing">
        <b-button
          variant="flat-primary"
          class="mr-50"
          @click="submitUpdateRoleUser"
        >
          <iconify icon="tabler:send" class="mr-50"/>
          <span>Update</span>
        </b-button>
        <b-button
          variant="flat-danger"
          class="mr-0"
          @click="closeModalRoleUser"
        >
          <iconify icon="tabler:circle-x" class="mr-50" />
          <span>Batal</span>
        </b-button>
      </div>
      <div v-else>
        <b-spinner
          small
        />
        <span class="ml-50">Processing</span>
      </div>
    </div>
  </b-modal>
</template>

<style>

</style>