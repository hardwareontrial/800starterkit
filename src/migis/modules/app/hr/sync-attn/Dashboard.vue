<template>
  <b-row>

    <b-col cols="12">
      <b-card
        no-body
        class="card-statistics"
      >
        <b-card-header>
          <b-card-title>Statistik</b-card-title>
        </b-card-header>
        <b-card-body class="statistics-body">
          <b-row>
            <b-col
              v-for="item in statisticsItems"
              :key="item.icon"
              xl="3"
              sm="6"
              :class="item.customClass"
            >
              <b-media no-body>
                <b-media-aside

                  class="mr-2"
                >
                  <b-avatar
                    size="48"
                    :variant="item.color"
                  >
                    <iconify :icon="`tabler-${item.icon}`"/>
                  </b-avatar>
                </b-media-aside>
                <b-media-body class="my-auto">
                  <h4 class="font-weight-bolder mb-0">
                    {{ kFormatter(item.title) }}
                  </h4>
                  <b-card-text class="font-small-3 mb-0">
                    {{ item.subtitle }}
                  </b-card-text>
                </b-media-body>
              </b-media>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col cols="12">
      <custom-alert :alert="alertProps" />
    </b-col>

    <b-col cols="12" md="6">
      <b-card title="Sinkronisasi">
        <b-card-body>
          <b-row>
            <b-col>
              <b-form-group
                label-for="frm-hr-syncattn-start"
              >
                <template #label>
                  <span>Waktu Mulai<span class="text-danger">*</span> :</span>
                </template>

                <flat-pickr
                  id="frm-hr-syncattn-start"
                  class="form-control"
                  :config="{
                    altInput: true,
                    altFormat: 'j F Y, H:i',
                    dateFormat: 'Y-m-d H:i',
                    enableTime: true,
                  }"
                  v-model="form.start_time"
                  :disabled="processing"
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label-for="frm-hr-syncattn-end"
              >
                <template #label>
                  <span>Waktu Akhir<span class="text-danger">*</span> :</span>
                </template>

                <flat-pickr
                  id="frm-hr-syncattn-end"
                  class="form-control"
                  :config="{
                    altInput: true,
                    altFormat: 'j F Y, H:i',
                    dateFormat: 'Y-m-d H:i',
                    enableTime: true,
                  }"
                  v-model="form.end_time"
                  :disabled="processing"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-body>
        <b-card-footer>
          <b-row>
            <b-col cols="12" class="mt-0 mb-75">
              <b-button 
                block
                variant="primary"
                :disabled="processing"
                @click="postingSync"
              >
                <span>Start Sync</span>
              </b-button>
            </b-col>
            <b-col cols="12" class="mt-0 mb-0">
              <b-button 
                block
                variant="primary"
                :disabled="processing"
                @click="getTextFile"
              >
                <span>Export File</span>
              </b-button>
            </b-col>
          </b-row>
        </b-card-footer>
      </b-card>
    </b-col>

    <b-col cols="12" md="6">
      <b-card title="Logs">
        <b-card-body>
          <app-timeline>
            <app-timeline-item
              v-for="(log, idx) of attnLogs"
              :key="idx"
              :subtitle="log.note"
              :time="$moment(log.created_at).fromNow()"
              :variant="log.category === 'unknown' ? 'danger' : (log.category === 'sync' ? 'warning' : 'secondary')"
              :title="log.category === 'unknown' ? 'No Data' : (log.category === 'sync' ? 'Sinkronisasi' : 'Extract File')"
            />
          </app-timeline>
        </b-card-body>
      </b-card>
    </b-col>

  </b-row>
</template>

