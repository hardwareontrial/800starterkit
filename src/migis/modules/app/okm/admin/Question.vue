<template>
  <b-row>
    <b-col cols="12">
      <datatable
        @loadPerPage="handlePerPage"
        @changePage="handlePagination"
        @search="handleSearch"
        :items="questions.items"
        :fields="fields"
        :meta="questions.meta"
        :height="dspHeight"
      >
        <template #datatable-top-left>
          <b-button
            variant="flat-primary"
            :to="{name: 'okm-admin-question-create'}"
          >
            <iconify icon="tabler:circle-plus" class="mr-50"/>
            <span>Tambah Soal</span>
          </b-button>
          <v-select
            :options="optionActive"
            :reduce="text => text.value"
            :clearable="false"
            v-model="selectedOptionActive"
            class="w-25 ml-50 mr-0"
            label="text"
            id="frm-okm-material-leveling"
          />
        </template>
      </datatable>
    </b-col>
  </b-row>
</template>

<script>
import { BButton, BButtonGroup, BBadge, BRow, BCol } from 'bootstrap-vue'
import Datatable from '@/migis/components/Datatable.vue'
import store from '@/store'
import vSelect from 'vue-select'

export default {
  components: {
    BButton, BButtonGroup, BBadge, BRow, BCol,
    Datatable,
    vSelect,
  },
  data() {
    return{
      fields: [
        {label: 'Judul Soal', key: 'title', thStyle: { width: "" }, thClass: 'text-left', tdClass: 'text-left' },
        {label: 'Materi', key: 'material',  thStyle: { width: "20%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Bobot Soal', key: 'level', thStyle: { width: "20%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Total', key: 'total', thStyle: { width: "20%" }, thClass: 'text-center', tdClass: 'text-center' },
        {label: 'Opsi', key: 'opt',  thStyle: { width: "10%" }, thClass: 'text-center', tdClass: 'text-center' },
      ],
      currentPage: 1,
      limit: 10,
      searchQuery: '',
      optionActive: [
        { value: 'all', text: 'SEMUA' },
        { value: 'active', text: 'AKTIF' },
        { value: 'inactive', text: 'TIDAK AKTIF' },
      ],
      selectedOptionActive: 'all',
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
    questions() {
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

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>