<script>
import {
  BButton, BRow, BCol,BCard, BContainer, BSpinner,
} from 'bootstrap-vue'
import FormComponent from '@/migis/modules/app/ga-inventaris/components/Form.vue'
import store from '@/store'
import GaInventarisServices from '@/migis/modules/app/ga-inventaris/services'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    BButton, BRow, BCol,BCard, BContainer, BSpinner,
    FormComponent,
  },
  data() {
    return {
      processing: false,
    }
  },
  methods: {
    handleProcessing(value) {
      this.processing = value
    },
    async handleCreated(data) {
      await GaInventarisServices.getDataAll()
      this.$bvToast.toast(`Data ditambahkan ${data.kode_brg}`, {
        title: 'Ga Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'success',
      })
      await this.$router.push({name: 'gainventaris-detail', params: {unique: data.kode_brg.replace(/\s+/g, '')} })
    },
    onSubmit() {
      this.$root.$emit('formGainventarisCreate')
    },
    onClose() {
      this.$root.$emit('formGainventarisCreateOnClose')
      this.$router.replace({name: 'gainventaris-dashboard'})
    },
  },
  created() {
    this.$root.$on('formGainventarisProcessing', (event) => this.handleProcessing(event))
    this.$root.$on('formGainventarisCreated', (event) => this.handleCreated(event))
  },
  mounted() {
    _socket.on('auth:gainventaris:merk-created', async (data) => {
      this.$bvToast.toast(`Data ${data.name} Ditambahkan`, {
        title: 'GA Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'info'
      })
    });
    _socket.on('auth:gainventaris:location-created', async (data) => {
      this.$bvToast.toast(`Data ${data.name} Ditambahkan`, {
        title: 'GA Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'info'
      })
    });
  },
  beforeDestroy() {
    _socket.off('auth:gainventaris:merk-created')
    _socket.off('auth:gainventaris:location-created')
    this.$root.$off('formGainventarisProcessing')
    this.$root.$off('formGainventarisCreated')
  },
}
</script>

<template>
  <b-card
    title="Form"
  >
    <b-row>
      <b-col cols="12">
        <form-component />
      </b-col>
      <b-col cols="12" class="text-center" v-if="!processing">
        <b-button
          class="ml-0"
          @click="onSubmit"
          variant="flat-primary"
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
          variant="flat-danger"
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
      <b-col cols="12" class="text-right" v-if="processing">
        <b-button
          class="mr-0"
          variant="flat-secondary"
          disabled
        >
          <b-spinner small class="mr-0"/>
          <span class="ml-25">
            Processing
          </span>
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<style></style>