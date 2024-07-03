<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <component :is="isLoggedIn ? 'bookmarks-component' : ''" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-toggler-component />
      <component :is="isLoggedIn ? 'user-dropdown-component' : 'authentication-button-component'" />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import BookmarksComponent from "@/migis/layouts/components/navbar/Bookmarks.vue";
import AuthenticationButtonComponent from "@/migis/layouts/components/navbar/AuthenticationButton.vue";
import UserDropdownComponent from "@/migis/layouts/components/navbar/UserDropdown.vue";
import DarkTogglerComponent from "@/migis/layouts/components/navbar/DarkToggler.vue"

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,

    // Navbar Components
    BookmarksComponent,
    AuthenticationButtonComponent,
    UserDropdownComponent,
    DarkTogglerComponent,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    isLoggedIn(){
      return this.$store.getters['migis/auth/isLoggedIn']
    },
  }
}
</script>
