<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <table-component />
      </b-col>
      <b-col cols="12">
        <statistic-component />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {
  BRow, BCol, BContainer,
} from 'bootstrap-vue'
import TableComponent from '@/migis/modules/app/delivery-note/components/Table.vue'
import StatisticComponent from './Statistic.vue'

export default {
  components: {
    BRow, BCol, BContainer,
    TableComponent, StatisticComponent,
  },
}
</script>

<style></style>