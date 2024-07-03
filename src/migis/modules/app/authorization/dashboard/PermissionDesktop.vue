<script>
import TableComponent from './permission/Table.vue'
import { BCol, BContainer, BRow } from "bootstrap-vue";

export default {
  components: {
    BCol, BContainer, BRow,
    TableComponent,
  },
}
</script>

<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <table-component />
      </b-col>
    </b-row>
  </b-container>
</template>

<style>

</style>