<template>
  <b-card
    no-body
    class="mt-1"
  >
    <b-card-header>
      <b-card-title>
        Statistik
      </b-card-title>
      <b-dropdown
        no-caret
        right
        variant="transparent"
        class="chart-dropdown"
        toggle-class="p-50"
        size="sm"
        :text="rangeToText(filterDay)"
      >
        <b-dropdown-item
          v-for="day in lastDays"
          :key="day.value"
          @click="changeRange(day.value)"
        >
          {{ day.text }}
        </b-dropdown-item>
      </b-dropdown>
    </b-card-header>

    <b-card-body>
      <div class="d-flex justify-content-between" v-if="data">
        <div class="text-center">
          <b-card-text class="mb-50">
            Surat Jalan
          </b-card-text>
          <span class="font-large-1 font-weight-bold mr-25">
            {{ data.totalDelivery }}
          </span>
          <small>Item{{ data.totalDelivery > 1 ? 's' : '' }}</small>
        </div>
        <div class="text-center">
          <b-card-text class="mb-50">
            Invoiced
          </b-card-text>
          <span class="font-large-1 font-weight-bold mr-25">
            {{ data.totalIsRemark }}
          </span>
          <small>Item{{ data.totalDelivery > 1 ? 's' : '' }}</small>
        </div>
        <div class="text-center" v-for="(item, idx) of data.items" :key="idx">
          <b-card-text class="mb-50">
            {{ item.item }}
          </b-card-text>
          <span class="font-large-1 font-weight-bold mr-25">{{ item.sent }}</span>
          <small>{{ item.uom }}</small>
        </div>
      </div>
      <div class="d-flex justify-content-center" v-else>
        No Data
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BRow, BCol, BCardText, BDropdown, BDropdownItem,
} from 'bootstrap-vue'
import DeliveryNoteServices from '@/migis/modules/app/delivery-note/services'
import store from '@/store'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    BCard, BCardHeader, BCardTitle, BCardBody, BDropdown, BDropdownItem, BCardText,
  },
  data() {
    return {
      lastDays: [
        { value: 'z0', text: 'Hari ini' },
        { value: 'z14', text: '14 Hari Terakhir' },
        { value: 'z28', text: '28 Hari Terakhir' },
      ],
      filterDay: 'z14',
      data: null,
    }
  },
  methods: {
    rangeToText(value) {
      const foundItem = this.lastDays.find(item => item.value === value);
      return foundItem ? foundItem.text : null
    },
    changeRange(value) {
      this.filterDay = value
      this.getStatistic()
    },
    async getStatistic() {
      try {
        DeliveryNoteServices.inputRange = this.filterDay
        const response = await DeliveryNoteServices.getStatistic()
        this.data = response.data
      } catch (error) {
        console.error = error
      }
    },
  },
  mounted() {
    _socket.on('auth:delivery-note:created', async (data) => { await this.getStatistic() });
    _socket.on('auth:delivery-note:updated', async (data) => { await this.getStatistic() });
    this.getStatistic()
  },
  beforeDestroy() {
    _socket.off('auth:delivery-note:created')
    _socket.off('auth:delivery-note:updated')
  }
}
</script>

<style lang="scss">
</style>