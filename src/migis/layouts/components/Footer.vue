<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">

    </span>

    <small class="float-md-right d-none d-md-block">
      <span> © {{ new Date().getFullYear() }} - ITMIG | Theme by Pixinvent</span>
    </small>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
