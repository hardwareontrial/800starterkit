<template>
  <b-table-simple
    responsive
    bordered
  >
    <b-thead>
      <b-tr>
        <b-th width="20%" rowspan="2">Pertanyaan</b-th>
        <b-th width="7%" rowspan="2">Tipe</b-th>
        <b-th colspan="4">Pilihan</b-th>
        <b-th width="7%" rowspan="2">Kunci</b-th>
        <b-th width="6%" rowspan="2">Opsi</b-th>
      </b-tr>
      <b-tr>
        <b-th>Opsi 1</b-th>
        <b-th>Opsi 2</b-th>
        <b-th>Opsi 3</b-th>
        <b-th>Opsi 4</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="(question, index) in questionsCollection" :key="index">
        <b-td>
          <b-row>
            <b-col cols="12" class="text-center">
              <b-img
                :src="question.question.image"
                width="50"
                height="50"
                rounded
              />
            </b-col>
            <b-col cols="12">
              {{question.question.text}}
            </b-col>
          </b-row>
        </b-td>
        <b-td>{{question.type}}</b-td>
        <b-td v-for="(option, optionIndex) in colArray(question.answerOptions)" :key="optionIndex">
          {{option}}
        </b-td>
        <!-- <b-td>pilihan</b-td>
        <b-td>pilihan</b-td>
        <b-td>pilihan</b-td> -->
        <b-td>{{question.answerKey}}</b-td>
        <b-td>opsi</b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import {
  BTableSimple, BTr, BThead, BTh, BTbody, BTd, BImg, BRow, BCol,
} from 'bootstrap-vue';

export default {
  props: {
    questionsCollection: { type: Array, required: true },
  },
  components: {
    BTableSimple, BTr, BThead, BTh, BTbody, BTd, BImg, BRow, BCol,
  },
  methods: {
    colArray(array) {
      let conditionalArray = [...array];
      const countNulled = 4 - (array.length);
      if(countNulled >= 0) {
        for(let i=0; i<countNulled;i++) {
          conditionalArray.push({image: null, text: ''})
        }
      }
      return conditionalArray
    },
  },
}
</script>

<style>

</style>