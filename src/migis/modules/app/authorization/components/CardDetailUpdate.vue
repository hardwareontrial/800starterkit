<script>
import {
  BCard, BButton, BCardTitle, BSpinner,
} from 'bootstrap-vue'

export default {
  props: {
    titleOnEditing: { type: String, required: true },
    title: { type: String, required: true },
    processing: { type: Boolean, required: true }
  },
  components: {
    BCard, BButton, BCardTitle, BSpinner,
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    handleEditing(value) { this.editing = value },
  },
}
</script>

<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <b-card-title>
        {{editing ? this.titleOnEditing : this.title}}
      </b-card-title>
      <div
        v-if="processing"
        class="text-muted"
      >
        <b-spinner
          small
        />
        <span class="ml-50">Processing</span>
      </div>
      <div
        v-if="!editing && !processing"
        @click="handleEditing(true)"
        style="cursor:pointer;"
      >
        <iconify
          icon="tabler:pencil"
          class="text-primary"
        />
      </div>
    </div>
    <div class="card-body">
      <slot name="contentEdit" v-if="editing"></slot>
      <slot name="contentView" v-else></slot>
    </div>
  </b-card>
</template>

<style>

</style>