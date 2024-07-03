<script>
export default {
  mounted() {
    this.$store.commit('migis/SET_PAGEMENU_NAME', 'delivery-note', {root:true})
  },
  beforeDestroy() {
    this.$store.commit('migis/SET_PAGEMENU_NAME', '', {root:true})
  },
}
</script>

<template>
  <router-view />
</template>

<style>

</style>