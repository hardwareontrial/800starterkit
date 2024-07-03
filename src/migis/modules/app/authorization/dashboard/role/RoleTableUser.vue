<script>
import {
  BRow, BCol, BCard, BCardText, BFormInput,
  BTable, BBadge, BPagination, BButton,
} from 'bootstrap-vue'
import store from '@/store'
import vSelect from 'vue-select'

export default {
  components: {
    BRow, BCol, BCard, BCardText, vSelect, BFormInput,
    BTable, BBadge, BPagination, BButton,
  },
  data() {
    return {
      limitOptions: [
        { value: 5, text: 5 },
        { value: 10, text: 10 },
        { value: 15, text: 15 },
      ],
      limit: 5,
      query: '',
      current_page: 1,
      selectedRole: null,
      tableFields: [
        {label: 'User', key: 'user', thStyle: { width: "20%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Posisi', key: 'position',  thStyle: { width: "20%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Role', key: 'role',  thStyle: { width: "" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Status', key: 'status',  thStyle: { width: "10%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Opsi', key: 'opt',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      badgesPosition: [
        { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 },
        { 1: 'secondary', 2: 'danger', 3: 'warning', 4: 'success', 5: 'primary', 6: 'primary' },
      ],
    }
  },
  methods: {
    handleLimit(value) { this.limit = value },
    handleQuery(value) { setTimeout(() => this.query = value, 750) },
    handlePage(value) { this.current_page = value },
    editingUserRole(value) { this.$root.$emit('showAuthRoleUserModal', value) },
  },
  computed: {
    dataUsers() {
      return store.getters['migis/authorization/usersListForRole'](this.selectedRole, this.current_page, this.limit, this.query)
    },
    rolesList() {
      return store.state.migis.authorization.roles
    },
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <h3>Tabel User Berdasar Role</h3>
    </b-col>
    <b-col cols="12">
      <b-card no-body class="mb-0">
        <div class="m-2">
          <b-row>
            <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
              <label>Limit</label>
              <v-select
                v-model="limit"
                label="text"
                :reduce="text => text.value"
                :options="limitOptions"
                :clearable="false"
                class="per-page-selector d-inline-block mx-50"
              />
              <label>Items</label>
            </b-col>
            <b-col cols="12" md="6">
              <div class="d-flex align-items-center justify-content-end">
                <v-select
                  v-model="selectedRole"
                  label="name"
                  class="mr-1 w-50"
                  placeholder="Filter Role"
                  :reduce="name => name.role_unique_str"
                  :options="rolesList"
                  :clearable="true"
                />
                <b-form-input
                  v-model="query"
                  class="d-inline-block"
                  placeholder="Cari nama..."
                />
              </div>
            </b-col>
          </b-row>
        </div>
        <b-table
          ref="refUserRoleTable"
          class="position-relative"
          responsive
          primary-key="id"
          show-empty
          empty-text="No Data"
          :items="dataUsers.items"
          :fields="tableFields"
        >
          <template #cell(user)="data">
            <span>{{data.item.fname}}</span><br/>
            <span class="text-muted">{{data.item.nik ? data.item.nik : '-'}}</span>
          </template>

          <template #cell(position)="data">
            <b-badge
              :variant="`light-${badgesPosition[1][data.item.position.level]}`"
              v-if="data.item.position_id"
            >
              {{data.item.position.name}}
            </b-badge>
          </template>

          <template #cell(role)="data">
            <b-badge
              v-for="(role, roleidx) in data.item.userRoles"
              :key="roleidx"
              variant="light-secondary"
              class="mr-25"
            >
              {{role.name}}
            </b-badge>
          </template>

          <template #cell(status)="data">
            <b-badge
              :variant="`light-${data.item.is_active === 1 ? 'success' : 'secondary'}`"
              pill
            >
              {{data.item.is_active === 1 ? 'Active' : 'Inactive'}}
            </b-badge>
          </template>

          <template #cell(opt)="data">
            <b-button
              variant="flat-success"
              class="btn-icon rounded-circle"
              @click="editingUserRole(data.item)"
            >
              <iconify icon="tabler:pencil" />
            </b-button>
          </template>
        </b-table>
        <b-row class="m-1">
          <b-col
            cols="12"
            xl="6"
            class="d-flex justify-content-center justify-content-xl-start align-items-center">
            <small>Tampil {{ dataUsers.from }} sampai {{ dataUsers.to }} dari {{ dataUsers.total }} item.</small>
          </b-col>
          <b-col
            cols="12"
            xl="6"
            class="d-flex justify-content-center justify-content-xl-end align-items-center">
            <b-pagination
              align="right"
              pills
              v-model="current_page"
              :total-rows="dataUsers.total"
              :per-page="dataUsers.per_page"
              @change="handlePage"
              aria-controls="drefUserRoleTable">
            </b-pagination>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>