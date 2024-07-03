<script>
import {
  BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import GaInventarisServices from '@/migis/modules/app/ga-inventaris/services'

export default {
  props: {
    locationProp: {
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
      locationId: this.locationProp
    }
  },
  computed: {
    locationList() {
      return this.$store.state.migis.gainventaris.locationList
    },
  },
  watch: {
    'locationId': {
      handler(value) { this.$emit('updateFormLocationId', value) }
    },
  },
  async beforeCreate() {
    await GaInventarisServices.getDataLocation()
  },
  beforeDestroy() {
    this.$store.commit('migis/gainventaris/SET_LOCATIONLIST', [], {root: true})
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frmLocationId"
      >
        <template #label>
          <span>Lokasi <span class="text-danger" v-if="asterisk">*</span>:</span>
        </template>
        <v-select
          id="frmLocationId"
          label="name"
          :options="locationList"
          :reduce="name => name.id"
          :disabled="processing"
          v-model="locationId"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>