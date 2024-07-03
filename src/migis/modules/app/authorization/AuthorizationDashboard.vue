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
  computed: {
    countPermissions() {
      return store.getters['migis/authorization/countPermission']
    },
    countRoles() {
      return store.getters['migis/authorization/countRole']
    },
  },
  created() {},
}
</script>

<template>
  <b-row>
    <b-col xl="3" md="4" sm="6">
      <b-card
        class="text-center"
        style="cursor:pointer;"
        @click="handleOpenRoute('authorization-role-dashboard')"
      >
        <b-avatar
          class="mb-1"
          variant="light-primary"
          size="45"
        >
          <iconify icon="tabler:user-shield" :style="{fontSize: '21px'}"/>
        </b-avatar>
        <div class="truncate">
          <h3 class="mb-25 font-weight-bolder">
            {{countRoles}}
          </h3>
          <span>Role{{countRoles > 1 ? 's' : ''}}</span>
        </div>
      </b-card>
    </b-col>
    <b-col xl="3" md="4" sm="6">
      <b-card
        class="text-center"
        style="cursor:pointer;"
        @click="handleOpenRoute('authorization-permission-dashboard')"
      >
        <b-avatar
          class="mb-1"
          variant="light-primary"
          size="45"
        >
          <iconify icon="tabler:lock-open-2" :style="{fontSize: '21px'}"/>
        </b-avatar>
        <div class="truncate">
          <h3 class="mb-25 font-weight-bolder">
            {{countPermissions}}
          </h3>
          <span>Permission{{countPermissions > 1 ? 's' : ''}}</span>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<style>

</style>