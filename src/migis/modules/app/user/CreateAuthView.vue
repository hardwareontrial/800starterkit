<script>
import {
  BCard, BRow, BCol, BButton, BSpinner, BCardTitle, BFormGroup, BFormCheckbox,
} from 'bootstrap-vue'
import FormEmail from '@/migis/components/Form/FormString.vue'
import FormPassword from '@/migis/components/Form/FormPassword.vue'
import FormRole from '@/migis/components/Form/FormRoleList.vue'
import FormPermission from '@/migis/components/Form/FormPermissionList.vue'
import store from '@/store'
import UserServices from '@/migis/modules/app/user/services'
import vSelect from 'vue-select'
import CustomAlert from '@/migis/components/Alert.vue'
import AuthorizationServices from '@/migis/modules/app/authorization/services'
import FormUserNoAuth from './components/FormUserNoAuth.vue'

export default {
  components: {
    BCard, BRow, BCol, BButton, BSpinner, BCardTitle, BFormGroup, BFormCheckbox,
    FormEmail, FormPassword, FormRole, FormPermission, CustomAlert, FormUserNoAuth,
    vSelect,
  },
  data() {
    return{
      createAuth: {
        user_id: null,
        nik: null,
        permissions: [],
        roles: [],
        dataLogin: {
          email: '',
          password: '',
          rePassword: '',
          isActive: true,
          user_auth_id: '',
        },
      },
      userData: null,
      processing: false,
      alertUserAuth: { show: false, variant: '', message: null },
    }
  },
  methods: {
    updateFromFormStringEmail(value) { this.createAuth.dataLogin.email = value },
    updateFromFormPwd(value) { this.createAuth.dataLogin.password = value },
    updateFromFormRPwd(value) { this.createAuth.dataLogin.rePassword = value },
    updateFromFormRole(value) { this.createAuth.roles = value },
    updateFromFormPermission(value) { this.createAuth.password = value },
    updateFromFormUsersNoAuth(value) {
      if(value) {
        this.createAuth.user_id = value.user_id
        this.createAuth.nik = value.nik
      }else{
        this.createAuth.user_id = null
        this.createAuth.nik = null
      }
    },
    handleProcessing(value) { this.processing = value },
    handleAlert(show, variant, message) {
      this.alertUserAuth = { show: show, variant: variant, message: message }
    },
    async submitCreateUserAuth() {
      this.handleProcessing(true)
      this.handleAlert(false, '', null)
      const isValid = AuthorizationServices.validatorUserAuth(this.createAuth)
      if(!isValid.success) {
        this.handleProcessing(false)
        this.handleAlert(true, 'danger', isValid.message)
        setTimeout(() => this.handleAlert(false, '', null), 3000)
      } else {
        try {
          const creating = await AuthorizationServices.createUserAuth(this.createAuth)
          this.$bvToast.toast(`User Otentikasi Berhasil Dibuat`, {
            title: 'MANAGEMENT USER',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'success',
          });
          await UserServices.getUsers();
          this.handleProcessing(false)
          this.createAuth = {
            user_id: null,
            nik: null,
            permissions: [],
            roles: [],
            dataLogin: {
              email: '',
              password: '',
              rePassword: '',
              isActive: true,
              user_auth_id: '',
            }
          };
          this.$refs.formUserNoAuthSelect.resetForm();
        } catch (error) {
          this.handleProcessing(false)
          this.handleAlert(true, 'danger', error.message || error)
          setTimeout(() => this.handleAlert(false, '', null), 3000)
        }
      }
    },
    cancelCreateUserAuth() {
      this.$router.replace({name: 'management-user-dashboard'})
    },
  },
  computed: {
    usersList() {
      return store.getters['migis/user/usersNoAuth']
    },
  },
  async beforeCreate() {
    await UserServices.getUsers()
  },
  beforeDestroy() {
    this.$store.commit('migis/user/SET_USERS', [], {root: true})
  },
}
</script>

<template>
  <b-row>

    <!-- Select User Card -->
    <b-col cols="12">
      <b-row>
        <b-col cols="12" md="2"></b-col>
        <b-col cols="12" md="8">
          <b-card no-body>
            <div class="card-header">
              <b-card-title>Pilih User</b-card-title>
              <div v-if="processing">
                <b-spinner small class="mr-50"/>
                <span>Processing</span>
              </div>
            </div>
            <div class="card-body">
              <b-row>
                <b-col cols="12">
                  <form-user-no-auth
                    ref="formUserNoAuthSelect"
                    :processing="processing"
                    :userProp="userData"
                    :asterisk="true"
                    @updateFormUsersNoAuth="updateFromFormUsersNoAuth"
                  />
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
    <!-- End Select User Card -->

    <!-- Form Card -->
    <b-col cols="12">
      <b-row v-if="createAuth.user_id">
        <b-col cols="12" md="2"></b-col>
        <b-col cols="12" md="8">
          <b-card no-body>
            <div class="card-header">
              <b-card-title>Form Otentikasi</b-card-title>
              <div v-if="processing">
                <b-spinner small class="mr-50"/>
                <span>Processing</span>
              </div>
            </div>
            <div class="card-body">
              <b-row>
                 <!-- Alert Section -->
                <b-col cols="12" class="mb-50">
                  <custom-alert :alert="alertUserAuth"/>
                </b-col>
                <!-- End Alert Section -->
                <b-col cols="12">
                  <h4>General Info</h4>
                  <b-form-checkbox
                    id="frmUserIsCreateLogin"
                    v-model="createAuth.dataLogin.isActive"
                    switch
                    disabled
                    :class="`custom-control-${processing ? 'secondary' : 'primary'}`"
                    :style="{'marginTop': '0.75em;','marginBottom': '0.75em'}"
                  />
                  <form-email
                    ref="formCreateUserAuthEmail"
                    :asterisk="true"
                    :processing="processing"
                    :stringProp="createAuth.dataLogin.email"
                    label="Email"
                    @updateFormString="updateFromFormStringEmail"
                  />
                  <form-password
                    ref="formCreateUserAuthPwd"
                    :asterisk="true"
                    :passwordProp="createAuth.dataLogin.password"
                    :processing="processing"
                    @updateFormPassword="updateFromFormPwd"
                    label="Password"
                  />
                  <form-password
                    ref="formCreateUserAuthRPwd"
                    :asterisk="true"
                    :passwordProp="createAuth.dataLogin.rePassword"
                    :processing="processing"
                    @updateFormPassword="updateFromFormRPwd"
                    label="Konfirmasi Password"
                  />
                  <hr />
                </b-col>
                <b-col cols="12">
                  <h4>Role dan Izin</h4>
                  <form-role
                    :processing="processing"
                    :roleProp="createAuth.roles"
                    :asterisk="false"
                    @updateFormRole="updateFromFormRole"
                  />
                  <form-permission
                    :processing="processing"
                    :permissionProp="createAuth.permissions"
                    :asterisk="false"
                    @updateFormPermission="updateFromFormPermission"
                  />
                  <hr />
                </b-col>
                <b-col cols="12" class="text-center">
                  <b-button
                    class="mr-50"
                    variant="flat-primary"
                    @click="submitCreateUserAuth"
                  >
                    <iconify icon="tabler:circle-plus"/>
                    <span class="ml-25">
                      Tambah
                    </span>
                  </b-button>
                  <b-button
                    class="mr-0"
                    variant="flat-danger"
                    @click="cancelCreateUserAuth"
                  >
                    <iconify icon="tabler:circle-x"/>
                    <span class="ml-25">
                      Batal
                    </span>
                  </b-button>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
    <!-- End Form Card -->
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>