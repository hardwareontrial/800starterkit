<template>
  <b-row>
    <b-col cols="12">
      <desktop-component />
    </b-col>
    <b-col cols="12">
      <invoice-component />
    </b-col>
    <b-col cols="12" v-if="false">
      mobile
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import DesktopComponent from './dashboard/Desktop.vue'
import MobileComponent from './dashboard/Mobile.vue'
import InvoiceComponent from './components/ModalInvoice.vue'

export default {
  components: {
    BRow, BCol,
    DesktopComponent, MobileComponent,
    InvoiceComponent,
  },
}
</script>

<style></style>