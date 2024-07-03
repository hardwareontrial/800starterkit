<script>
import {
  BRow, BCol, BCard, BAlert, BButton, BBadge,
  BTableSimple, BTbody, BTr, BTd,
  BAvatarGroup, BAvatar,
  BSpinner,
  VBTooltip,
} from 'bootstrap-vue'
import store from '@/store'
import CardViewEditComponent from '@/migis/modules/app/authorization/components/CardDetailUpdate.vue'
import FormGeneral from './components/FormRoleGeneral.vue'
import FormPermission from './components/FormPermission.vue'
import FormUser from './components/FormUser.vue'
import AuthorizationService from '@/migis/modules/app/authorization/services'
import AlertValidator from '@/migis/components/Alert.vue'

const _socket = store.state.migis.socket.socket

export default {
   components: {
    BRow, BCol, BCard, BAlert, BButton, BBadge,
    BTableSimple, BTbody, BTr, BTd,
    BAvatar,
    CardViewEditComponent,
    FormGeneral, FormPermission, FormUser,
    AlertValidator,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      processing: false,
      updateForm: {
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
      this.updateForm.name = value.name
      this.updateForm.description = value.description
    },
    updateFromFormPermission(value) {
      this.updateForm.permissions = value
    },
    updateFromFormUser(value) {
      this.updateForm.users = value
    },
    async submitUpdateRole() {
      this.handleProcessing(true)
      this.alertGenInfo = { show: false, variant: '', message: null }
      const isValid = AuthorizationService.validator(this.updateForm)
      if(!isValid.success) {
        this.handleProcessing(false)
        this.alertGenInfo = { show: true, variant: 'danger', message: isValid.message }
        setTimeout(() => this.alertGenInfo = { show: false, variant: '', message: null }, 3000)
      } else {
        try {
          const formUpdated = {
            id: this.updateForm.id,
            role_unique_str: this.updateForm.role_unique_str,
            name: this.updateForm.name,
            description: this.updateForm.description,
            roleUserId: this.updateForm.users,
            rolePermissionId: this.updateForm.permissions,
          }
          const updating = await AuthorizationService.updateRole(formUpdated)
          this.cancelEditGenInfo()
          this.cancelEditRolePermission()
          this.cancelEditRoleUser()
          this.handleProcessing(false)
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
    removeRole() {
      this.$swal({
        html: `
          <h4>Hapus role ${this.updateForm.name}?</h4>
          <small class="text-primary">Menghapus role ini akan berpengaruh kepada user terkait.</small>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-danger ml-1',
        },
      }).then(async input => {
        if(input.value){
          try {
            this.handleProcessing(true)
            const deleting = await AuthorizationService.deleteRole({unique: this.updateForm.role_unique_str})
            this.handleProcessing(false)
          } catch (error) {
            this.handleProcessing(false)
            this.$bvToast.toast(`${error.message || error}`, {
            title: 'Authorization',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'danger',
          })
          }
        }
      })
    },
    cancelEditGenInfo() {
      this.$refs.genInfoCardRoleditView.handleEditing(false)
    },
    cancelEditRolePermission() {
      this.$refs.permissionCardRoleditView.handleEditing(false)
    },
    cancelEditRoleUser() {
      this.$refs.userCardRoleditView.handleEditing(false)
    },
  },
  computed: {
    dataDetail() {
      const data = store.getters['migis/authorization/roleByUnique'](this.$route.params.unique)
      if(data) {
        const mappedUser = data.roleUsers.map(item => item.user_id)
        const mappedPermission = data.rolePermissions.map(item => item.id)
        this.updateForm = {
          id: data.id,
          role_unique_str: data.role_unique_str,
          name: data.name,
          description: data.description,
          users: mappedUser,
          permissions: mappedPermission,
        }
      }
      return data
    },
  },
  created() {
    this.$root.$on('authorizationRoleDetailProcessing', (value) => this.handleProcessing(value))
  },
  mounted() {
    _socket.on(`auth:role-${this.$route.params.unique}:updated`, async (data) => {
      await AuthorizationService.init()
      setTimeout(() => {
        this.$bvToast.toast(`Role ${data.name} berhasil diupdate.`, {
          title: 'Authorization',
          toaster: 'b-toaster-top-center',
          solid: false,
          variant: 'info',
        })
      },1000)
    });
    _socket.on(`auth:role-${this.$route.params.unique}:deleted`, async (data) => {
      await AuthorizationService.init()
      this.$bvToast.toast(`Role ini dihapus.`, {
        title: 'Authorization',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'info',
      })
      setTimeout(() => {
        this.$router.replace({name: 'authorization-role-dashboard'})
      },1000)
    });
  },
  beforeDestroy() {
    _socket.off(`auth:role-${this.$route.params.unique}:updated`)
    _socket.off(`auth:role-${this.$route.params.unique}:deleted`)
    this.$root.$off('authorizationRoleDetailProcessing')
  },
}
</script>

<template>
  <b-row>
    <!-- Alert Section  -->
    <b-col cols="12" v-if="!dataDetail">
      <b-alert
        show
        variant="danger"
      >
        <div class="alert-body">
          <iconify icon="tabler:alert-circle-filled" />
          <span class="ml-75">Role Not Found</span>
        </div>
      </b-alert>
    </b-col>
    <!-- End Alert Section  -->
    <!-- content section -->
    <b-col cols="12" md="6" v-if="dataDetail">
      <!-- general info -->
      <card-view-edit-component
        title="General Info"
        titleOnEditing="Edit Basic Info"
        ref="genInfoCardRoleditView"
        :processing="processing"
      >
        <template #contentView>
          <b-table-simple
            responsive
            striped
          >
            <b-tbody>
              <b-tr>
                <b-td width="250">Nama Role</b-td>
                <b-td>
                  {{ dataDetail.name }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Deskripsi</b-td>
                <b-td>
                  {{ dataDetail.description }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Jumlah Izin</b-td>
                <b-td>
                  {{ dataDetail.rolePermissions.length }} Izin
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Jumlah User</b-td>
                <b-td>
                  {{ dataDetail.roleUsers.length }} User
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Unique</b-td>
                <b-td>
                  {{ dataDetail.role_unique_str }}
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </template>
        <template #contentEdit>
          <alert-validator :alert="alertGenInfo"/>
          <form-general
            ref="genInfoRoleForm"
            :processing="processing"
            :generalProp="{name: dataDetail.name, description: dataDetail.description}"
            @updateFormRoleGeneral="updateFromFormRoleGeneral"
          />
          <b-row>
            <b-col cols="12" class="text-center" v-if="!processing">
              <b-button
                class="mr-50"
                variant="flat-primary"
                @click="submitUpdateRole"
              >
                <iconify icon="tabler:send" class="mr-50"/>
                <span>Update</span>
              </b-button>
              <b-button
                class="mr-50"
                variant="flat-danger"
                @click="cancelEditGenInfo"
              >
                <iconify icon="tabler:circle-x" class="mr-50"/>
                <span>Batal</span>
              </b-button>
            </b-col>
          </b-row>
        </template>
      </card-view-edit-component>
      <!-- Delete Role Button -->
      <b-button
        variant="danger"
        @click="removeRole"
      >
        <iconify icon="tabler:trash" class="mr-1"/>
        <span>Hapus Role ini</span>
      </b-button>
      <!-- End Delete Role Button -->
      <!-- end general info -->
    </b-col>
    <b-col cols="12" md="6" v-if="dataDetail">
      <b-row>
        <!-- Permission -->
        <b-col cols="12">
          <card-view-edit-component
            title="Terkait Izin"
            titleOnEditing="Ubah Izin"
            ref="permissionCardRoleditView"
            :processing="processing"
          >
            <template #contentView>
              <div
                v-if="dataDetail.rolePermissions.length > 0"
              >
                <b-badge
                  v-for="(permission, pIdx) in dataDetail.rolePermissions"
                  :key="pIdx"
                  class="mr-25"
                  variant="light-secondary"
                >
                  <iconify icon="tabler:lock" class="mr-25"/>
                  <span>{{ permission.text }}</span>
                </b-badge>
              </div>
              <span v-else>No Data!</span>
            </template>
            <template #contentEdit>
              <form-permission
                ref="permissionRoleForm"
                :processing="processing"
                :permissionProp="dataDetail.rolePermissions"
                @updateFormPermission="updateFromFormPermission"
              />
              <b-row>
                <b-col cols="12" class="text-center">
                  <b-button
                    class="mr-50"
                    variant="flat-primary"
                    @click="submitUpdateRole"
                  >
                    <iconify icon="tabler:send" class="mr-50"/>
                    <span>Update</span>
                  </b-button>
                  <b-button
                    class="mr-50"
                    variant="flat-danger"
                    @click="cancelEditRolePermission"
                  >
                    <iconify icon="tabler:circle-x" class="mr-50"/>
                    <span>Batal</span>
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </card-view-edit-component>
          <!-- end Permission -->
        </b-col>
        <b-col cols="12">
          <!-- user -->
          <card-view-edit-component
            title="Terkait User"
            titleOnEditing="Ubah User Terkait"
            ref="userCardRoleditView"
            :processing="processing"
          >
            <template #contentView>
              <div
                v-if="dataDetail.roleUsers.length > 0"
              >
                <!-- <b-avatar-group
                  class="mt-0 pt-0"
                  size="34px"
                  v-if="dataDetail.roleUsers.length > 0"
                > -->
                  <b-avatar
                    variant="light-primary"
                    v-for="(user, i) in dataDetail.roleUsers"
                    v-b-tooltip.hover
                    :key="i"
                    :title="user.fname"
                    :src="user.avatarlink"
                    class="mr-50 cursor-pointer"
                  />
                  <!-- <h6 class="align-self-center cursor-pointer ml-1 mb-0">
                    <span v-if="(dataDetail.roleUsers.length -3) > 0">+{{dataDetail.roleUsers.length -3}}</span>
                  </h6> -->
                <!-- </b-avatar-group> -->
              </div>
              <span v-else>No Data!</span>
            </template>
            <template #contentEdit>
              <form-user
                ref="userRoleForm"
                :processing="processing"
                :userProp="dataDetail.roleUsers"
                @updateFormUsers="updateFromFormUser"
              />
              <b-row>
                <b-col cols="12" class="text-center">
                  <b-button
                    class="mr-50"
                    variant="flat-primary"
                    @click="submitUpdateRole"
                  >
                    <iconify icon="tabler:send" class="mr-50"/>
                    <span>Update</span>
                  </b-button>
                  <b-button
                    class="mr-50"
                    variant="flat-danger"
                    @click="cancelEditRoleUser"
                  >
                    <iconify icon="tabler:circle-x" class="mr-50"/>
                    <span>Batal</span>
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </card-view-edit-component>
          <!-- end user -->
        </b-col>
      </b-row>
    </b-col>
    <!-- end content section -->
  </b-row>
</template>

<style>

</style>