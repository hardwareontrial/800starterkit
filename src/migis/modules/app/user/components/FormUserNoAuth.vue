<script>
import store from '@/store'
import vSelect from 'vue-select'
import { BFormGroup, BRow, BCol, BCardText } from 'bootstrap-vue'
import UserServices from '@/migis/modules/app/user/services'

export default {
  props: {
    processing: {
      type: Boolean,
      default: false
    },
    userProp: {
      default: null,
      required: true,
    },
    asterisk: {
      default: false,
    },
  },
  components: {
    vSelect, BFormGroup, BRow, BCol, BCardText,
  },
  data() {
    return{
      userdata: this.userProp,
    }
  },
  methods: {
    resetForm() { this.userdata = null },
  },
  computed: {
    usersList() {
      return store.getters['migis/user/usersNoAuth']
    },
  },
  watch: {
    'userdata': {
      handler(value) { this.$emit('updateFormUsersNoAuth', value) }
    },
  },
  async beforeCreate() {
    await UserServices.getUsers()
  },
  beforeDestroy() {
    this.$store.commit('migis/user/SET_USERS', [], {root: true})
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <b-form-group
        label-for="frmUserNoAuth"
      >
        <template #label>
          <span>User <span class="text-danger" v-if="asterisk">*</span>: </span>
        </template>
        <v-select
          id="frmUserNoAuth"
          v-model="userdata"
          label="fname"
          :options="usersList"
          :disabled="processing"
        >
          <template #option="{ fname, position_id, position, nik }">
            <!-- <b-card-text>{{fname}}</b-card-text> -->
            <span>({{nik}}) {{fname}}</span><br />
            <small class="text-muted">{{position_id ? position.name : ''}}</small>
          </template>
        </v-select>
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>