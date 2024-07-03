<template>
  <b-row>

    <!-- Alert -->
    <b-col cols="12">
      <custom-alert :alert="alert" />
    </b-col>

    <!-- Question -->
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-qst-collection-question"
        label-cols-md="3"
      >
        <template #label>
          <span>Pertanyaan<span class="text-danger">*</span> :</span>
        </template>
        <b-row>
          <b-col cols="12">
            <b-form-textarea
              class="my-25"
              id="frm-okm-qst-collection-question"
              placeholder="Buat pertanyaan..."
              v-model="formCollection.question.text"
            />
          </b-col>
          <b-col cols="12">
            <b-media no-body class="my-25">
              <b-media-aside>
                <b-img
                  :src="imagePreview.imageQuestion"
                  width="50"
                  height="50"
                  rounded
                />
              </b-media-aside>
              <b-media-body>
                <b-button
                  variant="primary"
                  size="sm"
                  class="mr-50"
                  @click="$refs.questionCollectionImage.$el.click()"
                >
                  <span>{{ imagePreview.imageQuestion ? 'Ganti' : 'Upload' }}</span>
                </b-button>
                <b-button
                  variant="danger"
                  size="sm"
                  @click="removeImagePreviewQuestion"
                  v-if="imagePreview.imageQuestion"
                >
                  <span>Hapus</span>
                </b-button>
                <b-form-file
                  @input="imagePreviewQuestion"
                  :hidden="true"
                  ref="questionCollectionImage"
                  accept=".jpg, .png,"
                  type="file"
                  plain
                />
              </b-media-body>
            </b-media>
          </b-col>
        </b-row>
        
        <!--  -->
      </b-form-group>
    </b-col>

    <!-- Answer Option -->
    <b-col cols="12">
      <b-form-group
        label-for="frm-okm-qst-collection-answer-opt"
        label-cols-md="3"
      >
        <template #label>
          <span>Opsi Jawaban<span class="text-danger">*</span> :</span>
        </template>
        <b-form-radio-group
          id="frm-okm-qst-collection-answer-opt"
          @input="handleAnswerOption"
          :options="answerOption"
          v-model="formCollection.type"
        />
      </b-form-group>
    </b-col>

    <!-- Multiple Choice Answers -->
    <b-col cols="12" v-if="formCollection.type === 'multiple'">
      <b-row>
        <b-col cols="12">
          <b-form-group
            label-for="frm-okm-qst-collection-answers"
            label-cols-md="3"
          >
            <template #label>
              <span>Pilihan Ganda<span class="text-danger">*</span> :</span>
            </template>
            <b-row v-for="(a, i) in temporaryMultipleAnswers" :key="i">
              <b-col cols="12">
                <b-form-textarea
                  class="my-25"
                  :placeholder="`Pilihan ${i +1}`"
                  :id="`frm-okm-qst-collection-answers-${i}`"
                  v-model="a.text"
                />
              </b-col>
              <b-col cols="12">
                <b-media no-body class="my-25">
                  <b-media-aside>
                    <b-img
                      :src="imagePreview.imageMultipleChoice[i]"
                      width="50"
                      height="50"
                      rounded
                    />
                  </b-media-aside>
                  <b-media-body>
                    <b-button
                      variant="primary"
                      size="sm"
                      class="mr-50"
                      @click="$refs.questionCollectionAnswerImage[i].$el.click()"
                    >
                      <span>{{ imagePreview.imageMultipleChoice[i] ? 'Ganti' : 'Upload' }}</span>
                    </b-button>
                    <b-button
                      variant="danger"
                      size="sm"
                      @click="removeImagePreviewAnswer(i)"
                      v-if="imagePreview.imageMultipleChoice[i]"
                    >
                      <span>Hapus</span>
                    </b-button>
                    <b-form-file
                      @input="imagePreviewAnswer(i, $event)"
                      :hidden="true"
                      v-model="a.image"
                      ref="questionCollectionAnswerImage"
                      accept=".jpg, .png,"
                      type="file"
                      plain
                    />
                  </b-media-body>
                </b-media>
              </b-col>
              <b-col cols="12">
                <b-button
                  class="btn-icon rounded-circle mr-50"
                  variant="flat-primary"  
                  size="sm"
                  @click="addAnswerOptions(i)"
                  v-show="i === temporaryMultipleAnswers.length-1 && temporaryMultipleAnswers.length < 4"
                >
                  <iconify icon="tabler:circle-plus"/>
                </b-button>
                <b-button
                  class="btn-icon rounded-circle"
                  variant="flat-danger"
                  size="sm"
                  v-show="temporaryMultipleAnswers.length !== 1"
                  @click="removeAnswerOptions(i)"
                >
                  <iconify icon="tabler:circle-minus"/>
                </b-button>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
        <b-col cols="12">
          <b-form-group
            label-for="frm-okm-qst-collection-answers-key"
            label-cols-md="3"
          >
            <template #label>
              <span>Jawaban Benar<span class="text-danger">*</span> :</span>
            </template>
            <v-select
              :options="multipleChoice"
              :reduce="text=>text.value"
              :clearable="false"
              v-model="temporaryMultipleAnswersKey"
              label="text"
              id="frm-okm-qst-collection-answers-key"
              placeholder="Pilih Jawaban"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-col>

    <!-- Single Answer -->
    <b-col cols="12" v-if="formCollection.type === 'single'">
      <b-form-group
        label-for="frm-okm-qst-collection-answer"
        label-cols-md="3"
      >
        <template #label>
          <span>Jawaban :</span>
        </template>
        <b-form-textarea
          id="frm-okm-qst-collection-answer"
          v-model="temporarySingleAnswer"
        />
      </b-form-group>
    </b-col>

    <!-- Clear Form Button -->
    <!-- <b-col cols="12" class="text-center">
      <b-button
        variant="danger"
        @click="clearForm"
      >
        <span>Bersihkan Form</span>
      </b-button>
    </b-col> -->

  </b-row>
