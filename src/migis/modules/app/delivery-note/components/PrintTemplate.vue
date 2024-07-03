<template>
  <div
    id="deliveryNotePrint"
    v-if="deliveryData"
  >
    <!-- header -->
    <b-row>
      <b-col cols="12">
        <b-table-simple
          id="tbl-delivery-head"
          style="width: 100%;"
          cellspacing="0"
          borderless
        >
          <b-tr>
            <b-td width="14%">No. Surat Jalan</b-td>
            <b-td width="2%">:</b-td>
            <b-td width="48%">
              {{ deliveryData.do_no ? deliveryData.do_no : deliveryData.delivery_no }}
              <span v-if="deliveryData.do_no && deliveryData.print_count > 1">-R2</span>
            </b-td>
            <b-td>Kepada  :</b-td>
          </b-tr>
          <b-tr>
            <b-td style="">Tanggal</b-td>
            <b-td style="">:</b-td>
            <b-td> {{$moment(deliveryData.detail.detail_sending_date).format('DD.MM.Y')}} </b-td>
            <b-td> {{deliveryData.detail.detail_customer}} </b-td>
          </b-tr>
          <b-tr>
            <b-td style="">No. PO</b-td>
            <b-td style="">:</b-td>
            <b-td> {{deliveryData.po_no ? deliveryData.po_no : ''}} </b-td>
            <b-td rowspan="4" style="vertical-align: baseline;">
              {{deliveryData.detail.detail_address}}
              <br /> {{deliveryData.detail.detail_city}}
            </b-td>
          </b-tr>
          <b-tr>
            <b-td style="">No. Kendaraan</b-td>
            <b-td style="">:</b-td>
            <b-td>{{deliveryData.detail.detail_nopol}}</b-td>
          </b-tr>
          <b-tr>
            <b-td style=""></b-td>
            <b-td style=""></b-td>
            <b-td></b-td>
          </b-tr>
          <b-tr>
            <b-td style=""></b-td>
            <b-td style=""></b-td>
            <b-td></b-td>
          </b-tr>
        </b-table-simple>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-table-simple
          id="tbl-delivery-order"
          style="margin-top: 30px; width: 100%;"
          bordered
        >
          <b-thead>
            <b-tr>
              <b-th style="text-align: center; width: 9%;">No.</b-th>
              <b-th style="text-align: center;">Jenis Barang</b-th>
              <b-th style="text-align: center; width: 24%;">Quantity</b-th>
              <b-th style="text-align: center; width: 14%;">Satuan</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr>
              <b-td style="text-align: center;">1</b-td>
              <b-td style="text-align: center;">{{deliveryData.detail.detail_item}}</b-td>
              <b-td style="text-align: center;">{{deliveryData.detail.detail_qty}}</b-td>
              <b-td style="text-align: center;">{{deliveryData.detail.detail_uom}}</b-td>
            </b-tr>
          </b-tbody>
        </b-table-simple>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="6">
        <b-table-simple
          id="tbl-delivery-datereceived"
          style="margin-top: 15px; width: 100%"
        >
          <b-tr>
            <b-td>Kemasan</b-td>
            <b-td>:</b-td>
            <b-td></b-td>
          </b-tr>
          <b-tr>
            <b-td style="width: 25%;">Tanggal Terima Barang</b-td>
            <b-td style="width: 2%;">:</b-td>
            <b-td>....................................................</b-td>
          </b-tr>
        </b-table-simple>
      </b-col>
    </b-row>
    <!-- end header -->

    <!-- body -->
    <b-row>
      <b-col cols="12">
        <b-table-simple
          id="tbl-delivery-assign"
          style="width: 100%; margin-top: 15px;"
        >
          <b-tr>
            <b-td
              rowspan="3"
              width="40%"
              style="vertical-align: middle;"
            >
              <p>
                Barang tsb. bersegel telah diterima diperiksa 
                dengan betul isi dan kualitasnya
              </p>
            </b-td>
            <b-td width="20%" style="text-align:center; font-weight:400;">
              Penerima
            </b-td>
            <b-td width="20%" style="text-align:center; font-weight:400;">
              Pengemudi
            </b-td>
            <b-td width="20%" style="text-align:center; font-weight:400;">
              Gudang
            </b-td>
          </b-tr>
          <b-tr height="80px"></b-tr>
          <b-tr>
            <b-td width="20%" style="text-align:center;">(...............)</b-td>
            <b-td width="20%" style="text-align:center;">( {{deliveryData.detail.detail_driver}} )</b-td>
            <b-td width="20%" style="text-align:center;">(...............)</b-td>
          </b-tr>
        </b-table-simple>
      </b-col>
    </b-row>
    <!-- end body -->

    <!-- footer -->
    <b-row>
      <b-col cols="12">
        <b-table-simple
          id="tbl-delivery-weight"
          style="width: 100%; margin-top: 15px;"
        >
        <b-tr>
          <b-td
            rowspan="4"
            style="width: 7%; vertical-align: baseline;"
          >
            Note
          </b-td>
          <b-td
            style="width: 50%;"
          >
            Bruto ...............
          </b-td>
        </b-tr>
        <b-tr>
          <b-td>Tara ...............</b-td>
          <b-td>Drum / Box Kosong</b-td>
        </b-tr>
        <b-tr>
          <b-td>Netto ...............</b-td>
          <b-td>Pengembalian Drum / Box Kosong</b-td>
        </b-tr>
        <b-tr>
          <b-td></b-td>
          <b-td>.......................... Drum / box Kosong</b-td>
        </b-tr>
        </b-table-simple>
      </b-col>
    </b-row>
    <!-- end footer -->

    <!-- footnote -->
    <b-row>
      <b-col cols="12">
        <b-table-simple
          id="tbl-delivery-footer"
          style="width: 100%; margin-top: 10px;"
        >
          <b-tr>
            <b-td
              style="text-align: left;"
            >
              <span
                style="font-size: 8pt; color: darkgrey;"
              >
                <i>Tanggal Cetak: {{$moment().format('DD-MMM-Y')}}</i>
              </span>
            </b-td>
            <b-td
              style="text-align: right;"
            >
              <span
                style="font-size: 8pt; color: darkgrey;"
                v-if="deliveryData.do_no"
              >
                {{ deliveryData.delivery_no }}
              </span>
              <span
                style="font-size: 8pt; color: darkgrey;"
                v-if="deliveryData.print_count > 1 && deliveryData.do_no"
              >-R2</span>
            </b-td>
          </b-tr>
        </b-table-simple>
      </b-col>
    </b-row>
    <!-- end footnote -->

  </div>
