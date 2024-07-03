<template>
  <b-row>
    <!-- <b-col cols="12" md="1"></b-col> -->
    <!-- <b-col cols="12" md="10"> -->
    <b-col cols="12">
      <b-row>
        <b-col cols="12">
          alert
        </b-col>
        <b-col cols="12">
          <app-collapse
            accordion
            type="margin"
          >
            <app-collapse-item title="General Info">
              <form-general />
            </app-collapse-item>
            <app-collapse-item title="Sumber Pertanyaan">
              <b-row>

                <!-- File Upload Name Section -->
                <b-col cols="12" class="mt-0 mb-1" v-if="temporaryFileUpload">File name: {{temporaryFilenameUpload}}</b-col>
                
                <!-- File Upload Section -->
                <b-col cols="12" class="mt-0 mb-1">
                  <b-button
                    variant="primary"
                    class="mr-50 ml-0"
                    @click="$refs.okmUploadFileQuestion.$el.click()"
                    v-show="!temporaryFileUpload"
                  >
                    Pilih File
                  </b-button>
                  <b-button
                    variant="primary"
                    class="mr-50 ml-0"
                    @click="handleProcessingUploadFile"
                    v-show="temporaryFileUpload"
                  >
                    <iconify icon="tabler:file-upload" class="mr-50"/>
                    <span>Unggah</span>
                  </b-button>
                  <b-button
                    variant="danger"
                    class="mr-0 ml-0"
                    @click="resetTemporaryFileUpload"
                    v-show="temporaryFileUpload"
                  >
                    <iconify icon="tabler:trash" class="mr-50"/>
                    <span>Hapus</span>
                  </b-button>
                  <b-form-file
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    placeholder="Pilih file .xlsx"
                    ref="okmUploadFileQuestion"
                    plain
                    :hidden="true"
                    @input="handleTemporaryFileUpload"
                  />
                    <!-- v-model="temporaryFileUpload" -->
                </b-col>

                <!-- Button Download Template Section -->
                <b-col cols="12" class="mt-0 mb-1" v-if="!temporaryFileUpload">
                  <b-button
                    variant="primary"
                    class="mr-0 ml-0"
                    @click="handleDownloadTemplate"
                  >
                    <iconify icon="tabler:file-download" class="mr-50"/>
                    <span>Unduh Template</span>
                  </b-button>
                </b-col>
                
                <!-- Button Open Modal Section -->
                <b-col cols="12" class="mt-0 mb-1" v-if="!temporaryFileUpload">
                  <b-button
                    variant="primary"
                    class="mr-0 ml-0"
                    @click="handleOpenCollectionModal"
                  >
                    <iconify icon="tabler:external-link" class="mr-50"/>
                    <span>Buka Form Pertanyaan</span>
                  </b-button>
                </b-col>

              </b-row>
            </app-collapse-item>
            <app-collapse-item title="Daftar Pertanyaan">
              <question-table
                ref="okmCreateQuestionTable"
                :questionsCollection="temporaryQuestionCollection"
              />
            </app-collapse-item>
          </app-collapse>
        </b-col>
        <!-- {{temporaryQuestionCollection}} -->
        <!-- Button Submit Create Page -->
        <b-col cols="12" class="text-center mt-1">
          <b-button
            variant="primary"
            class="mr-50"
          >
            <iconify icon="tabler:send" class="mr-50"/>
            <span>Tambah</span>
          </b-button>
          <b-button
            variant="danger"
            class="mr-0"
          >
            <iconify icon="tabler:circle-x" class="mr-50"/>
            <span>Batal</span>
          </b-button>
        </b-col>
        
        <!-- Modal Collection Question Form -->
        <b-col cols="12">
          <b-modal
            v-model="showCollectionModal"
            no-close-on-backdrop
            no-close-on-esc
            hide-header-close
            hide-footer
            size="lg"
            title="Form Koleksi Pertanyaan"
          >
            <div class="modal-body">
              <form-collection
                ref="okmQuestionFormCollection"
                @submittinOkmQuestionCollection="handleAddCollection"
              />
            </div>
            <div class="modal-footer">
              <b-button
                variant="flat-primary"
                class="mr-50"
                @click="processingAddCollection"
              >
                <iconify icon="tabler:circle-plus" class="mr-50"/>
                <span>Proses</span>
              </b-button>
              <b-button
                variant="flat-danger"
                class="mr-0"
                @click="cancelAddCollection"
              >
                <iconify icon="tabler:circle-x" class="mr-50"/>
                <span>Tutup</span>
              </b-button>
            </div>
          </b-modal>
        </b-col>
      </b-row>
    </b-col>
    <!-- <b-col cols="12" md="1"></b-col> -->
  </b-row>
