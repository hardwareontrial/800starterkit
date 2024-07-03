<script>
import Datatable from '@/migis/components/Datatable.vue'
import store from '@/store'
import { BAvatar, BMedia, BBadge, BAvatarGroup, VBTooltip, BButton } from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    Datatable,
    BAvatar, BMedia, BBadge, BAvatarGroup, BButton,
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return {
      currentPage: 1,
      limit: 10,
      searchQuery: '',
      tableBusy: false,
      fields: [
        {label: 'Nama User', key: 'name', thStyle: { width: "25%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Role(s)', key: 'roles', thStyle: { width: "20%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Jabatan', key: 'position', thStyle: { width: "22%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Email', key: 'email',  thStyle: { width: "20%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Status', key: 'status',  thStyle: { width: "8%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Opsi', key: 'opt',  thStyle: { width: "5%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      avatarText,
      badgesPosition: [
        { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 },
        { 1: 'secondary', 2: 'danger', 3: 'warning', 4: 'success', 5: 'primary', 6: 'primary' },
      ],
    }
  },
  methods: {
    handlePerPage(value) { this.limit = value },
    handlePagination(value) { this.currentPage = value },
    handleRowClicked() {},
    handleSearch(value) { this.searchQuery = value },
    detailUser(value) {
      this.$router.push({name: 'management-user-detail', params: {unique: value.user_unique_str} })
    },
  },
  computed: {
    dataUsers() {
      const data = store.getters['migis/user/usersPaginate'](this.currentPage, this.limit, this.searchQuery)
      return {
        items: data.items,
        meta: {
          from: data.from,
          to: data.to,
          total: data.total,
          per_page: data.per_page,
          current_page: data.currentPage,
        }
      }
    },
    dspHeight(){
      const currentHeight = store.state.app.windowHeight;
      const height = Math.round(0.7 * currentHeight);
      return height
    },
  },
}
</script>

<template>
  <div>
    <datatable
      @loadPerPage="handlePerPage"
      @changePage="handlePagination"
      @rowClicked="handleRowClicked"
      @search="handleSearch"
      :items="dataUsers.items"
      :fields="fields"
      :meta="dataUsers.meta"
      :height="dspHeight"
      :isbusy="tableBusy"
    >
      <template #datatable-top-left>
        <b-button
          class="ml-0"
          variant="flat-primary"
          :to="{name: 'management-user-create'}"
        >
          <iconify
            icon="tabler:user-plus"
          />
          <span
            class="ml-25"
          >
            User Baru
          </span>
        </b-button>
        <b-button
          class="ml-0"
          variant="flat-primary"
          :to="{name: 'management-user-create-auth'}"
        >
          <iconify
            icon="tabler:user-plus"
          />
          <span
            class="ml-25"
          >
            Otentikasi Baru
          </span>
        </b-button>
      </template>

      <template #cell(name)="data">
        <b-media>
          <template #aside>
            <b-avatar
              :variant="`light-${!!data.item.is_active ? 'primary' : 'secondary'}`"
              :src="data.item.is_active ? (data.item.avatar?data.item.avatarlink:''):''"
              :text="avatarText(data.item.fname)"
              size="36" />
          </template>
          <span class="font-weight-bold d-block text-nowrap">
            {{ data.item.fname }}
          </span>
          <small>{{data.item.nik}}</small>
        </b-media>
      </template>

      <template #cell(roles)="data">
        <div v-if="data.item.userRoles.length > 0">
          <b-avatar-group
            class="mt-0 pt-0"
            size="34px"
            v-if="data.item.userRoles.length > 0"
          >
            <b-avatar 
              v-b-tooltip.hover.v-danger
              v-for="(role, i) in data.item.userRoles.slice(0, 5)"
              :variant="`light-${data.item.is_active === 1 ? 'danger' : 'secondary'}`"
              :key="i"
              :title="role.name"
            >
              <iconify icon="tabler:shield-filled"/>
            </b-avatar>
            <h6 class="align-self-center cursor-pointer ml-1 mb-0">
              <span v-if="(data.item.userRoles.length -5) > 0">+{{data.item.userRoles.length -5}}</span>
            </h6>
          </b-avatar-group>
        </div>
        <div v-else>
          -
        </div>
      </template>

      <template #cell(position)="data">
        <b-badge
          :variant="data.item.is_active ? `light-${badgesPosition[1][data.item.position.level]}` : 'secondary'"
          v-if="data.item.position_id"
        >
          {{data.item.position.name}}
        </b-badge>
        <span v-else> - </span>
      </template>

      <template #cell(email)="data">
        {{data.item.datalogin ? data.item.datalogin.email : '-'}}
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
          variant="flat-primary"
          class="btn-icon rounded-circle"
          @click="detailUser(data.item)"
        >
          <iconify icon="tabler:eye" />
        </b-button>
      </template>
    </datatable>
  </div>
</template>

<style>

</style>