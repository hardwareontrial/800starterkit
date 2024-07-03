<template>
  <b-card
    v-if="logs.length > 0"
    no-body
  >
    <b-card-header>
      <b-card-title class="ml-25">
        Log Surat Jalan
      </b-card-title>
    </b-card-header>

    <b-card-body>
      <app-timeline>
        <app-timeline-item
          v-for="(log, idx) of logs"
          :key="idx"
          :variant="actionVariant(log.action_name)"
        >
          <div class="d-flex justify-content-between flex-sm-row flex-column mb-sm-0 mb-1">
            <h5>{{ log.action_name }}</h5>
            <small class="timeline-item-time text-nowrap text-muted ml-1">{{ $momentTz(log.created_at).format('DD MMM YYYY HH:mm') }}</small>
          </div>
          <p class="text-muted">{{ log.creator }}</p>
        </app-timeline-item>
      </app-timeline>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardBody, BCardHeader, BCardTitle,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

export default {
  props: {
    logs: { default: () => [], type: Array },
  },
  components: {
    BCard, BCardBody, BCardHeader, BCardTitle,
    AppTimeline, AppTimelineItem,
  },
  data() {
    return {
      data: 1,
      variant: [],
    }
  },
  methods: {
    actionVariant(value) {
      switch (value) {
        case 'Buat Surat Jalan':
          return 'secondary'
        case 'Post Invoice':
          return 'success'
        default:
          return 'primary'
      }
    },
  },
}
</script>

<style>

</style>