<script>
import { BRow, BCol, BCard, BAvatar, } from 'bootstrap-vue'
import store from '@/store'

export default {
  components: {
    BRow, BCol, BCard, BAvatar,
  },
  methods: {
    handleOpenRoute(value) {
      this.$router.push({name: value})
    },
  },
  computed: {},
  beforeDestroy() {}
}
</script>

<template>
  <b-row>
    <b-col xl="3" md="4" sm="6">
      <b-card
        class="text-center"
        style="cursor:pointer;"
        @click="handleOpenRoute('reservation-room-dashboard')"
      >
        <b-avatar
          class="mb-1"
          variant="light-primary"
          size="45"
        >
          <iconify icon="tabler:chalkboard" :style="{fontSize: '21px'}"/>
        </b-avatar>
        <div class="truncate">
          <h3 class="mb-25 font-weight-bolder"> </h3>
          <span>Ruangan</span>
        </div>
      </b-card>
    </b-col>  
    <b-col xl="3" md="4" sm="6">
      <b-card
        class="text-center"
        style="cursor:pointer;"
        @click="handleOpenRoute('reservation-numberOfLetter-dashboard')"
      >
        <b-avatar
          class="mb-1"
          variant="light-primary"
          size="45"
        >
          <iconify icon="tabler:list-numbers" :style="{fontSize: '21px'}"/>
        </b-avatar>
        <div class="truncate">
          <h3 class="mb-25 font-weight-bolder"> </h3>
          <span>Nomor Surat</span>
        </div>
      </b-card>
    </b-col>
    <b-col xl="3" md="4" sm="6">
      <b-card
        class="text-center"
        style="cursor:pointer;"
        @click="handleOpenRoute('reservation-admin-dashboard')"
      >
        <b-avatar
          class="mb-1"
          variant="light-primary"
          size="45"
        >
          <iconify icon="tabler:settings" :style="{fontSize: '21px'}"/>
        </b-avatar>
        <div class="truncate">
          <h3 class="mb-25 font-weight-bolder"> </h3>
          <span>Administrasi</span>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<style>

</style>