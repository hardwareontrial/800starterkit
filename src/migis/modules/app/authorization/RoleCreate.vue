<script>
import { BContainer, BCard, BRow, BCol, BButton, BCardTitle, BSpinner } from 'bootstrap-vue'
import AlertValidator from '@/migis/components/Alert.vue'
import store from '@/store'
import FormGeneral from './components/FormRoleGeneral.vue'
import FormPermission from './components/FormPermission.vue'
import FormUser from './components/FormUser.vue'
import AuthorizationService from '@/migis/modules/app/authorization/services'

export default {
  components: {
    BContainer, BCard, BRow, BCol, BButton, BCardTitle, BSpinner,
    AlertValidator,
    FormGeneral, FormPermission, FormUser,
  },
  data() {
    return {
      processing: false,
      createForm: {
        id: '',
        role_unique_str: '',
        name: '',
        description: '',
        users: [],
        permissions: [],
      },
      alertGenInfo: { show: false, variant: '', message: null },
    }
  },
  methods: {
    handleProcessing(value) { this.processing = value },
    updateFromFormRoleGeneral(value) {
      this.createForm.name = value.name
      this.createForm.description = value.description
    },
    updateFromFormPermission(value) {
      this.createForm.permissions = value
    },
    updateFromFormUser(value) {
      this.createForm.users = value
    },
    async submitCreateRole() {
      this.handleProcessing(true)
      this.alertGenInfo = { show: false, variant: '', message: null }
      const isValid = AuthorizationService.validator(this.createForm)
      if(!isValid.success) {
        this.handleProcessing(false)
        this.alertGenInfo = { show: true, variant: 'danger', message: isValid.message }
        setTimeout(() => this.alertGenInfo = { show: false, variant: '', message: null }, 3000)
      } else {
        try {
          const formCreated = {
            id: this.createForm.id,
            role_unique_str: this.createForm.role_unique_str,
            name: this.createForm.name,
            description: this.createForm.description,
            roleUserId: this.createForm.users,
            rolePermissionId: this.createForm.permissions,
          }
          const creating = await AuthorizationService.createRole(formCreated)
          this.$bvToast.toast(`Role ${creating.data.name} berhasil dibuat.`, {
            title: 'Authorization',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'info',
          })
          setTimeout(async () => {
            await AuthorizationService.init()
            await this.$router.replace({name: 'authorization-role-dashboard'})
          }, 750)
        } catch (error) {
          this.handleProcessing(false)
          this.alertGenInfo = { show: true, variant: 'danger', message: error.message || error }
          setTimeout(() => this.alertGenInfo = { show: false, variant: '', message: null }, 3000)
          this.$bvToast.toast(`${error.message || error}`, {
            title: 'Authorization',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'danger',
          })
        }
      }
    },
    cancelCreateRole() {
      this.$router.replace({name: 'authorization-role-dashboard'})
    },
  },
  created() {
    this.$root.$on('authorizationRoleCreateProcessing', (value) => this.handleProcessing(value))
  },
  beforeDestroy() {
    this.$root.$off('authorizationRoleCreateProcessing')
  },
}
</script>

<template>
  <b-container>
    <b-row>
      <b-col cols="12" md="2"></b-col>
      <b-col cols="12" md="8">
        <b-card no-body>
          <div class="card-header">
            <b-card-title>
              Form Tambah Role
            </b-card-title>
            <div
              v-if="processing"
              class="text-muted"
            >
              <b-spinner
                small
              />
              <span class="ml-50">Processing</span>
            </div>
          </div>
          <div class="card-body">
            <alert-validator :alert="alertGenInfo"/>
            <form-general
              ref="genInfoRoleForm"
              :processing="processing"
              :generalProp="{name: createForm.name, description: createForm.description}"
              @updateFormRoleGeneral="updateFromFormRoleGeneral"
            />
            <form-permission
              ref="permissionRoleForm"
              :processing="processing"
              :permissionProp="createForm.rolePermissions"
              @updateFormPermission="updateFromFormPermission"
            />
            <form-user
              ref="userRoleForm"
              :processing="processing"
              :userProp="createForm.roleUsers"
              @updateFormUsers="updateFromFormUser"
            />
            <b-row>
              <b-col cols="12" class="text-center" v-if="!processing">
                <b-button
                  variant="flat-primary"
                  class="mr-50"
                  @click="submitCreateRole"
                >
                  <iconify icon="tabler:circle-plus" class="mr-50"/>
                  <span>Tambah</span>
                </b-button>
                <b-button
                  variant="flat-danger"
                  class="mr-0"
                  @click="cancelCreateRole"
                >
                  <iconify icon="tabler:circle-x" class="mr-50"/>
                  <span>Batal</span>
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-col>
      <b-col cols="12" md="2"></b-col>
    </b-row>
  </b-container>
</template>

<style>

</style>