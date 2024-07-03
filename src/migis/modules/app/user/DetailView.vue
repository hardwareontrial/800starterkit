<script>
import {
  BRow, BCol, BAlert, BTabs, BTab, BCard, BCardTitle, BSpinner, BFormCheckbox, BButton,
  BAvatar,
} from 'bootstrap-vue';
import store from '@/store';
import UserServices from '@/migis/modules/app/user/services'
import FormRole from '@/migis/components/Form/FormRoleList.vue'
import FormPermission from '@/migis/components/Form/FormPermissionList.vue'
import FormEmail from '@/migis/components/Form/FormString.vue'
import FormFullname from '@/migis/components/Form/FormString.vue'
import FormNik from '@/migis/components/Form/FormNumber.vue'
import FormPassword from '@/migis/components/Form/FormPassword.vue'
import FormPosition from '@/migis/components/Form/FormPositionList.vue'
import FormAvatar from '@/migis/components/Form/FormAvatar.vue'
import CustomAlert from '@/migis/components/Alert.vue'

export default {
  components: {
    BRow, BCol, BAlert, BTabs, BTab, BCard, BCardTitle, BSpinner, BFormCheckbox, BButton,
    BAvatar,
    FormRole, FormPermission, FormEmail, FormFullname, FormNik, FormPassword, FormPosition, FormAvatar,
    CustomAlert,
  },
  data() {
    return{
      // detailUser: null,
      updateForm: {
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
      editGenInfo: false,
      alertGenInfo: { show: false, variant: '', message: null },
    }
  },
  methods: {
    async getDetail() {
      try {
        // const response = await UserServices.detailUser({detailBy: 'id', params: this.$route.params.user_id})
        const response = await UserServices.detailUser({detailBy: 'unique', params: this.$route.params.unique})
        this.detailUser = response.data.data
      } catch (error) {
        throw error
      }
    },
    updateFromFormAvatar(value) { this.updateForm.avatarFile = value },
    updateFromFormRemoveAvatar(value) { this.previewAvatar = null; this.updateForm.avatar = value },
    updateFromFormStringFname(value) { this.updateForm.fname = value },
    updateFormNumberUserNik(value) { this.updateForm.nik = value },
    updateFromFormPositionId(value) { this.updateForm.positionId = value },
    updateFromFormEmail(value) { this.updateForm.dataLogin.email = value },
    updateFromFormPassword(value) { this.updateForm.dataLogin.password = value },
    updateFromFormRePassword(value) { this.updateForm.dataLogin.rePassword = value },
    updateFromFormRole(value) { this.updateForm.roles = value },
    updateFromFormPermission(value) { this.updateForm.permissions = value },
    handleProcessing(value) { this.processing = value },
    handleAlertGenInfo(show, variant, message) {
      this.alertGenInfo = { show: show, variant: variant, message: message }
    },
    async submitUpdateUser() {
      this.handleProcessing(true)
      this.handleAlertGenInfo(false, '', null)
      const isValid = UserServices.validatorUpdateUser(this.updateForm)
      if(!isValid.success) {
        this.handleProcessing(false)
        this.handleAlertGenInfo(true, 'danger', isValid.message)
        setTimeout(() => this.handleAlertGenInfo(false, '', null), 3000)
      }
      else {
        try {
          const response = await UserServices.updateUser(this.updateForm)
          this.$bvToast.toast(`${response.data.fname} diperbarui.`, {
            title: 'MANAGEMENT USER',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'info',
          });
          this.handleProcessing(false)
          this.handleAlertGenInfo(false, '', null)
        }
        catch (error) {
          this.handleProcessing(false)
          this.handleAlertGenInfo(true, 'danger', error || error.response.data.message)
          setTimeout(() => this.handleAlertGenInfo(false, '', null), 3000)
        }
      }
    },
    cancelUpdateUser() {
      this.$router.replace({name: 'management-user-dashboard'})
    },
  },
  computed: {
    detailUser() {
      const user = store.getters['migis/user/userDetailByUnique'](this.$route.params.unique)
      if(user) {
        // console.log(user)
        const mappedRoles = user.userRoles.map(item => item.id)
        const mappedPermissions = user.userPermissions.map(item => item.id)
        this.updateForm = {
          avatarFile: null,
          nik: user.nik,
          fname: user.fname,
          mname: user.mname,
          lname: user.lname,
          positionId: user.position_id,
          isActive: user.is_active == 1 ? true : false,
          isAdmin: user.is_admin,
          permissions: mappedPermissions,
          roles: mappedRoles,
          user_id: user.user_id,
          user_unique_str: user.user_unique_str,
          avatar: user.avatar ? user.avatar : '',
          dataLogin: {
            email: user.datalogin ? user.datalogin.email : '',
            password: '',
            rePassword: '',
            isActive: user.datalogin ? (user.datalogin.is_active == 1 ? true : false) : false,
            user_auth_id: user.datalogin ? user.datalogin.user_auth_id : null ,
          },
        }
        this.previewAvatar = user.avatarlink
      }
      return user
    },
  },
  async beforeCreate() {
    await UserServices.getUsers()
    // await this.getDetail()
  },
  beforeDestroy() {
    this.$store.commit('migis/user/SET_USERS', [], {root: true})
  },
}
</script>

<template>
  <b-row>
    <!-- Alert -->
    <b-col cols="12" v-if="!detailUser">
      <b-alert
        variant="danger"
        show
      >
        <div class="alert-body">
          <iconify icon="tabler:alert-circle"/>
          <span> Data not found!</span>
        </div>
      </b-alert>
    </b-col>
    <!-- End Alert -->

    <!-- Content -->
    <b-col cols="12" v-if="detailUser">
      <b-tabs
        pills
        justified
      >
        <!-- General Info -->
        <b-tab
          active
        >
          <template #title>
            <iconify icon="tabler:info-circle" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">General Info</span>
          </template>
          <div>
            <!-- General Info View -->
            <!-- <b-card no-body>
              <div class="card-header">
                <b-card-title>General Info</b-card-title>
                <div v-if="processing">
                  <b-spinner small class="mr-50"/>
                  <span>Processing</span>
                </div>
              </div>
              <div class="card-body">
                <b-row>
                  <b-col cols="12" xl="4" class="d-flex justify-content-between flex-column">
                    <div class="d-flex justify-content-start">
                      <b-avatar
                        :src="detailUser.avatarlink"
                        variant="light-danger"
                        size="104px"
                        rounded
                      />
                      <div class="d-flex flex-column ml-1">
                        <div class="mb-1">
                          <h3 class="mb-1">
                            {{ detailUser.fname }}
                          </h3>
                          <span class="card-text">{{ detailUser.position_id ? detailUser.position.name : 'N/A' }}</span> <br />
                          <span class="card-text">{{ detailUser.position_id ? detailUser.position.deptname.name : 'N/A' }}</span>
                        </div>
                      </div>
                    </div>
                  </b-col>
                  <b-col cols="12" xl="8">
                    <table class="mt-1 mt-xl-0 w-100">
                      <tr v-if="detailUser.datalogin">
                        <th class="pb-50">
                          <iconify icon="tabler:user-share" class="mr-75"/>
                          <span class="font-weight-bold d-none d-sm-inline">Username</span>
                        </th>
                        <td class="pb-50">
                          {{ detailUser.datalogin ? `${detailUser.datalogin.email} | ${detailUser.datalogin.nik} | ${detailUser.datalogin.s_nik}` : 'N/A' }}
                        </td>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <iconify :icon="`tabler:${detailUser.is_active == 1 ? 'user-check' : 'user-x'}`" class="mr-75"/>
                          <span class="font-weight-bold d-none d-sm-inline">Status</span>
                        </th>
                        <td class="pb-50 text-capitalize">
                          {{ detailUser.is_active == 1 ? 'Active' : 'Inactive' }}
                        </td>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <iconify :icon="`tabler:${detailUser.datalogin ? 'device-ipad-horizontal-check' : 'device-ipad-horizontal-cancel'}`" class="mr-75"/>
                          <span class="font-weight-bold d-none d-sm-inline">Authentication</span>
                        </th>
                        <td class="pb-50 text-capitalize">
                          {{ detailUser.datalogin ? 'Yes' : 'No' }}
                        </td>
                      </tr>
                      <tr v-if="detailUser.datalogin">
                        <th class="pb-50">
                          <iconify :icon="`tabler:${detailUser.datalogin.is_active ? 'checks' : 'forbid-2'}`" class="mr-75"/>
                          <span class="font-weight-bold d-none d-sm-inline">Status Authentication</span>
                        </th>
                        <td class="pb-50 text-capitalize">
                          {{ detailUser.datalogin.is_active ? 'Active' : 'Forbidden' }}
                        </td>
                      </tr>
                      <tr>
                        <th class="pb-50">
                          <iconify icon="tabler:shield" class="mr-75"/>
                          <span class="font-weight-bold d-none d-sm-inline">Role</span>
                        </th>
                        <td class="pb-50 text-capitalize">
                          {{ detailUser.userRoles.length > 0 ? detailUser.userRoles.slice(0,3).map(item => item.name).join(', ') : 'N/A'}}
                          {{ detailUser.userRoles.length > 3 ? `, +${detailUser.userRoles.length -3} more` : '' }}
                        </td>
                      </tr>
                    </table>
                  </b-col>
                </b-row>
              </div>
            </b-card> -->

            <b-card no-body>
              <div class="card-header">
                <b-card-title>Form General Info</b-card-title>
                <div v-if="processing">
                  <b-spinner small class="mr-50"/>
                  <span>Processing</span>
                </div>
              </div>
              <div class="card-body">
                <b-row>
                  <b-col cols="12">
                    <custom-alert :alert="alertGenInfo"/>
                  </b-col>
                  <b-col cols="12">
                    <h6>Status Aktif</h6>
                    <b-form-checkbox
                      id="frmUserIsActive"
                      v-model="updateForm.isActive"
                      switch
                      :class="`custom-control-${processing ? 'secondary' : 'primary'}`"
                      :style="{'marginTop': '0.75em;','marginBottom': '0.75em'}"
                    />
                  </b-col>
                  <b-col cols="12">
                    <h6>Avatar</h6>
                    <form-avatar
                      ref="formUpdateUserAvatar"
                      :avatarProps="{previewAvatar: previewAvatar, avatarFile: updateForm.avatarFile}"
                      :processing="processing"
                      :preview="previewAvatar"
                      @updateFormAvatar="updateFromFormAvatar"
                      @updateFormRemoveAvatar="updateFromFormRemoveAvatar"
                      class="mb-75"
                    />
                  </b-col>
                  <b-col cols="12" lg="4">
                    <form-nik
                      ref="formCreateUserNik"
                      :asterisk="true"
                      :processing="processing"
                      :numberProp="updateForm.nik"
                      label="NIK"
                      @updateFormNumber="updateFormNumberUserNik"
                    />
                  </b-col>
                  <b-col cols="12" lg="4">
                    <form-fullname
                      ref="formCreateUserFname"
                      :asterisk="true"
                      :processing="processing"
                      :stringProp="updateForm.fname"
                      label="Fullname"
                      @updateFormString="updateFromFormStringFname"
                    />
                  </b-col>
                  <b-col cols="12" lg="4">
                    <form-position
                      ref="formCreateUserPosition"
                      :processing="processing"
                      :positionProp="updateForm.positionId"
                      @updateFormPositionId="updateFromFormPositionId"
                    />
                  </b-col>
                  <b-col cols="12" class="text-center" v-if="!processing">
                    <hr />
                    <b-button
                      variant="flat-primary"
                      class="mt-50"
                      @click="submitUpdateUser"
                    >
                      <iconify icon="tabler:send" class="mr-50"/>
                      <span>Update</span>
                    </b-button>
                    <b-button
                      variant="flat-danger"
                      class="mt-50"
                      @click="cancelUpdateUser"
                    >
                      <iconify icon="tabler:circle-x" class="mr-50"/>
                      <span>Kembali</span>
                    </b-button>
                  </b-col>
                </b-row>
              </div>
            </b-card>
          </div>
        </b-tab>
        <!-- Otentikasi -->
        <b-tab>
          <template #title>
            <iconify icon="tabler:login-2" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Otentikasi</span>
          </template>
          <b-card no-body>
            <div class="card-header">
              <b-card-title>Otentikasi</b-card-title>
              <div v-if="processing">
                <b-spinner small class="mr-50"/>
                <span>Processing</span>
              </div>
            </div>
            <div class="card-body">
              <b-row v-if="updateForm.isActive">
                <b-col cols="12"></b-col>
                <b-col cols="12">
                  <h6>{{ updateForm.dataLogin.user_auth_id ? 'Status Aktif' : 'Tersedia' }}</h6>
                  <b-form-checkbox
                    id="frmUserAuthIsActive"
                    v-model="updateForm.dataLogin.isActive"
                    switch
                    :class="`custom-control-${processing ? 'secondary' : 'primary'}`"
                    :style="{'marginTop': '0.75em;','marginBottom': '0.75em'}"
                  />
                </b-col>
                <b-col cols="12" lg="4" v-if="updateForm.dataLogin.isActive">
                  <form-email
                    label="Email"
                    :asterisk="true"
                    :processing="processing"
                    :stringProp="updateForm.dataLogin.email"
                    @updateFormString="updateFromFormEmail"
                  />
                </b-col>
                <b-col cols="12" lg="4" v-if="updateForm.dataLogin.isActive">
                  <form-password
                    :label="updateForm.dataLogin.user_auth_id ? 'Ganti Password' : 'Password'"
                    :asterisk="true"
                    :processing="processing"
                    :passwordProp="updateForm.dataLogin.password"
                    @updateFormPassword="updateFromFormPassword"
                  />
                </b-col>
                <b-col cols="12" lg="4" v-if="updateForm.dataLogin.isActive">
                  <form-password
                    label="Konfirmasi Password"
                    :asterisk="true"
                    :processing="processing"
                    :passwordProp="updateForm.dataLogin.repassword"
                    @updateFormPassword="updateFromFormRePassword"
                  />
                </b-col>
                <b-col cols="12" class="text-center" v-if="!processing">
                  <hr />
                  <b-button
                    variant="flat-primary"
                    class="mt-50"
                    @click="submitUpdateUser"
                  >
                    <iconify icon="tabler:send" class="mr-50"/>
                    <span>Update</span>
                  </b-button>
                  <b-button
                    variant="flat-danger"
                    class="mt-50"
                    @click="cancelUpdateUser"
                  >
                    <iconify icon="tabler:circle-x" class="mr-50"/>
                    <span>Kembali</span>
                  </b-button>
                </b-col>
              </b-row>
              <b-row v-else>
                <b-col cols="12">
                  <b-alert show variant="primary">
                    <div class="alert-body">
                      <iconify icon="tabler:info-circle" class="mr-50"/>
                      <span>User not active. Please activate user first to create/update this information.</span>
                    </div>
                  </b-alert>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-tab>
        <!-- Role Permissions -->
        <b-tab>
          <template #title>
            <iconify icon="tabler:shield-lock" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Role & Izin</span>
          </template>
          <b-card no-body>
            <div class="card-header">
              <b-card-title>Role & Izin</b-card-title>
              <div v-if="processing">
                <b-spinner small class="mr-50"/>
                <span>Processing</span>
              </div>
            </div>
            <div class="card-body">
              <b-row v-if="updateForm.isActive">
                <b-col cols="12">
                  <form-role
                    :processing="processing"
                    :asterisk="false"
                    :roleProp="updateForm.roles"
                    @updateFormRole="updateFromFormRole"
                  />
                </b-col>
                <b-col cols="12">
                  <form-permission
                    :processing="processing"
                    :asterisk="false"
                    :permissionProp="updateForm.permissions"
                    @updateFormPermission="updateFromFormPermission"
                  />
                </b-col>
                <b-col cols="12" class="text-center" v-if="!processing">
                  <hr />
                  <b-button
                    variant="flat-primary"
                    class="mt-50"
                    @click="submitUpdateUser"
                  >
                    <iconify icon="tabler:send" class="mr-50"/>
                    <span>Update</span>
                  </b-button>
                  <b-button
                    variant="flat-danger"
                    class="mt-50"
                    @click="cancelUpdateUser"
                  >
                    <iconify icon="tabler:circle-x" class="mr-50"/>
                    <span>Kembali</span>
                  </b-button>
                </b-col>
              </b-row>
              <b-row v-else>
                <b-col cols="12">
                  <b-alert show variant="primary">
                    <div class="alert-body">
                      <iconify icon="tabler:info-circle" class="mr-50"/>
                      <span>User not active. Please activate user first to update their authorization.</span>
                    </div>
                  </b-alert>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-tab>
        <!-- Logs -->
        <b-tab>
          <template #title>
            <iconify icon="tabler:logs" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Logs</span>
          </template>
          <b-card no-body>
            <div class="card-header">
              <b-card-title>Logs</b-card-title>
              <div v-if="processing">
                <b-spinner small class="mr-50"/>
                <span>Processing</span>
              </div>
            </div>
            <div class="card-body">
              <b-alert variant="secondary" :show="true">
                <div class="alert-body">
                  <iconify icon="tabler:info-circle" class="mr-50"/>
                  <span>Under Construction</span>
                </div>
              </b-alert>
            </div>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-col>
    <!-- End Content -->
  </b-row>
</template>

<style>

</style>