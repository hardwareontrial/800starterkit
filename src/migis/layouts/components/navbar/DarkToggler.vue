<template>
  <b-nav-item @click="skin.value = skin.value === 'light' ? 'dark' : 'light'">
    <iconify
      id="bookmark-moon"
      :icon="skin.value === 'light' ? 'tabler:moon' : 'tabler:sun'"
      :style="{ fontSize: '21px' }"
    />
    <b-tooltip
      triggers="hover"
      target="bookmark-moon"
      :title="skin.value === 'light' ? 'dark' : 'light'"
      :delay="{ show: 1000, hide: 50 }"
    />
  </b-nav-item>
</template>

<script>
import {
  BNavItem, BTooltip,
} from 'bootstrap-vue'
import useAppConfig from '@core/app-config/useAppConfig'

const { skin } = useAppConfig()

export default {
  components: {
    BNavItem, BTooltip,
  },
  data() {
    return {
      skin,
    }
  },
}
</script>

<style></style>
