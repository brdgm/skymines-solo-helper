<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p v-html="t('endOfGame.introduction')"></p>

  <FinalScoring/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
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

    const round = 7  // last round

    return { t, round }
  },
  computed: {
    backButtonRouteTo() : string {
      const routeCalculator = new RouteCalculator({round:this.round})
      return routeCalculator.getLastTurnRouteTo(this.$store.state)
    }
  }
})
</script>
