<script>
import store from '@/store'
import vSelect from 'vue-select'
import { BFormGroup, BRow, BCol } from 'bootstrap-vue'

export default {
  props: {
    processing: {
      type: Boolean,
      default: false
    },
    roleProp: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  components: {
    vSelect, BFormGroup, BRow, BCol
  },
  data() {
    return{
      roles: this.roleProp,
    }
  },
  computed: {
    rolesList() {
      return store.state.migis.authorization.roles
    },
  },
  watch: {
    'roles': {
      handler(nVal, oVal) { if(nVal) { this.$emit('updateFormRole', this.roles) } }
    },
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frm-auth-role-roles"
      >
        <template #label>
          <span>Role : </span>
        </template>
        <v-select
          v-model="roles"
          multiple
          label="name"
          :options="rolesList"
          :reduce="name => name.id"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>