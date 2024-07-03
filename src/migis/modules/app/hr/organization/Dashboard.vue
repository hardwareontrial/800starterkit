<template>
  <b-row>
    <b-col cols="12">
      <b-tabs
        pills
        justified
      >
        <b-tab
          active
        >
          <template #title>
            <iconify icon="tabler:chalkboard" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Departemen</span>
          </template>
          <department-component
            ref="refHrDepartment"
            @openFormCreate="handleOpenFormCreateDept"
            @openFormEditing="handleOpenFormEditingDept"
          />
        </b-tab>
        <b-tab>
          <template #title>
            <iconify icon="tabler:chalkboard" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Posisi</span>
          </template>
          <position-component
            ref="refHrPosition"
            @openFormCreate="handleOpenFormCreatePosition"
            @openFormEditing="handleOpenFormEditingPosition"
          />
        </b-tab>
        <b-tab>
          <template #title>
            <iconify icon="tabler:chalkboard" class="mr-0 mr-sm-50"/>
            <span class="d-none d-sm-inline">Struktur</span>
          </template>
          <structure-component
            ref="refHRStructure"
          />
        </b-tab>
      </b-tabs>
    </b-col>
    <b-col cols="12">
      <department-modal ref="modalHRDept" />
      <position-modal ref="modalHRPosition" />
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BTabs, BTab, BCard,
} from 'bootstrap-vue'
import DepartmentComponent from '@/migis/modules/app/hr/organization/Department.vue'
import PositionComponent from '@/migis/modules/app/hr/organization/Position.vue'
import DepartmentModal from './ModalDepartment.vue'
import PositionModal from './ModalPosition.vue'
import StructureComponent from './Structure.vue'

export default {
  components: {
    BRow, BCol, BTabs, BTab, BCard,
    DepartmentComponent, DepartmentModal, PositionComponent, PositionModal, StructureComponent,
  },
  methods: {
    handleOpenFormCreateDept() {
      this.$refs.modalHRDept.handleShowModal(true)
    },
    handleOpenFormEditingDept(department) {
      this.$refs.modalHRDept.handleShowModal(true)
      this.$nextTick(() => this.$refs.modalHRDept.handleFormEditing(department))
    },
    handleOpenFormCreatePosition() {
      this.$refs.modalHRPosition.handleShowModal(true)
    },
    handleOpenFormEditingPosition(position) {
      this.$refs.modalHRPosition.handleShowModal(true)
      this.$nextTick(() => this.$refs.modalHRPosition.handleFormEditing(position))
    },
  },
}
</script>

<style>

</style>