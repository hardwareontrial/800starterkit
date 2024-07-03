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
      default: {name: '', description: ''},
      required: true,
    },
  },
  components: {
    BRow, BCol, BFormInput, BFormTextarea, BFormGroup
  },
  data() {
    return {
      name: this.generalProp.name,
      description: this.generalProp.description,
    }
  },
  methods: {},
  computed: {},
  watch: {
    'name': {
      handler(nVal, oVal) { if(nVal) { this.$emit('updateFormRoleGeneral', {name: this.name, description: this.description}) } }
    },
    'description': {
      handler(nVal, oVal) { if(nVal) { this.$emit('updateFormRoleGeneral', {name: this.name, description: this.description}) } }
    },
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frm-auth-role-name"
      >
        <template #label>
          <span>Nama Role <small class="text-danger">*</small>: </span>
        </template>
        <b-form-input
          id="frm-auth-role-name"
          placeholder="Nama Role"
          :readonly="processing"
          v-model="name"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-auth-role-desc"
      >
        <template #label>
          <span>Deskripsi <small class="text-danger">*</small>: </span>
        </template>
        <b-form-textarea
          id="frm-auth-role-desc"
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