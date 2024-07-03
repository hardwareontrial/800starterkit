<template>
  <b-row>
    <b-col cols="12">
      <b-tabs
        pills
      >
        <b-tab active>
          <template #title>
            <iconify icon="tabler:chalkboard" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Ruangan</span>
          </template>
            <b-card>
              <b-tabs justified>
                <b-tab title="Data Reservasi" active>
                  <data-reservation ref="rsvAdminDataReservation"/>
                </b-tab>
                <b-tab title="Data Ruangan">
                  <data-rooms ref="rsvAdminDataRooms"/>
                </b-tab>
              </b-tabs>
            </b-card>
        </b-tab>
        <b-tab>
          <template #title>
            <iconify icon="tabler:list-numbers" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Nomor</span>
          </template>
        </b-tab>
      </b-tabs>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BTabs, BTab, BCard,
} from 'bootstrap-vue'
import DataRooms from './administration/room/DataRooms.vue'
import DataReservation from './administration/room/DataReservation.vue'

export default {
  components: {
    BRow, BCol, BTabs, BTab, BCard,
    DataRooms, DataReservation,
  },
}
</script>

<style lang="scss">
</style>