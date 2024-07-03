<script>
import {
  BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'

export default {
  props: {
    numberProp: {
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
      number: this.numberProp,
    }
  },
  methods: {
    isNumber(e){
      e = (e) ? e : window.event;
      let cCode = (e.which) ? e.which : e.kCode;
      if ((cCode > 31 && (cCode < 48 || cCode > 57)) && (cCode < 40 || cCode > 41)) {
        e.preventDefault();
      } else {
        return true;
      }
    },
  },
  watch: {
    'number': {
      handler(value) { this.$emit('updateFormNumber', value) }
    },
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        :label-for="`frmNumber-${label}`"
      >
        <template #label>
          <span>{{label}} <span class="text-danger" v-if="asterisk">*</span>: </span>
        </template>
        <b-form-input
          v-model="number"
          :id="`frmNumber-${label}`"
          :disabled="processing"
          @keypress="isNumber($event)"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style>

</style>