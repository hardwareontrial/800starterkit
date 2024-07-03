<script>
import store from '@/store'
import {
  BRow, BCol, BAlert, BButton, BBadge, BAvatar,
  BTableSimple, BTbody, BTr, BTd,
  VBTooltip,
} from 'bootstrap-vue'
import CardViewEditComponent from '@/migis/modules/app/authorization/components/CardDetailUpdate.vue'
import AlertValidator from '@/migis/components/Alert.vue'
import FormGeneral from './components/FormPermissionGeneral.vue'
import FormUser from './components/FormUser.vue'
import FormRole from './components/FormRole.vue'
import AuthorizationService from '@/migis/modules/app/authorization/services'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    BRow, BCol, BAlert, BButton, BBadge, BAvatar,
    BTableSimple, BTbody, BTr, BTd,
    CardViewEditComponent, AlertValidator, FormGeneral, FormUser, FormRole,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return{
      updateForm: {
        id: null,
        permission_unique_str: '',
        name: '',
        text: '',
        description: '',
        users: [],
        roles: [],
      },
      alertGenInfo: { show: false, variant: '', message: null },
      processing: false,
    }
  },
  methods: {
    handleProcessing(value) { this.processing = value },
    handleAlertGenInfo(show, variant, message) { this.alertGenInfo = {show: show, variant: variant, message: message} },
    updateFromFormPermissionGeneral(value) {
      this.updateForm.text = value.text
      this.updateForm.description = value.description
    },
    updateFromFormRole(value) {
      this.updateForm.roles = value
    },
    updateFromFormUsers(value) {
      this.updateForm.users = value
    },
    cancelUpdateUserPermission() {
      this.$refs.userCardPermissionEditView.handleEditing(false)
    },
    cancelUpdatePermissionGenInfo() {
      this.$refs.genInfoCardPermissionEditView.handleEditing(false)
    },
    cancelUpdateRolePermission() {
      this.$refs.roleCardPermissionEditView.handleEditing(false)
    },
    async submitUpdatePermission() {
      this.handleAlertGenInfo(false, '', null)
      this.handleProcessing(true)
      const isValid = AuthorizationService.permissionValidator(this.updateForm)
      if(!isValid.success) {
        this.handleProcessing(false)
        this.handleAlertGenInfo(true, 'danger', isValid.message)
        setTimeout(() => this.handleAlertGenInfo(false, '', null), 3000)
      } else {
        try {
          const formUpdated = {
            id: this.updateForm.id,
            permission_unique_str: this.updateForm.permission_unique_str,
            name: this.updateForm.name,
            text: this.updateForm.text,
            description: this.updateForm.description,
            permissionUsers: this.updateForm.users,
            permissionRoles: this.updateForm.roles,
          }
          const updating = await AuthorizationService.updatePermission(formUpdated)
          this.cancelUpdateUserPermission()
          this.cancelUpdatePermissionGenInfo()
          this.cancelUpdateRolePermission()
          this.handleProcessing(false)
        } catch (error) {
          console.log(error)
          this.handleProcessing(false)
          this.handleAlertGenInfo(true, 'danger', error.message || error)
          setTimeout(() => this.handleAlertGenInfo(false, '', null), 3000)
          this.$bvToast.toast(`${error.message || error}`, {
            title: 'Authorization',
            toaster: 'b-toaster-top-center',
            solid: false,
            variant: 'danger',
          })
        }
      }
    },
  },
  computed: {
    permissionDetail() {
      const data = store.getters['migis/authorization/permissionByUnique'](this.$route.params.unique)
      if(data) {
        const mappedUser = data.permissionUsers.map(item => item.user_id)
        const mappedRoles = data.permissionRoles.map(item => item.id)
        this.updateForm = {
          id: data.id,
          permission_unique_str: data.permission_unique_str,
          name: data.name,
          text: data.text,
          description: data.description,
          users: mappedUser,
          roles: mappedRoles,
        }
      }
      return data
    },
  },
  created() {
    this.$root.$on('authorizationPermissionDetailProcessing', (value) => this.handleProcessing(value))
  },
  mounted() {
    _socket.on(`auth:permission-${this.$route.params.unique}:updated`, async (data) => {
      await AuthorizationService.init()
      setTimeout(() => {
        this.$bvToast.toast(`Izin berhasil diupdate.`, {
          title: 'Authorization',
          toaster: 'b-toaster-top-center',
          solid: false,
          variant: 'info',
        })
      },1000)
    })
  },
  beforeDestroy() {
    _socket.off(`auth:permission-${this.$route.params.unique}:updated`)
    this.$root.$off('authorizationPermissionDetailProcessing')
  },
}
</script>

