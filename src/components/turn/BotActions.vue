<template>
  <p>BotActions</p>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'BotActions',
  setup() {
    const { t } = useI18n()
    return { }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  }
})
</script>
