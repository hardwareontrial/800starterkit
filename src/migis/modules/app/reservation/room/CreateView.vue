<template>
  <b-row>
    <b-col cols="12" md="2"></b-col>
    <b-col cols="12" md="8">
      <b-card no-body>
        <div class="card-header">
          <b-card-title>Form</b-card-title>
        </div>
        <div class="card-body">
          <b-row>
            <b-col cols="12">
              <form-component ref="frmReservationRoom"/>
            </b-col>
            <b-col cols="12" class="text-center">
              <b-button
                variant="flat-primary"
                class="mr-50"
                @click="submitCreate"
              >
                <iconify icon="tabler:circle-plus" class="mr-50"/>
                <span> Tambah </span>
              </b-button>
              <b-button
                variant="flat-danger"
                class="mr-0"
                @click="cancelCreate"
              >
                <iconify icon="tabler:circle-x" class="mr-50"/>
                <span> Kembali </span>
              </b-button>
            </b-col>
          </b-row>    
        </div>
      </b-card>
    </b-col>
    <b-col cols="12" md="2"></b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BCard, BButton, BCardTitle,
} from 'bootstrap-vue'
import FormComponent from './components/Form.vue'

export default {
  components: {
    BRow, BCol, BCard, BButton, BCardTitle,
    FormComponent,
  },
  methods: {
    submitCreate() {
      this.$refs.frmReservationRoom.submitCreate()
    },
    cancelCreate() {
      this.$refs.frmReservationRoom.resetForm()
      this.$router.replace({name: 'reservation-room-dashboard'})
    },
  },
}
</script>

<style>

</style>