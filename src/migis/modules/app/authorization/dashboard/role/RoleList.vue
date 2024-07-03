<script>
import {
  BCol, BRow, BCardText, BCardBody, BAvatar, BAvatarGroup, BCard, BLink, BPagination, BButton,
  VBTooltip,
} from "bootstrap-vue";
import store from '@/store'
import AuthorizationService from '@/migis/modules/app/authorization/services'

const _socket = store.state.migis.socket.socket

export default {
  components: {
    BCol, BRow, BCardText, BCardBody, BAvatar, BAvatarGroup, BCard, BLink, BPagination, BButton
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  data() {
    return{
      limit: 5,
      query: '',
      current_page: 1,
      meta: { total: 0, from: 1, to: 1, current_page: 1, per_page: 1 },
    }
  },
  methods: {
    handlePerPage(value) { this.limit = value },
    handlePage(value) { this.current_page = value },
    handleQuery(value) { this.query = value },
  },
  computed: {
    dataRole() {
      const data = store.getters['migis/authorization/rolePaginate'](this.current_page, this.limit, this.query)
      return {
        items: data.items,
        meta: {
          from: data.from,
          to: data.to,
          total: data.total,
          per_page: data.per_page,
          current_page: data.currentPage,
        }
      }
    },
  },
  mounted() {
    _socket.on('auth:role:created', async (data) => {
      await AuthorizationService.init()
      setTimeout(() => {
        this.$bvToast.toast(`Role ${data.name} berhasil dibuat.`, {
          title: 'Authorization',
          toaster: 'b-toaster-top-center',
          solid: false,
          variant: 'info',
        })
      },1000)
    });
    _socket.on('auth:role:updated', async (data) => {
      await AuthorizationService.init()
      setTimeout(() => {
        this.$bvToast.toast(`Role ${data.name} berhasil diupdate.`, {
          title: 'Authorization',
          toaster: 'b-toaster-top-center',
          solid: false,
          variant: 'info',
        })
      },1000)
    });
    _socket.on('auth:role:deleted', async (data) => {
      await AuthorizationService.init()
      setTimeout(() => {
        this.$bvToast.toast(`Role ${data} berhasil dihapus.`, {
          title: 'Authorization',
          toaster: 'b-toaster-top-center',
          solid: false,
          variant: 'info',
        })
      },1000)
    });
  },
  beforeDestroy() {
    _socket.off('auth:role:created')
    _socket.off('auth:role:updated')
    _socket.off('auth:role:deleted')
  },
}
</script>

<template>
  <b-row>
    <b-col cols="12">
      <h3>Role List</h3>
      <b-card-text>
        Daftar role yang tersedia untuk dapat digunakan kepada User. Administrator dapat mengatur untuk menambah, merubah, menghapus role tertentu.
      </b-card-text>
      <b-row class="match-height">
        <b-col
          cols="12"
          md="4"
          v-for="(item, index) in dataRole.items"
          :key="index"
        >
          <b-card no-body>
            <b-card-body class="d-flex justify-content-between align-items-center">
              <div class="truncate">
                <span>
                  {{ item.roleUsers.length }} User{{ item.roleUsers.length > 1 ? 's': ''}}
                </span>
                <h5 class="mb-25 mt-1 font-weight-bolder">
                  {{ item.name }}
                </h5>
                <b-link
                  :to="{name: 'authorization-role-detail', params: {unique: item.role_unique_str} }"
                >
                  Detail
                </b-link>
              </div>
              <b-avatar-group
                class="mt-2 pt-50"
                size="34px"
                v-if="item.roleUsers.length > 0"
              >
                <b-avatar 
                  variant="light-primary"
                  v-b-tooltip.hover
                  v-for="(user, i) in item.roleUsers.slice(0, 3)"
                  :key="i"
                  :title="user.fname"
                  :src="user.avatarlink"
                />
                <h6 class="align-self-center cursor-pointer ml-1 mb-0">
                  <span v-if="(item.roleUsers.length -3) > 0">+{{item.roleUsers.length -3}}</span>
                </h6>
              </b-avatar-group>
            </b-card-body>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card no-body>
            <b-card-body class="d-flex justify-content-between align-items-center">
              <div class="truncate mt-4">
                <span>Buat Role Baru Jika Diperlukan.</span>
              </div>
              <b-button
                class="mt-3"
                variant="flat-primary"
                :to="{name: 'authorization-role-create'}"
              >
                Tambah
              </b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-col>
    <b-col cols="12">
      <b-row>
        <b-col
          style="margin-bottom: 0.75rem;"
          cols="12"
          xl="4"
          class="d-flex justify-content-center justify-content-xl-start align-items-center">
          <!-- <small>Tampil {{ meta.from }} sampai {{ meta.to }} dari {{ meta.total }} item.</small> -->
        </b-col>
        <b-col
          style="margin-bottom: 0.75rem;"
          cols="12"
          xl="4"
          class="d-flex justify-content-center justify-content-xl-end align-items-center">
          <b-pagination
            style="margin-top: 0rem;"
            pills
            align="right"
            v-model="meta.current_page"
            :total-rows="meta.total"
            :per-page="meta.per_page"
            @change="handlePage"
            aria-controls="datatable-custom">
          </b-pagination>
        </b-col>
        <b-col
          cols="12"
          xl="4"
          class="d-flex justify-content-center justify-content-xl-end align-items-center">
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<style>

</style>