<template>
  <ul>
    <li v-for="(action,index) in lunaActions" :key="index">
      {{action.action}} {{action.count}} {{action.revealAction ? '(*)' : ''}}
    </li>
  </ul>
</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import BotNavigationState from '@/util/BotNavigationState'
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
      type: BotNavigationState,
      required: true
    }
  },
  computed: {
    lunaActions() : readonly CardAction[] {
      return this.navigationState.lunaActions
    }
  }
})
</script>
