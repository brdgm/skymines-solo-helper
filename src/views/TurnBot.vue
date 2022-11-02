<template>
  <BotStatus :navigation-state="navigationState"/>

  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnBot.title',{bot:bot},botCount)}}
  </h1>

  <BotActions :navigation-state="navigationState"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import RouteCalculator from '@/services/RouteCalculator'
import BotStatus from '@/components/turn/BotStatus.vue'
import BotActions from '@/components/turn/BotActions.vue'
import BotNavigationState from '@/util/BotNavigationState'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    PlayerColorIcon,
    BotStatus,
    BotActions
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()

    const navigationState = new BotNavigationState(route, store.state);
    const botCount = navigationState.botCount
    const round = navigationState.round
    const turn = navigationState.turn
    const bot = navigationState.bot
    const playerColor = navigationState.playerColor
    const routeCalculator = new RouteCalculator({round:round, turn:turn, bot:bot})
    const lunaState = navigationState.lunaState

    return { t, botCount, round, turn, bot, playerColor, routeCalculator, navigationState, lunaState }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.$store.state)
    }
  },
  methods: {
    next() : void {
      this.lunaState.applyActions(this.navigationState.lunaActions)
      let passed : boolean|undefined
      if (!this.lunaState.cardDeck.hasNextActions) {
        this.lunaState.cardDeck.discardSlotCardsAndOneMajorityCard()
        passed = true
      }
      this.$store.commit('turnBot',{round:this.round,turn:this.turn,bot:this.bot,
        passed:passed,lunaState:this.lunaState.toPersistence()})
      this.$router.push(this.routeCalculator.getNextRouteTo(this.$store.state))
    }
  }
})
</script>

<style lang="scss" scoped>
.playerColorIcon {
  width: 2rem;
  height: 2rem;
  margin-top: -0.5rem;
}
</style>
