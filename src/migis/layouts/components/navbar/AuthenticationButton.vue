<template>
  <b-nav-item :to="{name: 'auth-login-view'}">
    <b-avatar
      size="40"
      variant="light-primary"
    >
    </b-avatar>
  </b-nav-item>
</template>

<script>
import {
  BNavItemDropdown, BAvatar, BNavItem,
} from 'bootstrap-vue'

export default {
  components: {
    BNavItemDropdown, BAvatar, BNavItem,
  },
}
</script>