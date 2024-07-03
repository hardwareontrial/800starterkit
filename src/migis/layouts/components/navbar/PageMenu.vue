<script>
import { BNavItemDropdown, BDropdownItem } from 'bootstrap-vue'
import mainAppMenu from '@/migis/modules/libs/app-menu'

export default {
  components: {
    BNavItemDropdown, BDropdownItem
  },
  data() {
    return{}
  },
  computed: {
    menus() {
      return mainAppMenu.data.find(menu => menu.pageMenuName === this.$store.state.migis.pageMenuName)
    }
  },
  mounted() {},
}
</script>

<template>
  <b-nav-item-dropdown v-if="menus">
    <iconify
      slot="button-content"
      class="text-primary"
      :icon="menus.icon"
      :style="{ fontSize: '21px' }"
    />
    <b-dropdown-item
      class="suggestion-group-suggestion cursor-pointer"
      link-class="d-flex align-items-center"
      v-for="(child, cidx) in menus.children"
      :key="cidx"
      :to="child.route"
    >
      <iconify
        class="mr-75"
        :icon="child.icon"
      />
      <span class="align-middle">{{ child.title }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<style>

</style>