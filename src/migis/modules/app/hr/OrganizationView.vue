<template>
  <router-view></router-view>
</template>

<script>
import HRServices from '@/migis/modules/app/hr/services'
import UserServices from '@/migis/modules/app/hr/services'

export default {
  async beforeCreate() {
    await HRServices.getPositionAll()
    await HRServices.getDeptsAll()
  },
  beforeDestroy() {
    this.$store.commit('migis/hr/SET_POSITIONS', [], {root: true})
    this.$store.commit('migis/hr/SET_DEPTS', [], {root: true})
  },
}
</script>

<style>

</style>