<template>
  <b-row>
    <!-- Alert Section -->
    <b-col cols="12" v-if="!permissionDetail">
      <b-alert
        show
        variant="danger"
      >
        <div class="alert-body">
          <iconify icon="tabler:alert-circle-filled" />
          <span class="ml-75">Permission Not Found</span>
        </div>
      </b-alert>
    </b-col>
    <!-- End Alert Section -->
    <!-- Content Section -->
    <b-col cols="12" md="6"  v-if="permissionDetail">
      <!-- General Info -->
      <card-view-edit-component
        title="General Info"
        titleOnEditing="Edit Basic Info"
        ref="genInfoCardPermissionEditView"
        :processing="processing"
      >
        <template #contentView>
          <b-table-simple
            responsive
            striped
          >
            <b-tbody>
              <b-tr>
                <b-td width="250">Teks</b-td>
                <b-td>
                  {{ permissionDetail.text }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Nama Izin</b-td>
                <b-td>
                  {{ permissionDetail.name }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Deskripsi</b-td>
                <b-td>
                  {{ permissionDetail.description }}
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Jumlah Role</b-td>
                <b-td>
                  {{ permissionDetail.permissionRoles.length }} Terkait
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Jumlah User</b-td>
                <b-td>
                  {{ permissionDetail.permissionUsers.length }} User
                </b-td>
              </b-tr>
              <b-tr>
                <b-td width="250">Unique</b-td>
                <b-td>
                  {{ permissionDetail.permission_unique_str }}
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </template>
        <template #contentEdit>
          <b-row>
            <b-col cols="12">
              <alert-validator :alert="alertGenInfo"/>
            </b-col>
            <b-col cols="12">
              <form-general
                ref="genInfoPermissionForm"
                :processing="processing"
                :generalProp="{text: permissionDetail.text, description: permissionDetail.description}"
                @updateFormPermissionGeneral="updateFromFormPermissionGeneral"
              />
            </b-col>
            <b-col cols="12" class="text-center" v-if="!processing">
              <b-button
                class="mr-50"
                variant="flat-primary"
                @click="submitUpdatePermission"
              >
                <iconify icon="tabler:send" class="mr-50"/>
                <span>Update</span>
              </b-button>
              <b-button
                class="mr-50"
                variant="flat-danger"
                @click="cancelUpdatePermissionGenInfo"
              >
                <iconify icon="tabler:circle-x" class="mr-50"/>
                <span>Batal</span>
              </b-button>
            </b-col>
          </b-row>
        </template>
      </card-view-edit-component>
      <!-- End General Info -->
    </b-col>
    <b-col cols="12" md="6" v-if="permissionDetail">
      <b-row>
        <!-- Role Section -->
        <b-col cols="12">
          <card-view-edit-component
            title="Terkait Role"
            titleOnEditing="Update Role Terkait"
            ref="roleCardPermissionEditView"
            :processing="processing"
          >
            <template #contentView>
              <div v-if="permissionDetail.permissionRoles.length > 0">
                <b-badge
                  v-for="(role, rindx) in permissionDetail.permissionRoles"
                  :key="rindx"
                  class="mr-25"
                  variant="light-secondary"
                >
                  <iconify icon="tabler:lock" class="mr-50"/>
                  <span>{{ role.name }}</span>
                </b-badge>
              </div>
              <div v-else>
                No Data!
              </div>
            </template>
            <template #contentEdit>
              <b-row>
                <b-col cols="12">
                  <form-role
                    ref="rolePermissionForm"
                    :processing="processing"
                    :roleProp="permissionDetail.permissionRoles"
                    @updateFormRole="updateFromFormRole"
                  />
                </b-col>
                <b-col cols="12" class="text-center" v-if="!processing">
                  <b-button
                    class="mr-50"
                    variant="flat-primary"
                    @click="submitUpdatePermission"
                  >
                    <iconify icon="tabler:send" class="mr-50"/>
                    <span>Update</span>
                  </b-button>
                  <b-button
                    class="mr-50"
                    variant="flat-danger"
                    @click="cancelUpdateRolePermission"
                  >
                    <iconify icon="tabler:circle-x" class="mr-50"/>
                    <span>Batal</span>
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </card-view-edit-component>
        </b-col>
        <!-- End Role Section -->
        <!-- User Section -->
        <b-col cols="12">
          <card-view-edit-component
            title="Terkait User"
            titleOnEditing="Update User Terkait"
            ref="userCardPermissionEditView"
            :processing="processing"
          >
            <template #contentView>
              <div v-if="permissionDetail.permissionUsers.length > 0">
                <b-avatar
                  variant="light-primary"
                  v-for="(user, i) in permissionDetail.permissionUsers"
                  v-b-tooltip.hover
                  :key="i"
                  :title="user.fname"
                  :src="user.avatarlink"
                  class="mr-50 cursor-pointer"
                />
              </div>
              <div v-else>
                No Data!
              </div>
            </template>
            <template #contentEdit>
              <b-row>
                <b-col cols="12">
                  <form-user
                    ref="permissionUserForm"
                    :processing="processing"
                    :userProp="permissionDetail.permissionUsers"
                    @updateFormUsers="updateFromFormUsers"
                  />
                </b-col>
                <b-col cols="12" class="text-center" v-if="!processing">
                  <b-button
                    class="mr-50"
                    variant="flat-primary"
                    @click="submitUpdatePermission"
                  >
                    <iconify icon="tabler:send" class="mr-50"/>
                    <span>Update</span>
                  </b-button>
                  <b-button
                    class="mr-50"
                    variant="flat-danger"
                    @click="cancelUpdateUserPermission"
                  >
                    <iconify icon="tabler:circle-x" class="mr-50"/>
                    <span>Batal</span>
                  </b-button>
                </b-col>
              </b-row>
            </template>
          </card-view-edit-component>
        </b-col>
        <!-- End User Section -->
      </b-row>
    </b-col>
    <!-- End Content Section -->
  </b-row>
</template>

<style>

</style>