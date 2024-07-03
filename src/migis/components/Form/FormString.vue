<script>
import {
  BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'

export default {
  props: {
    stringProp: {
      required: true,
      default: null,
    },
    processing: {
      type: Boolean,
      default: false,
    },
    label: {
      default: '',
      type: String,
      required: true,
    },
    asterisk: {
      default: false,
      type: Boolean,
      required: true,
    }
  },
  components: {
    BRow, BCol, BFormGroup, BFormInput,
  },
  data() {
    return{
      string: this.stringProp,
    }
  },
  watch: {
    'string': {
      handler(value) { this.$emit('updateFormString', value) }
    },
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        :label-for="`frmString-${label}`"
      >
        <template #label>
          <span>{{label}} <span class="text-danger" v-if="asterisk">*</span>: </span>
        </template>
        <b-form-input
          v-model="string"
          :id="`frmString-${label}`"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style>

</style>