</template>

<script>
import { BRow, BCol, BTableSimple, BTr, BThead, BTh, BTbody, BTd } from 'bootstrap-vue'

export default {
  components: { BRow, BCol, BTableSimple, BTr, BThead, BTh, BTbody, BTd },
  props: {
    deliveryData: {
      type: Object,
      default: () => ({})
    },
  },
  methods: {
    printDocument(){
      const prtHtml = document.getElementById('deliveryNotePrint').innerHTML;
      let stylesHtml = '';
      for (const node of [...document.querySelectorAll('link[rel="stylesheet"], style')]) {
        stylesHtml += node.outerHTML;
      }
      const WinPrint = window.open('', '', 'windowFeatures', window);
      WinPrint.document.write(`<!DOCTYPE html>
      <html>
        <head>
          <style rel="stylesheet" type="text/css" media="print">
            @media print {
              html, body {
                font-size: 10pt;
                font-family: Arial;
                width: 210mm;
                height: 153mm;
                overflow: visible;
                margin-top: 14mm;
                margin-right: 5mm;
              }
              #tbl-delivery-order {
                border-collapse: collapse !important;
                width: 100%;
              }
              #tbl-delivery-order tr td{
                font-size: 10pt;
              }
              #tbl-delivery-order thead tr th {
                background-color: #ffffff;
                // text-transform: uppercase;
                -webkit-print-color-adjust:exact ;
              }
              #tbl-delivery-order th,
              #tbl-delivery-order td {
                border: 1pt solid black !important;
              }
              #tbl-delivery-order tr:not(:last-child) td:first-child::first-letter {
                text-transform: uppercase;
              }
            }
          </style>
        </head>
        <body>
          ${prtHtml}
        </body>
      </html>`);
      WinPrint.onbeforeprint = function(){ 
        // console.log('Before Printing')
      }
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      setTimeout(() => {
        this.$root.$emit('printedDeliveryNote')
      }, 500)
    },
  },
  created() {
    this.$root.$on('printTemplateDeliveryNote', (data) => { this.deliveryData = data })
    this.$root.$on('printingDeliveryNote', () => { this.printDocument() })
  },
  beforeDestroy() {
    this.$root.$off('printTemplateDeliveryNote')
    this.$root.$off('printingDeliveryNote')
  },
}
</script>

<style>

</style>