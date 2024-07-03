<script>
import AuthorizationService from './services'
import store from '@/store'

export default {
  mounted() {
    AuthorizationService.init()
  },
  beforeDestroy() {
    AuthorizationService.release()
  },
}
</script>

<template>
  <router-view />
</template>

<style></style>