</template>

<script>
import {
  BRow, BCol,BFormGroup, BFormTextarea, BFormInput, BFormFile, BButton, BFormRadioGroup, BMedia, BMediaAside, BMediaBody, BImg,
} from 'bootstrap-vue'
import CustomAlert from '@/migis/components/Alert.vue'
import vSelect from 'vue-select'

export default {
  components: {
    BRow, BCol,BFormGroup, BFormTextarea, BFormInput, BFormFile, BButton, BFormRadioGroup, BMedia, BMediaAside, BMediaBody, BImg,
    CustomAlert,
    vSelect,
  },
  data() {
    return{
      alert: { show: false, variant: '', message: null },
      answerOption: [
        { value: 'multiple', text: 'PILIHAN GANDA' },
        { value: 'single', text: 'ISIAN' },
      ],
      formCollection: {
        id: null,
        question_id: null,
        question: { image: null, text: ''},
        type: '',
        answerOptions: [],
        answerKey: null,
        collection_index: null,
      },
      multipleChoice: [{ text: 'Pilihan 1', value : 1 }],
      temporaryMultipleAnswers: [{ image: null, text: ''}],
      temporarySingleAnswer: '',
      temporaryMultipleAnswersKey: null,
      imagePreviewProps: {
        blank: true,
        width: 75,
        height: 75,
      },
      imagePreview: {
        imageQuestion: null,
        imageMultipleChoice: [null, null, null, null],
      },
    }
  },
  methods: {
    clearForm() {
      this.resetFormCollection()
      this.resetTemporarySingleAnswer()
      this.resetTemporaryMultipleAnswers()
      this.resetMultipleChoice()
    },
    resetFormCollection() {
      this.formCollection = {
        id: null,
        question_id: null,
        question: { image: null, text: ''},
        type: '',
        answerOptions: [],
        answerKey: null,
        collection_index: null,
      }
    },
    resetTemporarySingleAnswer() {
      this.temporarySingleAnswer = ''
    },
    resetTemporaryMultipleAnswers() {
      this.temporaryMultipleAnswers = [{ image: null, text: ''}]
    },
    resetMultipleChoice() {
      this.multipleChoice = [{ text: 'Pilihan 1', value : 1 }]
    },
    imagePreviewQuestion(data){
      const file = data
      const reader = new FileReader()
      if(file){
        reader.onload = data => {
          this.imagePreview.imageQuestion = data.target.result
          this.formCollection.question.image = data.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    removeImagePreviewQuestion(){
      this.imagePreview.imageQuestion = null
      this.formCollection.question.image = null
    },
    imagePreviewAnswer(index, evt) {
      const file = evt
      const reader = new FileReader()
      if(file){
        reader.onload = data => {
          this.imagePreview.imageMultipleChoice.splice(index, 1, data.target.result)
        }
        reader.readAsDataURL(file)
      }
    },
    removeImagePreviewAnswer(index) {
      this.imagePreview.imageMultipleChoice.splice(index, 1, null)
    },
    addAnswerOptions(index) {
      const xnum = index +2;
      this.temporaryMultipleAnswers.push({ image: null, text: ''});
      this.multipleChoice.push({ text: 'Pilihan '+xnum, value : xnum })
    },
    removeAnswerOptions(index) {
      this.removeImagePreviewAnswer(index)
      this.temporaryMultipleAnswers.splice(index, 1)
      this.multipleChoice.pop()
    },
    submitQuestionCollection() {
      if(this.formCollection.type === 'multiple') {
        this.formCollection.answerOptions = this.temporaryMultipleAnswers
        this.formCollection.answerKey = this.temporaryMultipleAnswersKey
      }
      if(this.formCollection.type === 'single') { this.formCollection.answerKey = this.temporarySingleAnswer }
      this.$emit('submittinOkmQuestionCollection', this.formCollection)
    },
    handleAnswerOption(evt) {
      if(evt) {
        this.resetTemporaryMultipleAnswers()
        this.resetTemporarySingleAnswer()
      }
    },
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
</style>