<script>
import {
  BRow, BCol, BCard, BButton, BFormGroup, BCardHeader, BCardTitle, BCardBody, BCardFooter, BMedia, BMediaAside, BMediaBody, BAvatar, BCardText,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import { kFormatter } from '@core/utils/filter'
import HRService from '@/migis/modules/app/hr/services'
import CustomAlert from '@/migis/components/Alert.vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

export default {
  components: {
    BRow, BCol, BCard, BButton, BFormGroup, BCardHeader, BCardTitle, BCardBody, BCardFooter, BMedia, BMediaAside, BMediaBody, BAvatar, BCardText,
    flatPickr,
    CustomAlert, AppTimeline, AppTimelineItem,
  },
  data() {
    return {
      statisticsItems: [
        {
          icon: 'refresh',
          color: 'light-primary',
          title: '2024-12-31 07:00',
          subtitle: 'Sync Terakhir',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'file-time',
          color: 'light-info',
          title: '2024-12-30 23:59',
          subtitle: 'Data Absensi Terakhir',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'sum',
          color: 'light-danger',
          title: '40000',
          subtitle: 'Total Sync',
          customClass: 'mb-2 mb-sm-0',
        },
      ],
      form: {
        start_time: this.$moment().format('YYYY-MM-DD HH:mm'),
        end_time: this.$moment(this.start_time).add(1, 'hour').format('YYYY-MM-DD HH:mm'),
      },
      processing: false,
      alertProps: { show: false, variant: '', message: null },
      attnLogs: [],
    }
  },
  methods: {
    kFormatter,
    handleProcessing(value) {
      this.processing = value
    },
    handleAlertProp(show, variant, message) {
      this.alertProps = { show: show, variant: variant, message: message }
    },
    async postingSync() {
      this.handleProcessing(true)
      const isValid = HRService.validatorAttn(this.form)
      if(!isValid.success) {
        this.handleAlertProp(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleAlertProp(false, '', null), 3000)
      } else {
        try {
          const synchronize = await HRService.synchronizeAttendance(this.form)
          await this.getLogs()
          await this.getStatistic()
          this.handleProcessing(false)
        } catch (error) {
          this.handleAlertProp(true, 'danger', error)
          setTimeout(() => this.handleAlertProp(false, '', null), 3000)
          this.handleProcessing(false)
        }
      }
    },
    async getTextFile() {
      this.handleProcessing(true)
      const isValid = HRService.validatorAttn(this.form)
      if(!isValid.success) {
        this.handleAlertProp(true, 'danger', isValid.message)
        this.handleProcessing(false)
        setTimeout(() => this.handleAlertProp(false, '', null), 3000)
      } else {
        try {
          const file = await HRService.getTextFileAttendance(this.form)
          const contentDisposition = file.headers['content-disposition'];
          let fileName = 'download.txt';
          if(contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename\*?=([^;]+)/i);
            if (fileNameMatch.length === 2) {
              fileName = fileNameMatch[1];
            }
          }
          const blob = new Blob([file.data], { type: 'application/octet-stream' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link);
          link.click()
          document.body.removeChild(link);
          console.log('File download successfull');
          await this.getLogs()
          await this.getStatistic()
          this.handleProcessing(false)
        } catch (error) {
          this.handleAlertProp(true, 'danger', error)
          // setTimeout(() => this.handleAlertProp(false, '', null), 3000)
          this.handleProcessing(false)
        }
      }
    },
    async getLogs() {
      try {
        const getAttnLogs = await HRService.getAttnLogs()
        if(getAttnLogs.data.length <= 0) { this.attnLogs = [] }
        else {
          const categorized = getAttnLogs.data.map(log => ({...log, category: this.noteCategorized(log.note)}))
          this.attnLogs = categorized.slice(0, 5)
          this.statisticsItems[0].title = this.$moment(this.attnLogs[0].created_at).format('DD MMM YYYY, HH:mm')
        }
      } catch (error) {
        this.attnLogs = []
        this.handleAlertProp(true, 'danger', error)
      }
    },
    noteCategorized(logNote) {
      let category;
      if(logNote.startsWith('Sync')) { category = 'sync'; }
      else if(logNote.startsWith('File')) { category = 'file'; }
      else { category = 'unknown'; }
      return category;
    },
    async getStatistic() {
      try {
        const statistic = await HRService.getAttnStatistic()
        if(statistic.success) {
          this.statisticsItems[1].title = statistic.data.lastAttnSyncd ? this.$moment(statistic.data.lastAttnSyncd.scan_date).format('DD MMM YYYY, HH:mm') : ''
          this.statisticsItems[2].title = statistic.data.totalAttnSync
        }
      } catch (error) {
        this.handleAlertProp(true, 'danger', error)
      }
    }
  },
  computed: {},
  async mounted() {
    await this.getLogs()
    await this.getStatistic()
  }
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>