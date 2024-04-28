<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p>
    <span v-html="t('endOfGame.introduction')"></span><br>
    {{t('setup.difficultyLevel.title')}}: <strong>{{t(`difficultyLevel.${state.setup.difficultyLevel}`)}}</strong>
  </p>

  <FinalScoring/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'
import FinalScoring from '@/components/scoring/FinalScoring.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons,
    FinalScoring
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const round = 7  // last round

    return { t, state, round }
  },
  computed: {
    backButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({round:this.round})
      return routeCalculator.getLastTurnRouteTo(this.state)
    }
  }
})
</script>
