<script>
import { BRow, BCol } from 'bootstrap-vue'
import DesktopComponent from './dashboard/PermissionDesktop.vue'

export default {
  components: {
    BRow, BCol,
    DesktopComponent,
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <desktop-component />
    </b-col>
  </b-row>
</template>

<style>

</style>