<script>
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'
import { BButton } from 'bootstrap-vue'

export default {
  props: {
    logs: { default: () => [], type: Array },
  },
  data() {
    return {
      limit: 5,
      currentPage: 1,
    }
  },
  components: {
    AppTimeline, AppTimelineItem,
    BButton,
  },
  methods: {
    prevData(){
      this.currentPage--
    },
    nextData(){
      this.currentPage++
    },
  },
  computed: {
    logsPaginate() {
      const countFilteredArray = this.logs.length
      const totalPages = Math.ceil(countFilteredArray/this.limit)
      this.currentPage = Math.min(Math.max(1, this.currentPage), totalPages)
      const startIndex = (this.currentPage -1)*this.limit
      const endIndex = startIndex +this.limit
      const itemsForPage = this.logs.slice(startIndex, endIndex)
      const from = ((this.currentPage -1)*this.limit)+1
      const to = Math.min((this.currentPage*this.limit), countFilteredArray)
      return {
        items: itemsForPage,
        total: countFilteredArray,
        currentPage: Math.max(this.currentPage, 1),
        totalPages: totalPages,
        per_page: this.limit,
        from: Math.max(from, 0),
        to: to,
      }
    }
  },
}
</script>

<template>
  <div>
    <app-timeline>
      <app-timeline-item
        v-for="(log, idx) of logsPaginate.items"
        :key="idx"
        :variant="!!log.n_is_active ? (
          log.n_status_id === 4 ? 'warning' : (log.action === 1 ? 'primary' : 'success')
        ) : 'secondary' "
      >
        <template>
          <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
            <h5>
              {{log.action === 1 ? 'Register' : ( log.n_status_id === 4 ? 'Maintenance' : 'Update' ) }}
            </h5>
            <small class="timeline-item-time text-nowrap text-muted">
              {{$moment(log.created_at).fromNow()}}
            </small>
          </div>
          <li v-for="(itemLog, j) in JSON.parse(log.logs)" :key="j">- {{itemLog}}</li>
          <small class="text-nowrap text-muted">Oleh: {{log.creator}}</small>
        </template>
      </app-timeline-item>
    </app-timeline>
    <div class="text-center mt-2">
      <b-button
        class="btn-icon rounded-circle mr-50"
        @click="prevData"
        :variant="`flat-${currentPage == 1 ? 'secondary' : 'primary'}`"
        :disabled="currentPage == 1"
      >
        <iconify icon="tabler:circle-chevron-left" />
      </b-button>
      <b-button
        class="btn-icon rounded-circle mr-0"
        @click="nextData"
        :variant="`flat-${logsPaginate.totalPages == currentPage ? 'secondary' : 'primary'}`"
        :disabled="logsPaginate.totalPages == currentPage"
      >
        <iconify icon="tabler:circle-chevron-right" />
      </b-button>
    </div>
  </div>
</template>

<style >

</style>