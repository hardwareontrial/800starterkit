<template>
  <b-modal
    v-model="showModal"
    no-close-on-backdrop
    no-close-on-esc
    hide-header-close
    hide-footer
    size="lg"
    title="Form Materi"
  >
    <div class="modal-body">
      <material-form-component ref="refOKMAdmMaterialForm" :processing="processing" class="mb-1"/>
      <b-row>
        <b-col cols="12" class="text-right">
          <b-button
            class="mr-50"
            :variant="`flat-${processing ? 'secondary' : 'primary'}`"
            :disabled="processing"
          >
            <iconify icon="tabler:send" class="mr-50"/>
            <span>Kirim</span>
          </b-button>
          <b-button
            class="mr-0"
            :variant="`flat-${processing ? 'secondary' : 'danger'}`"
            :disabled="processing"
            @click="closeModal"
          >
            <iconify icon="tabler:circle-x" class="mr-50"/>
            <span>Tutup</span>
          </b-button>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script>
import {
  BModal, BButton, BRow, BCol,
} from 'bootstrap-vue'
import MaterialFormComponent from './MaterialForm.vue'

export default {
  components: {
    BModal, BButton, BRow, BCol,
    MaterialFormComponent,
  },
  data() {
    return {
      showModal: false,
      processing: false,
    }
  },
  methods: {
    handleShowModal(value) { this.showModal = value },
    handleProcessing(value) { this.processing = value },
    closeModal() {
      this.$refs.refOKMAdmMaterialForm.resetForm()
      this.handleShowModal(false)
    },
  },
}
</script>

<style>

</style>