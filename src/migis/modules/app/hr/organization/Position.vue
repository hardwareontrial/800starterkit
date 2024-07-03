<template>
  <datatable
    @loadPerPage="handlePerPage"
    @changePage="handlePagination"
    @search="handleSearch"
    :items="positions.items"
    :fields="fields"
    :meta="positions.meta"
    :height="dspHeight"
  >
    <template #datatable-top-left>
      <b-button
        variant="flat-primary"
        @click="$emit('openFormCreate')"
      >
        <iconify icon="tabler:circle-plus" class="mr-50"/>
        <span>Tambah Posisi</span>
      </b-button>
    </template>
    <template #cell(name)="data">
      {{data.item.name}}
    </template>
    <template #cell(deptname)="data">
      {{data.item.department ? data.item.department.name : ''}}
    </template>
    <template #cell(status)="data">
      <b-badge
        pill
        :variant="`light-${data.item.is_active === 1 ? 'success' : 'secondary'}`"
      >
        {{data.item.is_active === 1 ? 'Active' : 'Inactive'}}
      </b-badge>
    </template>
    <template #cell(sumUser)="data">
      {{data.item.hasUsers.length}}
    </template>
    <template #cell(opt)="data">
      <b-button-group>
        <b-button
          variant="flat-success"
          class="btn-icon rounded-circle"
        >
          <iconify icon="tabler:eye"/>
        </b-button>
        <b-button
          variant="flat-success"
          class="btn-icon rounded-circle"
          @click="$emit('openFormEditing', data.item)"
        >
          <iconify icon="tabler:edit"/>
        </b-button>
      </b-button-group>
    </template>
  </datatable>
</template>

<script>
import Datatable from '@/migis/components/Datatable.vue'
import store from '@/store'
import { BButton, BButtonGroup, BBadge, } from 'bootstrap-vue'

export default {
  components: {
    Datatable, BButton, BButtonGroup, BBadge,
  },
  data() {
    return {
      fields: [
        {label: 'Nama Posisi', key: 'name', thStyle: { width: "" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Departemen', key: 'deptname', thStyle: { width: "" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Status Aktif', key: 'status',  thStyle: { width: "15%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Total User', key: 'sumUser',  thStyle: { width: "20%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Opsi', key: 'opt',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      currentPage: 1,
      limit: 10,
      searchQuery: '',
    }
  },
  methods: {
    handlePerPage(value) { this.limit = value },
    handlePagination(value) { this.currentPage = value },
    handleSearch(value) { this.searchQuery = value },
  },
  computed: {
    dspHeight(){
      const currentHeight = store.state.app.windowHeight;
      const height = Math.round(0.7 * currentHeight);
      return height
    },
    positions() {
      const data = store.getters['migis/hr/getPositionPaginate'](this.currentPage, this.limit, this.searchQuery)
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
  },
}
</script>

<style>

</style>