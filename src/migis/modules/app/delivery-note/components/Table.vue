<template>
  <datatable-component
    @loadPerPage="handlePerPage"
    @changePage="handlePagination"
    @rowClicked="handleRowClicked"
    @search="handleSearch"
    :items="items"
    :fields="fields"
    :meta="meta"
  >
    <template #datatable-top-left>
      <b-button
        class="ml-0"
        variant="flat-primary"
        :to="{name: 'deliveryNote-create-view'}"
      >
        <iconify
          icon="tabler:playlist-add"
        />
        <span
          class="ml-25"
        >
          Buat Baru
        </span>
      </b-button>
    </template>
    <template #cell(number)="data">
      <b>{{ data.item.delivery_no }}</b>
      <br /><small>PO: {{ data.item.po_no ? data.item.po_no : 'n/a'}} </small>
      <br /><small>DO: {{ data.item.do_no ? data.item.do_no : 'n/a'}} </small>
    </template>

    <template #cell(customer)="data">
      <b>{{ data.item.detail.detail_customer }}</b>
      <br />{{ data.item.detail.detail_address }}
      <br />{{ data.item.detail.detail_city }}
    </template>

    <template #cell(driver)="data">
      {{ data.item.detail.detail_driver }} <br />
      {{ data.item.detail.detail_nopol }}
    </template>

    <template #cell(deliverydate)="data">
      {{ $moment(data.item.detail.detail_sending_date).format('DD/MMM/YY') }}
    </template>

    <template #cell(item)="data">
      {{ data.item.detail.detail_item }} <br />
      {{ data.item.detail.detail_qty }}
      {{ data.item.detail.detail_uom }}
    </template>

    <template #cell(status)="data">
      <div v-if="!!data.item.is_processing" class="d-flex align-content-center justify-content-center">
        <b-form-checkbox
          :id="`delivery-cb-inv-${data.item.delivery_no}`"
          @change="showingInvoice({deliveryData: data.item, event: $event})"
        />
        <b-badge
          variant="warning"
        >
          Processing
        </b-badge>
      </div>
      <div v-else>
        <b-badge
          variant="light-success"
        >
          {{ data.item.invoice_no }}  
        </b-badge>
      </div>
    </template>

    <template #cell(opt)="data">
      <b-button
        class="btn-icon rounded-circle"
        variant="flat-primary"
        size="sm"
        :to="{ name: 'deliveryNote-detail-view', params: {unique: data.item.delivery_no} }"
      >
        <iconify
          icon="tabler:eye"
        />
      </b-button>
    </template>
  </datatable-component>
</template>

<script>
import DatatableComponent from '@/migis/components/Datatable.vue'
import { BDropdown, BDropdownItem, BFormCheckbox, BButton, BBadge, } from 'bootstrap-vue'
import DeliveryNoteServices from '@/migis/modules/app/delivery-note/services'
import store from '@/store'

const _socket = store.state.migis.socket.socket

export default {
  name: 'DeliveryNoteDesktopTable',
  components: {
    DatatableComponent,
    BDropdown, BDropdownItem, BFormCheckbox, BButton, BBadge,
  },
  data() {
    return {
      fields: [
        { label: 'Nomor', key: 'number', thStyle: { width: "18%" }, thClass: 'text-center', tdClass: 'text-left' },
        { label: 'Customer', key: 'customer',  thStyle: { width: "" }, thClass: 'text-center', tdClass: 'text-left' },
        { label: 'Driver', key: 'driver',  thStyle: { width: "18%" }, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Tgl Kirim', key: 'deliverydate',  thStyle: { width: "12%" }, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Item', key: 'item',  thStyle: { width: "15%" }, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Status', key: 'status',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Opsi', key: 'opt',  thStyle: { width: "7%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      items: [],
      meta: {},
    }
  },
  methods: {
    handlePerPage(value) {
      DeliveryNoteServices.limitPerPage = value
      setTimeout( async () => { await this.getData() }, 500)
    },
    handlePagination(value) {
      DeliveryNoteServices.currentPage = value
      setTimeout( async () => { await this.getData() }, 500)
    },
    handleRowClicked(value) {},
    handleSearch(value) {
      DeliveryNoteServices.searchQuery = value
      setTimeout( async () => { await this.getData() }, 500)
    },
    async getData() {
      try {
        const dn = await DeliveryNoteServices.getDataPaginate()
        this.items = dn.data.items
        this.meta = {
          from: dn.data.from,
          to: dn.data.to,
          total: dn.data.total,
          per_page: dn.data.per_page,
          current_page: dn.data.currentPage,
        }
      } catch (error) {
        console.log(error)
      }
    },
    showingInvoice(event) {
      this.$root.$emit('modalDeliveryNoteInvoice', event)
    },
  },
  mounted() {
    _socket.on('auth:delivery-note:created', async (data) => {
      const parsedData = JSON.parse(data)
      await this.getData()
      this.$bvToast.toast(`Nomor Baru ${parsedData.delivery_no}`, {title: 'Surat Jalan', toaster: 'b-toaster-top-center', solid: false, variant: 'success'})
    });
    _socket.on('auth:delivery-note:updated', async (data) => {
      await this.getData()
      this.$bvToast.toast(`${data}`, {title: 'Surat Jalan', toaster: 'b-toaster-top-center', solid: false, variant: 'info'})
    });
    this.getData();
  },
  created() {
    this.$root.$on('cancelDeliveryNoteInvoice', (data) => {
      document.getElementById(`delivery-cb-inv-${data.deliveryId}`).checked = data.event
    })
  },
  beforeDestroy() {
    this.$root.$off('cancelDeliveryNoteInvoice')
    _socket.off('auth:delivery-note:created')
    _socket.off('auth:delivery-note:updated')
  },
}
</script>

<style>

</style>