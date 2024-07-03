<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData ? userData.fname : 'NODATA' }}
        </p>
        <span class="user-status">
          {{ userData ? (userData.position_id ? userData.position.name : '') : '' }}
        </span>
      </div>
      <b-avatar
        size="40"
        :src="userData ? userData.avatar : ''"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="userData ? !userData.fullName : false"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="signOut"
    >
      <iconify
        icon="tabler:logout-2"
        class="mr-50"
        :style="{ fontSize: '16px' }"/>
      <span>Logout</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BAvatar, BNavItemDropdown, BDropdownItem,
} from 'bootstrap-vue'
import AuthorizationService from '@/migis/modules/app/authorization/services'

export default {
  components: {
    BAvatar, BNavItemDropdown, BDropdownItem,
  },
  methods: {
    async signOut() {
      try {
        const response = await AuthorizationService.signOut()
        this.$bvToast.toast(`Sampai Jumpa kembali.`, {title: 'Authorization', toaster: 'b-toaster-top-center', solid: false, variant: 'success'})
      } catch (e) {
        console.error(e)
        this.$bvToast.toast(`${e}`, {title: 'Error', toaster: 'b-toaster-top-center', solid: false, variant: 'danger'})
      }
    },
  },
  computed: {
    userData() {
      return this.$store.getters['migis/auth/userData']
    },
  },
}
</script>
