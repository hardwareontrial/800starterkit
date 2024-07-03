<template>
  <b-alert
    :show="alert.show"
    :variant="alert.variant"
  >
    <div class="alert-body">
      <div v-if="Array.isArray(alert.message)">
        <ul>
          <li
            v-for="m in alert.message"
            :key="`${m}-1`"
          >
            {{ m }}
          </li>
        </ul>
      </div>
      <div
        v-else
      >
        {{ alert.message }}
      </div>
    </div>
  </b-alert>
</template>

<script>
import {
  BAlert,
} from 'bootstrap-vue'

export default {
  components: {
    BAlert,
  },
  props: {
    alert: {
      required: true,
      type: Object,
    },
  },
}
</script>

<style></style>
