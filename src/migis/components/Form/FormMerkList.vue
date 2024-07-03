<script>
import {
  BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import GaInventarisServices from '@/migis/modules/app/ga-inventaris/services'

export default {
  props: {
    merkProp: {
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
      merkId: this.merkProp
    }
  },
  computed: {
    merkList() {
      return this.$store.state.migis.gainventaris.merkList
    },
  },
  watch: {
    'merkId': {
      handler(value) { this.$emit('updateFormMerkId', value) }
    },
  },
  async beforeCreate() {
    await GaInventarisServices.getDataMerk()
  },
  beforeDestroy() {
    this.$store.commit('migis/gainventaris/SET_MERKLIST', [], {root: true})
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frmMerkId"
      >
        <template #label>
          <span>Merk <span class="text-danger" v-if="asterisk">*</span>: </span>
        </template>
        <v-select
          id="frmMerkId"
          label="name"
          :options="merkList"
          :reduce="name => name.id"
          :disabled="processing"
          v-model="merkId"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>