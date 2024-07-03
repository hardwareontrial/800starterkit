<template>
  <b-navbar-nav class="nav">
    <app-menu-component class="d-none d-xl-block"/>
    <page-menu class="d-none d-xl-block"/>
  </b-navbar-nav>
</template>

<script>
import {
  BNavbarNav,
} from 'bootstrap-vue'
import DarkTogglerComponent from "@/migis/layouts/components/navbar/DarkToggler.vue"
import AppMenuComponent from "@/migis/layouts/components/navbar/AppMenu.vue"
import PageMenu from '@/migis/layouts/components/navbar/PageMenu.vue'

export default {
  components: {
    BNavbarNav,
    AppMenuComponent,
    PageMenu,
  },
  computed: {
    pageMenuName() { return this.$store.state.migis.pageMenuName }
  },
}
</script>
