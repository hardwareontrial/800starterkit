<template>
  <b-modal
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    hide-header
    v-model="show"
    size="md"
  >
    <div class="modal-body text-center">
      <iconify
        icon="tabler:lock-access"
        class="text-danger"
        :style="{ fontSize: '21px' }"
      />
      <span
        class="ml-50 text-danger"
      >
        UNAUTHORIZED
      </span>
    </div>
  </b-modal>
</template>

<script>
import {
  BModal, BAlert, BRow, BCol,
} from 'bootstrap-vue'

export default {
  components: {
    BModal, BAlert, BRow, BCol,
  },
  computed: {
    show() {
      return this.$store.state.migis.unAuthorizedAlert
    }
  },
}
</script>

<style></style>