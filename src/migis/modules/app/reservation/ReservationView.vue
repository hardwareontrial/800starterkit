<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import ReservationServices from '@/migis/modules/app/reservation/services'

export default {
  components: {},
  mounted() {
    this.$store.commit('migis/SET_PAGEMENU_NAME', 'reservation', {root:true})
  },
  async beforeCreate() {
    await ReservationServices.getRoomResources()
    await ReservationServices.getReservationRooms()
    // await ReservationServices.getReservationNumberLetters
  },
  async created() {},
  async beforeDestroy() {
    this.$store.dispatch('migis/reservation/release', '', {root: true})
    this.$store.commit('migis/SET_PAGEMENU_NAME', '', {root:true})
  },
}
</script>

<style></style>