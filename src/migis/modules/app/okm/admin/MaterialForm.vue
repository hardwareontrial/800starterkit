<template>
  <b-row>
    <b-col cols="12">
      <custom-alert :alert="alertMaterial" />
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-material-status"
      >
        <template #label>
          <span>Status<span class="text-danger">*</span> :</span>
        </template>
        <b-form-checkbox
          id="frm-okm-material-status"
          switch
          :disabled="processing"
          v-model="formMaterial.isActive"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-material-name"
      >
        <template #label>
          <span>Judul Materi<span class="text-danger">*</span> :</span>
        </template>
        <b-form-input
          id="frm-okm-material-name"
          :disabled="processing"
          v-model="formMaterial.title"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-material-dept"
      >
        <template #label>
          <span>Departemen<span class="text-danger">*</span> :</span>
        </template>
        <v-select
          :disabled="processing"
          :options="activeDepartment"
          :reduce="name => name.id"
          :clearable="true"
          v-model="formMaterial.department_id"
          label="name"
          id="frm-okm-material-dept"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-material-leveling"
      >
        <template #label>
          <span>Bobot Level<span class="text-danger">*</span> :</span>
        </template>
        <v-select
          :disabled="processing"
          :options="optionsLevel"
          :reduce="text => text.value"
          :clearable="true"
          v-model="formMaterial.level"
          label="text"
          id="frm-okm-material-leveling"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-material-desc"
      >
        <template #label>
          <span>Sinopsis<span class="text-danger">*</span> :</span>
        </template>
        <b-form-textarea
          rows="3"
          max-rows="8"
          id="frm-okm-material-desc"
          :disabled="processing"
          v-model="formMaterial.sinopsis"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-material-upload"
      >
        <template #label>
          <span>File <small class="text-muted">PDF</small> :</span>
        </template>
        <b-form-file
          id="frm-okm-material-upload"
          placeholder="Pilih file PDF atau tarik file kesini..."
          accept="application/pdf"
          :disabled="processing"
          v-model="formMaterial.file"
        />
      </b-form-group>
    </b-col>
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-material-desc"
      >
        <template #label>
          <span>Deskripsi :</span>
        </template>
        <b-form-textarea
          rows="3"
          max-rows="8"
          id="frm-okm-material-desc"
          :disabled="processing"
          v-model="formMaterial.description"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormFile, BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import CustomAlert from '@/migis/components/Alert.vue'

export default {
  props: {
    processing: { type: Boolean, required: true },
  },
  components: {
    BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormFile, BFormCheckbox,
    vSelect,
    CustomAlert,
  },
  data() {
    return {
      alertMaterial: { show: false, variant: '', message: null },
      formMaterial: {
        title: '',
        department_id: null,
        level: null,
        description: '',
        file: null,
        isActive: true,
        sinopsis: '',
      },
      optionsLevel: [
        { value: 'beginner', text: 'PEMULA'},
        { value: 'intermediate', text: 'MENENGAH'},
        { value: 'advance', text: 'LANJUTAN'},
      ],
    }
  },
  methods: {
    handleAlertMaterial(show, variant, message) { this.alertMaterial = { show: show, variant: variant, message: message } },
    resetForm() {
      this.formMaterial = {
        title: '',
        department_id: null,
        level: null,
        description: '',
        file: null,
        isActive: true,
        sinopsis: '',
      }
    },
  },
  computed: {
    activeDepartment() {
      return this.$store.getters['migis/hr/getActiveDepartment']
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>