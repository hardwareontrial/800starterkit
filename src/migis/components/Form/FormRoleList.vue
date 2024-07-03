<script>
import store from '@/store'
import vSelect from 'vue-select'
import { BFormGroup, BRow, BCol } from 'bootstrap-vue'
import AuthorizationService from '@/migis/modules/app/authorization/services'

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
    asterisk: {
      type: Boolean,
      default: true,
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
      handler() { this.$emit('updateFormRole', this.roles) }
    },
  },
  async beforeCreate() {
    await AuthorizationService.getRoleAll()
  },
  beforeDestroy() {
    this.$store.commit('migis/authorization/SET_ROLES', [], { root:true })
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
          <span>Role <span class="text-danger" v-if="asterisk">*</span>: </span>
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