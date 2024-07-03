<template>
  <b-nav-item-dropdown
    link-classes="bookmark-star"
    lazy
  >
    <iconify
      slot="button-content"
      icon="tabler:layout-grid"
      class="text-danger"
      :style="{ fontSize: '21px' }"
    />

    <!-- Dropdown Content -->
    <li style="min-width:300px">
      <div class="p-1">
        <b-form-input
          id="boomark-search-input"
          placeholder="Cari Menu..."
          autofocus
          v-model="searchQuery"
        />
      </div>
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="search-list search-list-bookmark scroll-area"
        :class="{'show': appsMenu && appsMenu.length }"
        tagname="ul"
      >
        <b-dropdown-item
          class="suggestion-group-suggestion cursor-pointer"
          link-class="d-flex align-items-center"
          v-for="(menu, index) in appsMenu"
          :key="index"
          :to="menu.route"
        >
          <iconify
            :icon="menu.icon"
            class="mr-75"
          />
          <span class="align-middle">{{ menu.title }}</span>
        </b-dropdown-item>
        <b-dropdown-item
          v-if="appsMenu.length <= 0"
        >
          <iconify icon="tabler:forbid-2" :style="{fontSize: '13px'}"/>
          <small class="ml-50">Menu tidak tersedia.</small>
        </b-dropdown-item>
      </vue-perfect-scrollbar>
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BFormInput, BNavItemDropdown, BDropdownItem, BNavItem,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  components: {
    BFormInput, BNavItemDropdown, BDropdownItem, BNavItem,
    VuePerfectScrollbar
  },
  data(){
    return{
      perfectScrollbarSettings: { maxScrollbarLength: 60 },
      searchQuery: '',
    }
  },
  computed: {
    appsMenu() {
      return this.$store.getters['migis/horizontalMenu'](this.searchQuery)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@core/scss/base/bootstrap-extended/include';

ul
{
  list-style: none;
  padding: 0;
  margin: 0;
}
p {
  margin: 0;
}

.nav-bookmar-content-overlay {
    position: fixed;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-transition: all 0.7s;
    transition: all 0.7s;
    z-index: -1;

    &:not(.show) {
      pointer-events: none;
    }

    &.show {
      cursor: pointer;
      z-index: 10;
      opacity: 1;
    }
}
</style>
