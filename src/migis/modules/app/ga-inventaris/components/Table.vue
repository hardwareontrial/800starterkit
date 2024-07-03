<script>
import DatatableComponent from '@/migis/components/Datatable.vue'
import { BButton, BDropdown, BDropdownItem, BBadge, BSpinner, } from 'bootstrap-vue'
import GaInventarisServices from '@/migis/modules/app/ga-inventaris/services'
import store from '@/store'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    DatatableComponent,
    BButton, BDropdown, BDropdownItem, BBadge, BSpinner,
  },
  data() {
    return {
      fields: [
        {label: 'Kode', key: 'code', thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Nama Barang', key: 'nameBrg', thStyle: { width: "" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Type', key: 'type',  thStyle: { width: "20%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Lokasi', key: 'location',  thStyle: { width: "15%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Status', key: 'status',  thStyle: { width: "15%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Opsi', key: 'opt',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      currentPage: 1,
      limit: 10,
      searchQuery: '',
      tableBusy: false,
    }
  },
  methods: {
    handlePerPage(value) {
      this.limit = value
    },
    handlePagination(value) {
      this.currentPage = value
    },
    handleRowClicked(value) {},
    handleSearch(value) {
      this.searchQuery = value
    },
    handleTableBusy(value) {
      this.tableBusy = value
    },
    updateActive(value) {
      this.$swal({
        html: `
          <h4>Barang ${value.kode_brg} akan <b>Ke Gudang</b>. Lanjutkan?</h4>
          <small class="text-primary">Ini menandakan barang hanya disimpan dan tidak terikat apapun.</small>
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
            this.handleTableBusy(true)
            const response = await GaInventarisServices.update({form: value, id: value.id, keyword: 'update-isactive'})
            this.handleTableBusy(false)
          } catch (error) {
            console.error(error)
            this.$bvToast.toast(`${ error || error.message }`, {
              title: 'Ga Inventaris',
              toaster: 'b-toaster-top-center',
              solid: false,
              variant: 'danger',
            })
            this.handleTableBusy(false)
          }
        }
      })
    },
    softDelete(value) {
      this.$swal({
        html: `
          <h4>Barang ${value.kode_brg} akan <b>Di Jual</b>. Lanjutkan?</h4>
          <small class="text-primary">Ini menandakan barang akan dihapus dari database.</small>
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
            this.handleTableBusy(true)
            const response = await GaInventarisServices.delete({unique: value.kode_brg, id: value.id})
            this.handleTableBusy(false)
          } catch (error) {
            console.error(error)
            this.$bvToast.toast(`${ error || error.message }`, {
              title: 'Ga Inventaris',
              toaster: 'b-toaster-top-center',
              solid: false,
              variant: 'danger',
            })
            this.handleTableBusy(false)
          }
        }
      })
    },
  },
  computed: {
    dataInventaris() {
      const data = store.getters['migis/gainventaris/gaInvPaginate'](this.currentPage, this.limit, this.searchQuery)
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
    tableProps() {
      return store.state.migis.gainventaris.typeProps
    },
    dspHeight(){
      const currentHeight = store.state.app.windowHeight;
      const height = Math.round(0.7 * currentHeight);
      return height
    },
  },
  mounted() {
    _socket.on('auth:gainventaris:created', async (data) => {
      await GaInventarisServices.getDataAll()
      const parsedData = JSON.parse(data)
      this.$bvToast.toast(`${parsedData.kode_brg} ditambahkan`, {
        title: 'Ga Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'info',
      })
    });
    _socket.on('auth:gainventaris:updated', async (data) => {
      await GaInventarisServices.getDataAll()
      this.$bvToast.toast(`${ data } diperbarui`, {
        title: 'Ga Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'info',
      })
    });
    _socket.on('auth:gainventaris:deleted', async (data) => {
      await GaInventarisServices.getDataAll()
      this.$bvToast.toast(`${ data } dihapus`, {
        title: 'Ga Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'info',
      })
    });
  },
  beforeDestroy() {
    _socket.off('auth:gainventaris:created');
    _socket.off('auth:gainventaris:updated');
    _socket.off('auth:gainventaris:deleted');
  },
}
</script>

<template>
  <datatable-component
    @loadPerPage="handlePerPage"
    @changePage="handlePagination"
    @rowClicked="handleRowClicked"
    @search="handleSearch"
    :items="dataInventaris.items"
    :fields="fields"
    :meta="dataInventaris.meta"
    :height="dspHeight"
    :isbusy="tableBusy"
  >
    <template #datatable-top-left>
      <b-button
        class="ml-0"
        variant="flat-primary"
        :to="{name: 'gainventaris-create'}"
      >
        <iconify
          icon="tabler:playlist-add"
        />
        <span
          class="ml-25"
        >
          Tambah Data
        </span>
      </b-button>
    </template>

    <template #table-busy>
      <div class="text-center text-primary my-2">
        <b-spinner class="align-middle"></b-spinner>
        <!-- <strong>Loading...</strong> -->
      </div>
    </template>

    <template #cell(code)="data">
      <strong>{{data.item.kode_brg}}</strong>
    </template>

    <template #cell(nameBrg)="data">
      {{data.item.nama_brg}}
    </template>

    <template #cell(type)="data">
      <span :class="'text-'+tableProps[2][data.item.status_id]">
        <iconify :icon="tableProps[1][data.item.status_id]" :style="{fontSize: '18px'}"/>
        {{tableProps[0][data.item.status_id]}}
      </span>
    </template>

    <template #cell(location)="data">
      {{ data.item.lokasi_id ? data.item.invloc.name: '' }}
    </template>

    <template #cell(status)="data">
      <b-badge
        pill
        :variant="!!data.item.is_active ? 'success' : 'secondary'"
      >
        {{!!data.item.is_active ? 'Active' : 'Inactive'}}
      </b-badge>
    </template>

    <template #cell(opt)="data">
      <b-dropdown
        boundary="viewport"
        variant="link"
        no-caret>
        <template #button-content>
          <iconify icon="tabler:dots" :style="{fontSize: '16px'}" class="align-middle text-body" />
        </template>
        <b-dropdown-item
          :to="{name: 'gainventaris-detail', params: {unique: data.item.kode_brg.replace(/\s+/g, ''), id: data.item.id} }"
        >
          <iconify
            icon="tabler:align-box-left-middle"
            :style="{fontSize: '18px'}"
          />
          <span class="align-middle ml-50">Detail</span>
        </b-dropdown-item>
        <b-dropdown-item
          @click="updateActive(data.item)"
        >
          <iconify
            :icon="data.item.is_active == 1 ?'tabler:archive' : 'tabler:archive-off'"
            :style="{fontSize: '18px'}"
          />
          <span class="align-middle ml-25">
            {{data.item.is_active == 1 ? 'Ke Gudang' : 'Gunakan'}}
          </span>
        </b-dropdown-item>
        <b-dropdown-item
          @click="softDelete(data.item)"
        >
          <iconify
            icon="tabler:package-export"
            :style="{fontSize: '18px'}"
          />
          <span class="align-middle ml-50">Di Jual</span>
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </datatable-component>
</template>

<style>
</style>