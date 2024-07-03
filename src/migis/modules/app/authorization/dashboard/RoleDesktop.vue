<script>
import RoleUserTableComponent from './role/RoleTableUser.vue'
import RoleListComponent from './role/RoleList.vue'
import RoleUserModal from './role/RoleUser.vue'
import { BCol, BContainer, BRow, BCardText, BCardBody, BAvatar, BAvatarGroup, BCard, BLink } from "bootstrap-vue";

export default {
  components: {
    BCol, BContainer, BRow, BCardText, BCardBody, BAvatar, BAvatarGroup, BCard, BLink,
    RoleListComponent, RoleUserTableComponent, RoleUserModal,
  },
}
</script>

<template>
  <b-container>
    <b-row>
      <b-col cols="12" class="mt-0 mb-2">
        <role-list-component />
      </b-col>
      <b-col cols="12" class="mt-2 mb-0">
        <role-user-table-component />
      </b-col>
      <b-col cols="12" class="mt-2 mb-0">
        <role-user-modal />
      </b-col>
    </b-row>
  </b-container>
</template>

<style>

</style>