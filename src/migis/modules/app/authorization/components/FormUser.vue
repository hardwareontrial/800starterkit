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
    userProp: {
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
      users: this.userProp,
    }
  },
  computed: {
    usersList() {
      return store.getters['migis/user/usersNoAdminNoExtActive']
    },
  },
  watch: {
    'users': {
      handler(nVal, oVal) { if(nVal) { this.$emit('updateFormUsers', this.users) } }
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
          <span>User : </span>
        </template>
        <v-select
          v-model="users"
          multiple
          label="fname"
          :options="usersList"
          :reduce="fname => fname.user_id"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>