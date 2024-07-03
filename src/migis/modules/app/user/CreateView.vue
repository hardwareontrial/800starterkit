<script>
import {
  BCard, BRow, BCol, BButton, BSpinner, BCardTitle, BFormGroup, BFormCheckbox,
} from 'bootstrap-vue'
import FormRole from '@/migis/components/Form/FormRoleList.vue'
import FormPermission from '@/migis/components/Form/FormPermissionList.vue'
import FormEmail from '@/migis/components/Form/FormString.vue'
import FormFullname from '@/migis/components/Form/FormString.vue'
import FormNik from '@/migis/components/Form/FormNumber.vue'
import FormPassword from '@/migis/components/Form/FormPassword.vue'
import FormPosition from '@/migis/components/Form/FormPositionList.vue'
import FormAvatar from '@/migis/components/Form/FormAvatar.vue'
import UserServices from './services'
import CustomAlert from '@/migis/components/Alert.vue'

export default {
  components: {
    BCard, BRow, BCol, BButton, BSpinner, BCardTitle, BFormGroup, BFormCheckbox,
    FormRole, FormPermission, FormEmail, FormPassword, FormPosition, FormAvatar,
    FormFullname, FormNik,
    CustomAlert,
  },
  data() {
    return{
      createForm: {
        avatarFile: null,
        nik: null,
        fname: '',
        mname: '',
        lname: '',
        positionId: null,
        isActive: true,
        isAdmin: false,
        permissions: [],
        roles: [],
        user_id: null,
        user_unique_str: '',
        avatar: '',
        dataLogin: {
          email: '',
          password: '',
          rePassword: '',
          isActive: true,
          user_auth_id: null,
        },
      },
      previewAvatar: null,
      processing: false,
      alert: { show: false, variant: '', message: null },
    }
  },
  methods: {
    updateFromFormStringFname(value) {
      this.createForm.fname = value
    },
    updateFormNumberUserNik(value) {
      this.createForm.nik = value
    },
    updateFromFormPositionId(value) {
      this.createForm.positionId = value
    },
    updateFromFormRole(value) {
      this.createForm.roles = value
    },
    updateFromFormPermission(value) {
      this.createForm.permissions = value
    },
    updateFromFormAvatar(value) {
      this.createForm.avatarFile = value
    },
    updateFromFormStringEmail(value) {
      this.createForm.dataLogin.email = value
    },
    updateFromFormPwd(value) {
      this.createForm.dataLogin.password = value
    },
    updateFromFormRPwd(value) {
      this.createForm.dataLogin.rePassword = value
    },
    handleProcessing(value) {
      this.processing = value
    },
    handleAlert(show, variant, message) {
      this.alert = { show: show, variant: variant, message: message }
    },
    async submitCreateUser() {
      this.handleProcessing(true)
      this.handleAlert(false, '', null)
      const isValid = UserServices.validatorCreateUser(this.createForm)
      if(!isValid.success) {
        this.handleProcessing(false)
        this.handleAlert(true, 'danger', isValid.message)
        setTimeout(() => this.handleAlert(false, '', null), 3000)
      } else {
        try {
          const creating = await UserServices.createUser(this.createForm)
          this.$bvToast.toast(`User ditambahkan ${creating}`, {
            title: 'MANAGEMENT USER',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          })
          setTimeout(() => {
            this.handleProcessing(false)
            this.createForm = {
              avatarFile: null,
              nik: null,
              fname: '',
              mname: '',
              lname: '',
              positionId: null,
              isActive: true,
              isAdmin: false,
              permissions: [],
              roles: [],
              user_id: null,
              user_unique_str: '',
              avatar: '',
              dataLogin: {
                email: '',
                password: '',
                rePassword: '',
                isActive: true,
                user_auth_id: null,
              },
            }
            this.previewAvatar = null
          }, 1000)
        } catch (error) {
          this.handleProcessing(false)
          this.handleAlert(true, 'danger', error.message || error)
          setTimeout(() => this.handleAlert(false, '', null), 3000)
        }
      }
    },
    cancelCreateUser() {
      this.$router.replace({name: 'management-user-dashboard'})
    },
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12" md="2"></b-col>
    <b-col cols="12" md="8">
      <b-card no-body>
        <div class="card-header">
          <b-card-title>Form Tambah User</b-card-title>
          <div v-if="processing">
            <b-spinner small class="mr-50"/>
            <span>Processing</span>
          </div>
        </div>
        <div class="card-body">
          <b-row>
            <!-- Alert Section -->
            <b-col cols="12" class="mb-50">
              <custom-alert :alert="alert"/>
            </b-col>
            <!-- End Alert Section -->
            <!-- Avatar Section -->
            <b-col cols="12">
              <h4>Avatar</h4>
              <form-avatar
                ref="formCreateUserAvatar"
                :avatarProps="{previewAvatar: null, avatarFile: createForm.avatarFile}"
                :processing="processing"
                @updateFormAvatar="updateFromFormAvatar"
              />
              <hr />
            </b-col>
            <!-- End Avatar Section -->
            <!-- General Info Section -->
            <b-col cols="12">
              <h4>General Info</h4>
              <b-form-checkbox
                id="frmUserIsActive"
                v-model="createForm.isActive"
                disabled
                switch
                :class="`custom-control-${processing ? 'secondary' : 'primary'}`"
                :style="{'marginTop': '0.75em;','marginBottom': '0.75em'}"
              />
              <form-fullname
                ref="formCreateUserFname"
                :asterisk="true"
                :processing="processing"
                :stringProp="createForm.fname"
                label="Fullname"
                @updateFormString="updateFromFormStringFname"
              />
              <form-nik
                ref="formCreateUserNik"
                :asterisk="true"
                :processing="processing"
                :numberProp="createForm.nik"
                label="NIK"
                @updateFormNumber="updateFormNumberUserNik"
              />
              <form-position
                ref="formCreateUserPosition"
                :processing="processing"
                :positionProp="createForm.positionId"
                @updateFormPositionId="updateFromFormPositionId"
              />
              <hr />
            </b-col>
            <!-- End General Info Section -->
            <!-- Auth Section -->
            <b-col cols="12">
              <h4>Otentikasi</h4>
              <b-form-checkbox
                id="frmUserIsCreateLogin"
                v-model="createForm.dataLogin.isActive"
                switch
                :class="`custom-control-${processing ? 'secondary' : 'primary'}`"
                :disabled="processing"
                :style="{'marginTop': '0.75em;','marginBottom': '0.75em'}"
              />
              <form-email
                ref="formCreateUserAuthEmail"
                :asterisk="true"
                :processing="processing"
                :stringProp="createForm.dataLogin.email"
                v-if="createForm.dataLogin.isActive"
                label="Email"
                @updateFormString="updateFromFormStringEmail"
              />
              <form-password
                ref="formCreateUserAuthPwd"
                v-if="createForm.dataLogin.isActive"
                :asterisk="true"
                :passwordProp="createForm.dataLogin.password"
                :processing="processing"
                @updateFormPassword="updateFromFormPwd"
                label="Password"
              />
              <form-password
                ref="formCreateUserAuthRPwd"
                v-if="createForm.dataLogin.isActive"
                :asterisk="true"
                :passwordProp="createForm.dataLogin.rePassword"
                :processing="processing"
                @updateFormPassword="updateFromFormRPwd"
                label="Konfirmasi Password"
              />
              <hr />
            </b-col>
            <!-- End Auth Section -->
            <!-- RolePermission Section -->
            <b-col cols="12">
              <h4>Role dan Izin</h4>
              <form-role
                :processing="processing"
                :roleProp="createForm.roles"
                :asterisk="false"
                @updateFormRole="updateFromFormRole"
              />
              <form-permission
                :processing="processing"
                :permissionProp="createForm.permissions"
                :asterisk="false"
                @updateFormPermission="updateFromFormPermission"
              />
              <hr />
            </b-col>
            <!-- End RolePermission Section -->
            <!-- Button Section -->
            <b-col cols="12" class="text-center" v-if="!processing">
              <b-button
                class="mr-50"
                variant="flat-primary"
                @click="submitCreateUser"
              >
                <iconify icon="tabler:circle-plus"/>
                <span class="ml-25">
                  Tambah
                </span>
              </b-button>
              <b-button
                class="mr-0"
                variant="flat-danger"
                @click="cancelCreateUser"
              >
                <iconify icon="tabler:circle-x"/>
                <span class="ml-25">
                  Kembali
                </span>
              </b-button>
            </b-col>
            <!-- End Button Section -->
          </b-row>
        </div>
      </b-card>
    </b-col>
    <b-col cols="12" md="2"></b-col>
  </b-row>
</template>

<style>

</style>