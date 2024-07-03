<template>
  <div class="navbar-header d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link
          class="navbar-brand"
          to="/"
        >
          <span class="brand-logo">
            <b-img
              :src="appLogoImage"
              alt="logo"
            />
          </span>
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'

export default {
  components: { BLink, BImg },
  computed: {
    appLogoImage() {
      const isLight = this.$store.state.appConfig.layout.skin
      const logo = require('@/migis/assets/images/logo/logo.svg')
      const logoDark = require('@/migis/assets/images/logo/logo-dark.svg')
      if(isLight === 'light'){ return logo }
      return logoDark
    }
  },
}
</script>

<style>

</style>