</template>

<script>
import {
  BCard, BRow, BCol, BFormGroup, BFormCheckbox, BFormRadioGroup, BFormFile, BLink, BButton,
  BModal,
} from 'bootstrap-vue'
import FormGeneral from './components/QuestionFormGeneral.vue'
import FormCollection from './components/QuestionFormCollection.vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import QuestionTable from './components/QuestionTable.vue'
import OKMServices from '@/migis/modules/app/okm/services'

export default {
  components: {
    BCard, BRow, BCol, BFormGroup, BFormCheckbox, BFormRadioGroup, BFormFile, BLink, BButton,
    BModal,
    FormGeneral, FormCollection,
    AppCollapse, AppCollapseItem,
    QuestionTable,
  },
  data() {
    return {
      processing: false,
      sourceOptions: [
        { value: 'file', text: 'Upload File' },
        { value: 'manual', text: 'Tambah Manual' },
      ],
      temporaryGeneralInfo: {
        isActive: true,
        title: '',
        level: '',
        material_id: '',
      },
      temporarySource: '',
      temporaryFileUpload: null,
      temporaryFilenameUpload: null,
      temporaryQuestionCollection: [],
      showCollectionModal: false,
    }
  },
  methods: {
    resetTemporaryGeneralInfo() {
      this.temporaryGeneralInfo = {
        isActive: true,
        title: '',
        level: '',
        material_id: '',
      }
    },
    resetTemporarySource() { this.temporarySource = '' },
    resetTemporaryFileUpload() { 
      this.temporaryFileUpload = null
      this.handleTemporaryFilenameUpload(null)
    },
    resetTemporaryQuestionCollection() { this.temporaryQuestionCollection = [] },
    handleTemporaryFilenameUpload(value) { this.temporaryFilenameUpload = value },
    handleTemporaryFileUpload(data) {
      const file = data
      const reader = new FileReader()
      if(file){
        reader.onload = data => {
          this.temporaryFileUpload = data.target.result
          this.handleTemporaryFilenameUpload(file.name)
        }
        reader.readAsDataURL(file)
      }
    },
    handleShowCollectionModal(value) { this.showCollectionModal = value },
    handleProcessingUploadFile() {
      //TODO: VALIDATION FOR UPLOADED FILE (temporaryFileUpload) FOR TYPE AND SIZE
      try {
        console.log(this.temporaryFileUpload)
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   const readFileUpload = OKMServices.handleFileUpload(e.target.result)
        //   console.log(readFileUpload)
        // }
      } catch (error) {
        
      }
    },
    handleDownloadTemplate() {
      const filePath = '/files/TemplateSoalOKM_v2.xlsx';
      const link = document.createElement('a');
      link.href = filePath;
      link.download = 'TemplateSoalOKM_v2.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    handleOpenCollectionModal() {
      this.handleShowCollectionModal(true)
      this.$nextTick(() => { this.$refs.okmQuestionFormCollection.clearForm() })
    },
    handleAddCollection(collection) {
      this.temporaryQuestionCollection.push(collection)
    },
    processingAddCollection() {
      this.$refs.okmQuestionFormCollection.submitQuestionCollection()
      this.$refs.okmQuestionFormCollection.clearForm()
    },
    cancelAddCollection() {
      this.$refs.okmQuestionFormCollection.clearForm()
      this.handleShowCollectionModal(false)
    },
  },
}
</script>

<style>

</style>