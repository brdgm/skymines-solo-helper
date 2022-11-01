<template>
  <h1>{{t('endOfRound.title', {round:round})}}</h1>

  <p>...</p>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import RouteCalculator from '@/util/RouteCalculator'

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
    nextButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({playerCount:this.playerCount, botCount:this.botCount, round:this.round+1})
      return routeCalculator.getFirstTurnRouteTo(this.$store.state)
    },
    backButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({playerCount:this.playerCount, botCount:this.botCount, round:this.round})
      return routeCalculator.getLastTurnRouteTo(this.$store.state)
    }
  }
})
</script>
