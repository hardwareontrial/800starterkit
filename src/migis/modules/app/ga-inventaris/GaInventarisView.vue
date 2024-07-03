<template>
  <div>
    <router-view />
    <form-misc-component />
  </div>
</template>

<script>
import GaInventarisService from './services'
import UserServices from '@/migis/modules/app/user/services'
import FormMiscComponent from '@/migis/modules/app/ga-inventaris/components/FormMisc.vue'
import { BRow, BCol } from 'bootstrap-vue'

export default {
  components: {
    BRow, BCol,
    FormMiscComponent,
  },
  mounted() {
    this.$store.commit('migis/SET_PAGEMENU_NAME', 'ga-inventaris', {root:true})
  },
  async created() {
    await GaInventarisService.init()
    await UserServices.getUsers()
  },
  async beforeDestroy() {
    this.$store.commit('migis/SET_PAGEMENU_NAME', '', {root:true})
    await GaInventarisService.release()
  },
}
</script>

<style></style>