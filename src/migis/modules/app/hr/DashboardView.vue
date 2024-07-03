<template>
  <b-row>
    <b-col xl="3" md="4" sm="6">
      <b-card
        class="text-center"
        style="cursor:pointer;"
        @click="handleOpenRoute('organization-view')"
      >
        <b-avatar
          class="mb-1"
          variant="light-primary"
          size="45"
        >
          <iconify icon="tabler:accessible" :style="{fontSize: '21px'}"/>
        </b-avatar>
        <div class="truncate">
          <h3 class="mb-25 font-weight-bolder"> </h3>
          <span>Organisasi</span>
        </div>
      </b-card>
    </b-col>
    <b-col xl="3" md="4" sm="6">
      <b-card
        class="text-center"
        style="cursor:pointer;"
        @click="handleOpenRoute('sync-attn-view')"
      >
        <b-avatar
          class="mb-1"
          variant="light-primary"
          size="45"
        >
          <iconify icon="tabler:refresh" :style="{fontSize: '21px'}"/>
        </b-avatar>
        <div class="truncate">
          <h3 class="mb-25 font-weight-bolder"> </h3>
          <span>Sinkronisasi Absensi</span>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol, BCard, BAvatar } from 'bootstrap-vue'


export default {
  components: {
    BRow, BCol, BCard, BAvatar,
  },
  methods: {
    handleOpenRoute(value) {
      this.$router.push({name: value})
    },
  },
}
</script>

<style>

</style>