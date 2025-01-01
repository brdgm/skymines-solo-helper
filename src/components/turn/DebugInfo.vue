<template>
  <div class="mt-4" v-if="state.setup.debugMode">
    <hr/>
    <p class="debug">
      <b>lunaActions</b>: {{botNavigationState.lunaActions}}<br/>
      <b>cardDeck</b>: {{cardDeck.toPersistence()}}<br/>
      <b>difficultyLevel</b>: {{botNavigationState.difficultyLevel}}<br/>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateStore } from '@/store/state'
import CardDeck from '@/services/CardDeck'
import BotNavigationState from '@/util/BotNavigationState'

export default defineComponent({
  name: 'DebugInfo',
  setup() {
    const state = useStateStore()
    return { state }
  },
  props: {
    botNavigationState: {
      type: BotNavigationState,
      required: true
    }
  },
  computed: {
    cardDeck() : CardDeck {
      return this.botNavigationState.lunaState.cardDeck
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  font-size: small;
}
p.debug, ul.debug {
  margin: 0;
}
</style>
