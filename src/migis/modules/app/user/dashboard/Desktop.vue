<script>
import { BCol, BContainer, BRow } from "bootstrap-vue";
import TableComponent from './_TableDesktop.vue'
import StatisticComponent from './_StatisticDesktop.vue'
import UserServices from '@/migis/modules/app/user/services'

export default {
  components: {
    BCol, BContainer, BRow,
    TableComponent, StatisticComponent
  },
  async beforeCreate() {
    await UserServices.getUsers()
  },
  beforeDestroy() {
    this.$store.commit('migis/user/SET_USERS', [], {root:true})
  },
}
</script>

<template>
  <b-container>
    <b-row>
      <b-col cols="12">
        <statistic-component />
      </b-col>
      <b-col cols="12">
        <table-component />
      </b-col>
    </b-row>
  </b-container>
</template>

<style></style>