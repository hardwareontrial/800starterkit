<script>
import {
  BRow, BCol, BFormInput, BFormTextarea, BFormGroup
} from 'bootstrap-vue'

export default {
  props: {
    processing: {
      type: Boolean,
      default: false
    },
    generalProp: {
      type: Object,
      default: {text: '', description: ''},
      required: true,
    },
  },
  components: {
    BRow, BCol, BFormInput, BFormTextarea, BFormGroup
  },
  data() {
    return {
      text: this.generalProp.text,
      description: this.generalProp.description,
    }
  },
  methods: {},
  computed: {},
  watch: {
    'text': {
      handler(nVal, oVal) { if(nVal) { this.$emit('updateFormPermissionGeneral', {text: this.text, description: this.description}) } }
    },
    'description': {
      handler(nVal, oVal) { if(nVal) { this.$emit('updateFormPermissionGeneral', {text: this.text, description: this.description}) } }
    },
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frm-auth-permission-text"
      >
        <template #label>
          <span>Teks Izin <small class="text-danger">*</small>: </span>
        </template>
        <b-form-input
          id="frm-auth-permission-text"
          placeholder="Nama Role"
          :readonly="processing"
          v-model="text"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-auth-permission-desc"
      >
        <template #label>
          <span>Deskripsi <small class="text-danger">*</small>: </span>
        </template>
        <b-form-textarea
          id="frm-auth-permission-desc"
          placeholder="Deskripsi"
          :readonly="processing"
          v-model="description"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style>

</style>