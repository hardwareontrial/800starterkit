<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <b-col
      class="content-header-left mb-1"
      cols="12"
      md="4"
    >
      <b-row class="breadcrumbs-top">
        <b-col
          cols="12"
          class="d-flex justify-content-start"
        >
          <div
            class="mr-50 align-self-center d-inline d-md-none"
            style="cursor:pointer;"
            v-if="$route.meta.backButton"
            @click="$router.go(-1)"
          >
            <iconify icon="tabler:arrow-left" :style="{fontSize: '21px'}"/>
          </div>
          <span class="h3" :style="{marginTop: '1.1mm'}">
            {{ $route.meta.pageTitle }}
          </span>
        </b-col>
      </b-row>
    </b-col>

    <b-col
      class="content-header-right text-right d-md-block d-none mb-1 align-self-center"
      md="8"
      cols="12"
    >
      <b-breadcrumb>
        <b-breadcrumb-item
          to="/"
          class="ml-auto"
        >
          <feather-icon
            icon="HomeIcon"
            size="16"
            class="align-text-top"
          />
        </b-breadcrumb-item>
        <b-breadcrumb-item
          v-for="item in $route.meta.breadcrumb"
          :key="item.text"
          :active="item.active"
          :to="item.to"
        >
          {{ item.text }}
        </b-breadcrumb-item>
      </b-breadcrumb>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb, BBreadcrumbItem, BCol, BRow, BButton
} from 'bootstrap-vue'

export default {
  components: {
    BBreadcrumb, BRow, BCol, BBreadcrumbItem, BButton
  },
}
</script>
