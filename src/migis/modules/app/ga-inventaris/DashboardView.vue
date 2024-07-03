<script>
import {BCol, BRow} from 'bootstrap-vue'
import DesktopComponent from "@/migis/modules/app/ga-inventaris/dashboard/Desktop.vue";
import FormMiscComponent from '@/migis/modules/app/ga-inventaris/components/FormMisc.vue'

export default {
  components: {
    BCol, BRow, DesktopComponent,
    FormMiscComponent,
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <desktop-component />
    </b-col>
    <b-col cols="12">
      <form-misc-component />
    </b-col>
  </b-row>
</template>

<style></style>