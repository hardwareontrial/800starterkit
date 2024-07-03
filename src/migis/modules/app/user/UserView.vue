<script>
// import UserServices from '@/migis/modules/app/user/services'
// import AuthorizationServices from '@/migis/modules/app/authorization/services'
// import HRServices from '@/migis/modules/app/hr/services'

export default {
  async created() {
    // await UserServices.init()
    // await AuthorizationServices.getPermissionAll()
    // await AuthorizationServices.getRoleAll()
    // await HRServices.getPositionAll()
  },
  mounted() {
    this.$store.commit('migis/SET_PAGEMENU_NAME', 'management-user', {root:true})
  },
  beforeDestroy() {
    this.$store.commit('migis/SET_PAGEMENU_NAME', '', {root:true})
  },
}
</script>

<template>
  <router-view></router-view>  
</template>

<style>

</style>