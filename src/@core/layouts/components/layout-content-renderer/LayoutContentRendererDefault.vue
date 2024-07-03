<template>
  <div
    class="app-content content"
    :class="[{'show-overlay': $store.state.app.shallShowOverlay}, $route.meta.contentClass]"
  >
    <div class="content-overlay" />
    <div class="header-navbar-shadow" />
    <div
      class="content-wrapper"
      :class="contentWidth === 'boxed' ? 'container p-0' : null"
    >
      <slot name="breadcrumb">
        <migis-breadcrumb-component />
      </slot>
      <div class="content-body">
        <transition
          :name="routerTransition"
          mode="out-in"
        >
          <slot />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import AppBreadcrumb from '@core/layouts/components/AppBreadcrumb.vue'
import useAppConfig from '@core/app-config/useAppConfig'

import MigisBreadcrumbComponent from '@/migis/layouts/components/Breadcrumb.vue'

export default {
  components: {
    AppBreadcrumb,
    MigisBreadcrumbComponent,
  },
  setup() {
    const { routerTransition, contentWidth } = useAppConfig()

    return {
      routerTransition, contentWidth,
    }
  },
}
</script>

<style>

</style>
