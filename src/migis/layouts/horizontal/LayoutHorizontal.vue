<template>
  <layout-horizontal>

    <router-view />

    <template #navbar="{ toggleVerticalMenuActive }">
      <navbar-horizontal-brand />
      <navbar :toggle-vertical-menu-active="toggleVerticalMenuActive" />
    </template>

    <!-- <app-customizer
      v-if="showCustomizer"
      slot="customizer"
    /> -->
  </layout-horizontal>
</template>

<script>
import LayoutHorizontal from '@core/layouts/layout-horizontal/LayoutHorizontal.vue'
// import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue'
// import { $themeConfig } from '@themeConfig'
import AppNavbarHorizontalLayoutBrand from '@core/layouts/components/app-navbar/AppNavbarHorizontalLayoutBrand.vue'
import Navbar from '../components/Navbar.vue'
import NavbarHorizontalBrand from '@/migis/layouts/components/BrandHorizontal.vue'

export default {
  components: {
    LayoutHorizontal,
    // AppCustomizer,
    Navbar,
    AppNavbarHorizontalLayoutBrand,
    NavbarHorizontalBrand,
  },
  data() {
    return {
      // showCustomizer: $themeConfig.layout.customizer,
    }
  },
}
</script>
