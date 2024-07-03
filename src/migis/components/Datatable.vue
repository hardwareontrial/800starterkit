<template>
  <b-row>
    <b-col 
      cols="12"
    >
      <b-row>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-start"
        >
          <slot name="datatable-top-left" />
        </b-col>
        <b-col
          cols="12"
          md="6"
          class="d-flex align-items-center justify-content-end"
        >
          <b-form-input
            class="d-inline-block mr-0"
            placeholder="Cari..."
            type="text"
            v-model="search"
            debounce="750"
          />
        </b-col>
      </b-row>
    </b-col>

    <b-col 
      cols="12"
      class="mt-1"
    >
      <b-card no-body>
        <b-table
          responsive
          show-empty
          :fields="fields"
          :items="items"
          :busy="isbusy"
          :sticky-header="`${height}px`"
          @row-clicked="rowClicked"
        >
          <template v-for="(_, slotName) of $scopedSlots" v-slot:[slotName]="scope">
            <slot :name="slotName" v-bind="scope"></slot>
          </template>
        </b-table>
      </b-card>
    </b-col>

    <b-col 
      cols="12"
    >
      <b-row>
        <b-col
          style="margin-bottom: 0.75rem;"
          cols="12"
          xl="6"
          class="d-flex justify-content-center justify-content-xl-start align-items-center">
          <small>Tampil {{ meta.from }} sampai {{ meta.to }} dari {{ meta.total }} item.</small>
        </b-col>
        <b-col
          style="margin-bottom: 0.75rem;"
          cols="12"
          xl="3"
          class="d-flex justify-content-center justify-content-xl-end align-items-center">
          <label for="">Items</label>
          <v-select
            boundary="viewport"
            :clearable="false"
            :options="optionPerPage"
            v-model="meta.per_page"
            @input="loadPerPage"
            label="text"
            :reduce="text=>text.value"
            class="per-page-selector d-inline-block mx-50"
          />
        </b-col>
        <b-col
          cols="12"
          xl="3"
          class="d-flex justify-content-center justify-content-xl-end align-items-center">
          <b-pagination
            style="margin-top: 0.75rem;"
            align="right"
            v-model="meta.current_page"
            :total-rows="meta.total"
            :per-page="meta.per_page"
            @change="changePage"
            aria-controls="datatable-custom">
          </b-pagination>
        </b-col>
      </b-row>
    </b-col>

  </b-row>
  
</template>

<script>
import {
  BCard, BTable, BRow, BCol, BFormInput, BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  name: 'DatatableComponent',
  components: {
    BCard, BTable, BRow, BCol, BFormInput, BPagination,
    vSelect,
  },
  props: {
    items: {type: Array, required: true},
    fields: {type: Array, required: true},
    meta: {required: true},
    isbusy: {type: Boolean, required: false},
    height: {type: [String, Number], default: 500},
  },
  data() {
    return{
      optionPerPage: [
        { text: 10, value: 10 },
        { text: 25, value: 25 },
        { text: 50, value: 50 },
      ],
      search: '',
    }
  },
  methods: {
    loadPerPage(val){
      this.$emit('loadPerPage', val)
    },
    changePage(val){
      this.$emit('changePage', val)
    },
    rowClicked(record, index){
      this.$emit('rowClicked', record, index)
    }
  },
  watch: {
    'search': {
      handler(val, oldVal){ this.$emit('search', val) }
    },
  }
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>