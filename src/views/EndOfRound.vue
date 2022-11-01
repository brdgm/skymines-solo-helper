<template>
  <h1>{{t('endOfRound.title', {round:round})}}</h1>

  <p>...</p>

  <button class="btn btn-primary btn-lg mt-4" @click="nextRound()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import RouteCalculator from '@/util/RouteCalculator'
import InitialLunaStates from '@/util/InitialLunaStates'

export default defineComponent({
  name: 'EndOfRound',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()

    const playerCount = store.state.setup.playerSetup.playerCount
    const botCount = store.state.setup.playerSetup.botCount
    const round = parseInt(route.params['round'] as string)

    return { t, playerCount, botCount, round }
  },
  computed: {
    backButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({playerCount:this.playerCount, botCount:this.botCount, round:this.round})
      return routeCalculator.getLastTurnRouteTo(this.$store.state)
    }
  },
  methods: {
    nextRound() : void {
      // prepare luna states for all bots for next round
      const initialLunaStates = new InitialLunaStates(this.$store)
      initialLunaStates.prepareRound(this.round+1)
      // got to first turn of next round
      const routeCalculator = new RouteCalculator({playerCount:this.playerCount, botCount:this.botCount, round:this.round+1})
      this.$router.push(routeCalculator.getFirstTurnRouteTo(this.$store.state))
    }
  }
})
</script>
