<template>
  <b-alert :show="alert.show" :variant="alert.variant">
    <div class="alert-body">
      <div v-if="Array.isArray(alert.message)">
        <li v-for="m in alert.message" :key="`${m}-1`">{{m}}</li>
      </div>
      <div v-else>
        {{alert.message}}
      </div>
    </div>
  </b-alert>
</template>

<script>
import { BAlert } from 'bootstrap-vue'

export default {
  props: [ 'alert' ],
  components: { BAlert },
}
</script>

<style>

</style>