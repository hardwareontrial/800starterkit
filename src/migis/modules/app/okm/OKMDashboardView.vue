<template>
  <b-row class="match-height">
    <b-col cols="12" md="8">
      <h1 class="mb-1 mt-50">
        Selamat Datang 'nama',
      </h1>
      <b-card-text class="mb-1">
        You have done <strong>%</strong> more sales today. Check your new badge in your profile.
      </b-card-text>
    </b-col>
    <b-col cols="12" md="4">
      <card-assignment-progress />
    </b-col>
    <b-col cols="12">
      <user-table />
    </b-col>
    <b-col cols="12">
      <administrative-component ref="refOKMAdministrative" class="mt-1"/>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BCardText,
} from 'bootstrap-vue'
import AdministrativeComponent from '@/migis/modules/app/okm/admin/Dashboard.vue'
import UserTable from '@/migis/modules/app/okm/OKMUserTable.vue'
import CardAssignmentProgress from '@/migis/modules/app/okm/OKMAssignmentProgress.vue'

export default {
  components: {
    BRow, BCol, BCardText,
    AdministrativeComponent, UserTable, CardAssignmentProgress,
  },
}
</script>

<style>

</style>