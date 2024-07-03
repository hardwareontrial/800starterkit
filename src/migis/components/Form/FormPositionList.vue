<script>
import {
  BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import HRServices from '@/migis/modules/app/hr/services'

export default {
  props: {
    positionProp: {
      default: null,
      required: true,
    },
    processing: {
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
      positionId: this.positionProp
    }
  },
  computed: {
    positionsList() {
      return this.$store.state.migis.hr.positions
    },
  },
  watch: {
    'positionId': {
      handler(value) { this.$emit('updateFormPositionId', value) }
    },
  },
  async beforeCreate() {
    await HRServices.getPositionAll()
  },
  created() {},
  mounted() {},
  beforeDestroy() {
    this.$store.commit('migis/hr/SET_POSITIONS', [], {root: true})
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frmPositonId"
      >
        <template #label>
          <span>Jabatan : </span>
        </template>
        <v-select
          id="frmPositonId"
          label="name"
          :options="positionsList"
          :reduce="name => name.id"
          :disabled="processing"
          v-model="positionId"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>