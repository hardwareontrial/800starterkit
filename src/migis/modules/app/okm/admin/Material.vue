<template>
  <b-row>
    <b-col cols="12">
      <datatable
        @loadPerPage="handlePerPage"
        @changePage="handlePagination"
        @search="handleSearch"
        :items="materials.items"
        :fields="fields"
        :meta="materials.meta"
        :height="dspHeight"
      >
        <template #datatable-top-left>
          <b-button
            variant="flat-primary"
            @click="openMaterialModal(true)"
          >
            <iconify icon="tabler:circle-plus" class="mr-50"/>
            <span>Tambah Materi</span>
          </b-button>

          <!-- <template #cell(material)="data">
            {{data.item.name}}
          </template>

          <template #cell(value)="data">
            {{data.item.name}}
          </template>

          <template #cell(relatedQuestion)="data">
            {{data.item.name}}
          </template>

          <template #cell(opt)="data">
            {{data.item.name}}
          </template> -->

        </template>
      </datatable>
    </b-col>
    <b-col cols="12">
      <material-modal ref="refOKMAdmMaterialModal"/>
    </b-col>
  </b-row>
</template>

<script>
import Datatable from '@/migis/components/Datatable.vue'
import store from '@/store'
import { BButton, BButtonGroup, BBadge, BRow, BCol } from 'bootstrap-vue'
import MaterialModal from './MaterialModal.vue'

export default {
  components: {
    Datatable, MaterialModal,
    BButton, BButtonGroup, BBadge, BRow, BCol,
  },
  data() {
    return{
      fields: [
        {label: 'Judul Materi', key: 'material', thStyle: { width: "" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Bobot Materi', key: 'value',  thStyle: { width: "20%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Soal Terkait', key: 'relatedQuestion', thStyle: { width: "20%" }, thClass: 'text-center', tdClass: 'text-center' },
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
    openMaterialModal(value) {
      this.$refs.refOKMAdmMaterialModal.handleShowModal(value)
    },
  },
  computed: {
    dspHeight(){
      const currentHeight = store.state.app.windowHeight;
      const height = Math.round(0.7 * currentHeight);
      return height
    },
    materials() {
      // const data = store.getters['migis/hr/getDepartmentPaginate'](this.currentPage, this.limit, this.searchQuery)
      return {
        items: [],
        meta: {
          from: 1,
          to: 1,
          total: 1,
          per_page: this.limit,
          current_page: this.currentPage,
        }
      }
    },
  },
}
</script>

<style>

</style>