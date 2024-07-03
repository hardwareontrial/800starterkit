<script>
import {
  BRow, BCol, BCard, BAlert, BButton, BSpinner,
} from 'bootstrap-vue'
import LogComponent from './components/Log.vue'
import DetailComponent from './components/Detail.vue'
import FormComponent from './components/Form.vue'
import store from '@/store'
import GaInventarisServices from '@/migis/modules/app/ga-inventaris/services'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    BRow, BCol, BCard, BAlert, BButton, BSpinner,
    LogComponent, DetailComponent, FormComponent,
  },
  data() {
    return {
      isEditing: false,
      processing: false,
    }
  },
  computed: {
    dataDetail() {
      let kdBarang = this.$route.params.unique
      const formatted = kdBarang.replace(/(\D+)(\d+)/, "$1 $2")
      return store.getters['migis/gainventaris/detailByCode'](formatted)
    }
  },
  methods: {
    handleIsEditingValue(value) {
      this.isEditing = value
    },
    handleProcessing(value) {
      this.processing = value
    },
    toEditing() {
      this.handleIsEditingValue(true)
      this.$nextTick(() => {
        this.$root.$emit('formGainventarisEditing', this.dataDetail)
        this.$root.$emit('formGainventarisEditValue', true)
      })
    },
    submitUpdating() {
      this.$root.$emit('formGainventarisEdit')
    },
    cancelEditing() {
      this.$root.$emit('formGainventarisEditing', this.dataDetail)
      this.$root.$emit('formGainventarisEditValue', false)
      this.handleIsEditingValue(false)
    },
    handleUpdated(data) {
      this.handleIsEditingValue(false)
      this.handleProcessing(false)
    },
    onClose() {
      this.handleIsEditingValue(false)
      this.handleProcessing(false)
      this.$router.replace({name: 'gainventaris-dashboard'})
    },
  },
  mounted() {
    const unique = this.$route.params.unique
    _socket.on(`auth:gainventaris:updated:${unique}`, async (data) => {
      await GaInventarisServices.getDataAll()
      this.$bvToast.toast(`${data} diperbarui`, {
        title: 'GA Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'success'
      })
    });
    _socket.on(`auth:gainventaris:deleted:${unique}`, async (data) => {
      this.$bvToast.toast(`${data} dihapus.`, {
        title: 'GA Inventaris',
        toaster: 'b-toaster-top-center',
        solid: false,
        variant: 'info'
      })
      await GaInventarisServices.getDataAll()
      this.$router.replace({name: 'gainventaris-dashboard'})
    });
  },
  created() {
    this.$root.$on('formGainventarisProcessing', (event) => this.handleProcessing(event))
    this.$root.$on('formGainventarisUpdated', (event) => this.handleUpdated(event))
  },
  beforeDestroy() {
    _socket.off(`auth:gainventaris:updated:${this.$route.params.unique}`)
    this.$root.$off('formGainventarisUpdated')
  },
}
</script>

<template>
  <b-row>
    <!-- Alert Detail -->
    <b-col cols="12">
      <b-alert
        variant="danger"
        :show="!dataDetail"
      >
        <div class="alert-body">
          <iconify icon="tabler:alert-square-rounded"/>
          <span class="ml-50">Not Found.</span>
        </div>
      </b-alert>
    </b-col>
    <!-- / Alert Detail -->
    <!-- Detail Section -->
    <b-col cols="12" :md="isEditing?'12':'8'" v-if="dataDetail">
      <b-card :title="isEditing ? 'Form' : dataDetail.kode_brg">
        <component
          :is="isEditing ? 'form-component':'detail-component'"
          :data="dataDetail"
        />
        <b-row>
          <b-col cols="12" class="text-center" v-if="!processing">
            <b-button
              class="ml-0"
              variant="flat-primary"
              @click="isEditing ? submitUpdating() : toEditing()"
            >
              <iconify
                :icon="isEditing ? 'tabler:send' : 'tabler:pencil'"
              />
              <span
                class="ml-25"
              >
                {{isEditing ? 'Update':'Ubah'}}
              </span>
            </b-button>
            <b-button
              class="ml-50"
              variant="flat-danger"
              @click="isEditing ? cancelEditing() : onClose()"
            >
              <iconify
                :icon="isEditing ? 'tabler:xbox-x' : 'tabler:arrow-left'"
              />
              <span
                class="ml-25"
              >
                {{isEditing ? 'Batal':'Kembali'}}
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
    </b-col>
    <!-- / Detail Section -->
    <!-- Log Section -->
    <b-col cols="12" md="4" v-if="dataDetail && !isEditing">
      <b-card title="Log Barang">
        <log-component :logs="dataDetail.loginvs"/>
      </b-card>
    </b-col>
    <!-- / Log Section -->
  </b-row>
</template>

<style></style>