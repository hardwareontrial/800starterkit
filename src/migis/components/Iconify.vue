<template>
  <Icon :icon="icon" />
</template>

<script>
import { Icon } from '@iconify/vue2'

export default {
  name: 'Iconify',
  components: { Icon },
  props: {
    icon: {
      required: true,
      type: [String, Object],
    },
  },
}
</script>

<style>
  svg {
    font-size: 1.3rem;
    line-height: 0.5em;
  }
</style>
