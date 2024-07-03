<script>
import DatatableComponent from '@/migis/components/Datatable.vue'
import store from '@/store'
import { BButton } from 'bootstrap-vue'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    DatatableComponent,
    BButton,
  },
  data() {
    return {
      fields: [
        {label: 'Nama Izin', key: 'permission', thStyle: { width: "20%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Teks', key: 'text',  thStyle: { width: "20%" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Deskripsi', key: 'desc',  thStyle: { width: "" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Opsi', key: 'opt',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      currentPage: 1,
      limit: 10,
      searchQuery: '',
    }
  },
  methods: {
    handlePerPage() {},
    handlePagination() {},
    handleSearch() {},
  },
  computed: {
    dspHeight(){
      const currentHeight = store.state.app.windowHeight;
      const height = Math.round(0.7 * currentHeight);
      return height
    },
    dataPermission() {
      const data = store.getters['migis/authorization/permissionPaginate'](this.currentPage, this.limit, this.searchQuery)
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

<template>
  <datatable-component
    @loadPerPage="handlePerPage"
    @changePage="handlePagination"
    @search="handleSearch"
    :items="dataPermission.items"
    :fields="fields"
    :meta="dataPermission.meta"
    :height="dspHeight"
  >
    <template #cell(permission)="data">
      <span>{{data.item.name}}</span>
    </template>

    <template #cell(text)="data">
      <span>{{data.item.text}}</span>
    </template>

    <template #cell(desc)="data">
      <span>{{data.item.description}}</span>
    </template>

    <template #cell(opt)="data">
      <b-button
        class="btn-icon rounded-circle"
        variant="flat-primary"
        size="sm"
        :to="{ name: 'authorization-permission-detail', params: {unique: data.item.permission_unique_str} }"
      >
        <iconify
          icon="tabler:eye"
        />
      </b-button>
    </template>
  </datatable-component>
</template>

<style>

</style>
