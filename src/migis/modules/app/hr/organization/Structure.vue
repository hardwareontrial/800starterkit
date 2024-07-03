<template>
  <b-alert variant="secondary" :show="true">
    <div class="alert-body">
      <iconify icon="tabler:alert-hexagon-filled" class="mr-50"/>
      <span>Under construction.</span>
    </div>
  </b-alert>
  <!-- <div class="org-chart">
    {{testPositions}}
    <position-item v-for="position in testPos" :key="position.id" :position="position"/>
  </div> -->
</template>

<script>
import PositionItem from './Structure-PositionItem.vue'
import { BAlert } from 'bootstrap-vue'

export default {
  components: {
    PositionItem,
    BAlert,
  },
  data() {
    return {
      testPositions: [
        {
          "id": 24,
          "position_unique_str": "UFNGCpRG",
          "parent_position_id": 18,
          "name": "IT SUPERVISOR",
          "department_id": 6,
          "level": 5,
          "is_active": 1,
          "department": {
              "id": 6,
              "dept_unique_str": "Dxz50",
              "name": "HRM & GA",
              "is_active": 1
          },
          "hasUsers": [],
          "parent": {
              "id": 18,
              "position_unique_str": "7WVlYqeI",
              "parent_position_id": 15,
              "name": "HRM & GA MANAGER",
              "department_id": 6,
              "level": 4,
              "is_active": 1,
              "parent": {
                  "id": 15,
                  "position_unique_str": "2dUWLImb",
                  "parent_position_id": 8,
                  "name": "GENERAL MANAGER",
                  "department_id": 8,
                  "level": 3,
                  "is_active": 1,
                  "parent": {
                      "id": 8,
                      "position_unique_str": "spN8dfyb",
                      "parent_position_id": null,
                      "name": "DIRECTOR",
                      "department_id": 8,
                      "level": 2,
                      "is_active": 1,
                      "parent": null,
                      "hasUsers": [],
                      "department": {
                          "id": 8,
                          "dept_unique_str": "U5h3T",
                          "name": "CORPORATE",
                          "is_active": 1
                      }
                  },
                  "hasUsers": [],
                  "department": {
                      "id": 8,
                      "dept_unique_str": "U5h3T",
                      "name": "CORPORATE",
                      "is_active": 1
                  }
              },
              "hasUsers": [],
              "department": {
                  "id": 6,
                  "dept_unique_str": "Dxz50",
                  "name": "HRM & GA",
                  "is_active": 1
              }
          },
          "children": [
              {
                  "id": 23,
                  "position_unique_str": "OMaDDVvc",
                  "parent_position_id": 24,
                  "name": "IT STAFF",
                  "department_id": 6,
                  "level": 6,
                  "is_active": 1,
                  "children": [],
                  "hasUsers": [],
                  "department": {
                      "id": 6,
                      "dept_unique_str": "Dxz50",
                      "name": "HRM & GA",
                      "is_active": 1
                  }
              }
          ]
        },
      ],
    }
  },
  computed: {
    activePosition() {
      return this.$store.getters['migis/hr/getActivePosition']
    },
    testPos() {
      return this.activePosition.filter(position => position.id === 26)
    },
  },
}
</script>

<style lang="scss" scoped>
  .org-chart {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 20px;
  }
</style>