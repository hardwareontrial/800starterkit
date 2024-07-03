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
    permissionProp: {
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
      permissions: this.permissionProp,
    }
  },
  computed: {
    permissionList() {
      return store.state.migis.authorization.permissions
    },
  },
  watch: {
    'permissions': {
      handler() { this.$emit('updateFormPermission', this.permissions) }
    },
  },
  async beforeCreate() {
    await AuthorizationService.getPermissionAll()
  },
  beforeDestroy() {
    this.$store.commit('migis/authorization/SET_PERMISSIONS', [], { root:true })
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frm-auth-role-permission"
      >
        <template #label>
          <span>Izin <span class="text-danger" v-if="asterisk">*</span>: </span>
        </template>
        <v-select
          v-model="permissions"
          multiple
          label="text"
          :options="permissionList"
          :reduce="text => text.id"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>