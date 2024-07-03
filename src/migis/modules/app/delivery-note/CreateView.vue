<template>
  <b-card
    title="Form Surat Jalan"
  >
    <b-row>
      <b-col cols="12">
        <form-component />
      </b-col>
      <b-col
        cols="12"
        class="mt-1 text-center"
        v-if="!isProcessing"
      >
        <b-button
          class="ml-0"
          @click="onSubmit"
          :variant="`flat-${isProcessing ? 'secondary':'primary'}`"
          :disabled="isProcessing"
        >
          <iconify
            icon="tabler:send"
          />
          <span
            class="ml-25"
          >
            Tambah
          </span>
        </b-button>
        <b-button
          class="ml-50"
          @click="onClose"
          :variant="`flat-${isProcessing ? 'secondary':'danger'}`"
          :disabled="isProcessing"
        >
          <iconify
            icon="tabler:arrow-left"
          />
          <span
            class="ml-25"
          >
            Kembali
          </span>
        </b-button>
      </b-col>
      <b-col
        cols="12"
        class="mt-1 text-center"
        v-if="isProcessing"
      >
        <b-button
          class="ml-0"
          variant="flat-secondary"
          :disabled="isProcessing"
        >
          <iconify
            icon="tabler:hourglass"
          />
          <span
            class="ml-25"
          >
            Proses ...
          </span>
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BContainer, BButton, BRow, BCol, BCard, } from 'bootstrap-vue'
import FormComponent from '@/migis/modules/app/delivery-note/components/Form.vue'


export default {
  components: {
    BContainer, BButton, BRow, BCol,BCard,
    FormComponent,
  },
  data() {
    return{
      isProcessing: false,
    }
  },
  methods: {
    handleProcessing(value){
      this.isProcessing = value
    },
    async onSubmit(){
      this.$root.$emit('formDeliveryNoteCreate', {processing: true})
    },
    async onClose(){
      this.$root.$emit('formDeliveryNoteCreateOnClose')
      this.$router.replace({name: 'deliveryNote-dashboard-view'})
    },
    handleCreated(data) {
      this.$bvToast.toast(`Nomor Baru ${data.delivery_no}`, {
        title: 'Surat Jalan',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'success',
      })
      this.$router.push({ name: 'deliveryNote-detail-view', params: {unique: data.delivery_no} })
    }
  },
  created() {
    this.$root.$on('formDeliveryNoteProcessing', (data) => { this.handleProcessing(data.processing) })
    this.$root.$on('formDeliveryNoteCreated', (data) => { this.handleCreated(data) })
  },
  beforeDestroy() {
    this.$root.$off('formDeliveryNoteProcessing')
  },
}
</script>

<style></style>