<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p>...</p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/util/RouteCalculator'
import { useStore } from '@/store'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const playerCount = store.state.setup.playerSetup.playerCount
    const botCount = store.state.setup.playerSetup.botCount
    const round = 7  // last round

    return { t, playerCount, botCount, round }
  },
  computed: {
    backButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({playerCount:this.playerCount, botCount:this.botCount, round:this.round})
      return routeCalculator.getLastTurnRouteTo(this.$store.state)
    }
  }
})
</script>
