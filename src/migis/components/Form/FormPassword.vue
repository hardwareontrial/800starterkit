<script>
import {
  BRow, BCol, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

export default {
  props: {
    passwordProp: {
      type: String,
      default: '',
      required: true,
    },
    processing: {
      type: Boolean,
      default: false,
      required: true,
    },
    label: {
      type: String,
      default: 'Password',
      required: true,
    },
    asterisk: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  components: {
    BRow, BCol, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return{
      passwordText: this.passwordProp,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'tabler:eye-off' : 'tabler:eye'
    },
  },
  watch: {
    'passwordText': {
      handler(value) { this.$emit('updateFormPassword', value) }
    }
  }
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frm-user"
      >
        <template #label>
          <span>{{label}} <span class="text-danger" v-if="asterisk">*</span>: </span>
        </template>
        <b-input-group
          class="input-group-merge"
        >
          <b-form-input
            :type="passwordFieldType"
            :disabled="processing"
            v-model="passwordText"
          />
          <b-input-group-append is-text>
            <div @click="togglePasswordVisibility">
              <iconify
                class="cursor-pointer"
                :icon="passwordToggleIcon"
                :style="{fontSize: '16px'}"
              />
            </div>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style>

</style>