<template>
  <b-modal
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    hide-header
    v-model="properties.show"
    size="sm"
  >
    <div class="modal-body">
      <iconify
        :icon="properties.icon"
        :style="{ fontSize: '16px' }"
        :class="`text-${properties.variant}`"
      />
      <span
        class="ml-50"
        :class="`text-${properties.variant}`"
      >
        {{ properties.message }}
      </span>
    </div>
  </b-modal>
</template>

<script>
import {
  BModal, BAlert,
} from 'bootstrap-vue'

export default {
  components: {
    BModal, BAlert,
  },
  data() {
    return {
      show: true
    }
  },
  computed: {
    properties() {
      return this.$store.state.migis.alertModal
    },
  },
}
</script>

<style></style>