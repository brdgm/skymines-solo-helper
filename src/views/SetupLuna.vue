<template>
  <h1>{{t('setupLuna.title')}}</h1>

  <p v-html="t('setupLuna.forEach')"></p>
  <ol>
    <li v-html="t('setupLuna.playerToken')"></li>
    <li v-html="t('setupLuna.coinsBonusMarkers')"></li>
    <li v-html="t('setupLuna.trackMarkers')"></li>
    <li v-html="t('setupLuna.startingBonus')"></li>
  </ol>
  <p v-html="t('setupLuna.finalNotes')"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import InitialLunaStates from '@/util/InitialLunaStates'
import { useStore } from '@/store'
import RouteCalculator from '@/util/RouteCalculator'

export default defineComponent({
  name: 'SetupLuna',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const playerCount = store.state.setup.playerSetup.playerCount
    const botCount = store.state.setup.playerSetup.botCount

    return { t, playerCount, botCount }
  },
  methods: {
    startGame() : void {
      // prepare luna states for all bots
      const initialLunaStates = new InitialLunaStates(this.$store)
      initialLunaStates.prepareRound(1)
      // go to first turn
      const routeCalculator = new RouteCalculator({playerCount:this.playerCount, botCount:this.botCount, round:1})
      this.$router.push(routeCalculator.getFirstTurnRouteTo(this.$store.state))
    }
  }
})
</script>
