<script>
import { 
  BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody, BCardText,
  BTableSimple, BThead, BTbody, BTh, BTd, BTr,
} from 'bootstrap-vue'
import 'viewerjs/dist/viewer.css'
import { component as Viewer} from 'v-viewer'

export default {
  props: {
    data: { default: () => {}, type: Object },
  },
  components: {
    BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody, BCardText,
    BTableSimple, BThead, BTbody, BTh, BTd, BTr,
    Viewer,
  },
  data() {
    return {
      viewerOptions: {
        toolbar: false,
        movable: false,
      },
    }
  },
  methods: {},
  computed: {
    dataComputed() {
      const data = this.data
      data.qrSource = [{ src: data.qrcodeLink, 'data-source': data.qrcodeLink }]
      return data
    },
    tableProps() {
      return this.$store.state.migis.gainventaris.typeProps
    },
  },
}
</script>

<template>
  <!-- <b-card :title="data.kode_brg"> -->
    <b-row>
      <b-col cols="12">
        <b-media no-body>
          <b-media-aside>
            <viewer
              :images="dataComputed.qrSource"
              :options="viewerOptions"
            >
              <template slot-scope="scope">
                <b-avatar
                  v-for="(img, index) in scope.images"
                  :src="img.src"
                  :key="index"
                  :alt="dataComputed.kode_brg"
                  style="cursor: pointer;"
                  variant="light-primary"
                  size="120"
                  rounded
                />
              </template>
            </viewer>
          </b-media-aside>
          <b-media-body class="ml-2">
            <b-card-text class="mb-0 mt-0 text-primary">
              <iconify icon="tabler:user" class="mr-50"/>
              <span>{{tableProps[3][dataComputed.pic_bagian_id]}}</span>
            </b-card-text>
            <b-card-text class="mb-0 mt-0" :class="`text-${tableProps[2][dataComputed.status_id]}`">
              <iconify :icon="tableProps[1][dataComputed.status_id]" class="mr-50"/>
              <span>{{tableProps[0][dataComputed.status_id]}}</span>
            </b-card-text>
          </b-media-body>
        </b-media>
      </b-col>
      <b-col cols="12" class="mt-1">
        <h4 class="font-weight-bolder">General Info</h4>
        <b-table-simple
          responsive
          striped
        >
          <b-tbody>
            <b-tr>
              <b-td width="250">Kode Barang</b-td>
              <b-td>{{dataComputed.kode_brg}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Nama Barang</b-td>
              <b-td>{{dataComputed.nama_brg}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Serial Number</b-td>
              <b-td>{{dataComputed.serialnumber}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Tanggal Pembelian</b-td>
              <b-td>{{$moment(dataComputed.tgl_beli).format('DD MMMM YYYY')}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Nama Toko</b-td>
              <b-td>{{dataComputed.toko}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Harga</b-td>
              <b-td>{{dataComputed.harga}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Merk</b-td>
              <b-td>{{dataComputed.invmerk.name}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Lokasi Penempatan</b-td>
              <b-td>{{dataComputed.invloc.name}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Spesifikasi</b-td>
              <b-td>{{dataComputed.spesifikasi}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Catatan</b-td>
              <b-td>{{dataComputed.notes}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Aktif</b-td>
              <b-td>
                <iconify 
                  :icon="!!dataComputed.is_active ? 'tabler:circle-check-filled' : 'tabler:alert-circle-filled'"
                  :class="`text-${!!dataComputed.is_active ? 'success' : 'secondary'}`"
                />
              </b-td>
            </b-tr>
            <b-tr v-if="dataComputed.user_id_1">
              <b-td>Pengguna 1</b-td>
              <b-td>{{dataComputed.invuser1.fname}}</b-td>
            </b-tr>
            <b-tr v-if="dataComputed.user_id_2">
              <b-td>Pengguna 2</b-td>
              <b-td>{{dataComputed.invuser2.fname}}</b-td>
            </b-tr>
            <b-tr>
              <b-td>Tanggal Registrasi</b-td>
              <b-td>{{$momentTz(dataComputed.created_at).format('DD MMM YYYY HH:mm')}}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>
  <!-- </b-card> -->
</template>

<style></style>