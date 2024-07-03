<script>
import {
  BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import HRServices from '@/migis/modules/app/hr/services'

export default {
  props: {
    deptProp: {
      default: null,
      required: true,
    },
    processing: {
      type: Boolean,
      default: false,
      required: true,
    },
    asterisk: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  components: {
    BRow, BCol, BFormGroup,
    vSelect,
  },
  data(){
    return{
      deptId: this.deptProp
    }
  },
  computed: {
    deptList() {
      return this.$store.state.migis.hr.departments
    },
  },
  watch: {
    'deptId': {
      handler(value) { this.$emit('updateFormDeptId', value) }
    },
  },
  async beforeCreate() {
    await HRServices.getDeptsAll()
  },
  beforeDestroy() {
    this.$store.commit('migis/hr/SET_DEPTS', [], {root: true})
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frmDeptId"
      >
        <template #label>
          <span>Departemen <span class="text-danger" v-if="asterisk">*</span>: </span>
        </template>
        <v-select
          id="frmDeptId"
          label="name"
          :options="deptList"
          :reduce="name => name.id"
          :disabled="processing"
          v-model="deptId"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>