<template>
  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnBot.title',{bot:bot},botCount)}}
  </h1>

  <p>...</p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import RouteCalculator from '@/util/RouteCalculator'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    PlayerColorIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()

    const navigationState = new NavigationState(route, store);
    const playerCount = navigationState.playerCount
    const botCount = navigationState.botCount
    const round = navigationState.round
    const turn = navigationState.turn
    const player = navigationState.player
    const bot = navigationState.bot
    const playerColor = navigationState.playerColor
    const routeCalculator = new RouteCalculator(playerCount, botCount, round, turn, player, bot)

    return { t, botCount, round, turn, bot, playerColor, routeCalculator, navigationState }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.$store.state)
    }
  },
  methods: {
    next() : void {
      this.$store.commit('turnBot',{round:this.round,turn:this.turn,bot:this.bot})
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
