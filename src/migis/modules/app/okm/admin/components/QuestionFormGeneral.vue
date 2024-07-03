<template>
  <b-row>
    <b-col cols="12">
      <custom-alert :alert="alert" />
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-question-status"
      >
        <template #label>
          <span>Status<span class="text-danger">*</span> :</span>
        </template>
        <b-form-checkbox
          id="frm-okm-question-status"
          switch
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-question-title"
      >
        <template #label>
          <span>Nama Soal<span class="text-danger">*</span> :</span>
        </template>
        <b-form-input
          id="frm-okm-question-title"
          :disabled="processing"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-question-level"
      >
        <template #label>
          <span>Bobot Soal<span class="text-danger">*</span> :</span>
        </template>
        <v-select
          :disabled="processing"
          :options="optionsLevel"
          :reduce="text => text.value"
          :clearable="true"
          label="text"
          id="frm-okm-question-level"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-question-material-id"
      >
        <template #label>
          <span>Materi<span class="text-danger">*</span> :</span>
        </template>
        <v-select
          :disabled="processing"
          :options="activeMaterial"
          :reduce="name => name.id"
          :clearable="true"
          label="name"
          id="frm-okm-question-material-id"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormCheckbox, BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import CustomAlert from '@/migis/components/Alert.vue'

export default {
  components: {
    BRow, BCol, BFormGroup, BFormCheckbox, BFormInput,
    vSelect,
    CustomAlert,
  },
  data() {
    return {
      processing: false,
      alert: { show: false, variant: '', message: null },
      optionsLevel: [
        { value: 'beginner', text: 'PEMULA'},
        { value: 'intermediate', text: 'MENENGAH'},
        { value: 'advance', text: 'LANJUTAN'},
      ],
    }
  },
  computed: {
    activeMaterial() {
      return []
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>