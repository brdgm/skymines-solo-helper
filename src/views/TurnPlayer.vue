<template>
  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnPlayer.title',{player:player},playerCount)}}
  </h1>

  <p v-html="t('turnPlayer.makeTurn')" class="mt-4 mb-4"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>
  <button class="btn btn-secondary btn-sm mt-4 ms-2" @click="pass()">
    {{t('action.pass')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import RouteCalculator from '@/util/RouteCalculator'
import PlayerNavigationState from '@/util/PlayerNavigationState'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    PlayerColorIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()

    const navigationState = new PlayerNavigationState(route, store.state);
    const playerCount = navigationState.playerCount
    const botCount = navigationState.botCount
    const round = navigationState.round
    const turn = navigationState.turn
    const player = navigationState.player
    const playerColor = navigationState.playerColor
    const routeCalculator = new RouteCalculator({playerCount:playerCount, botCount:botCount,
        round:round, turn:turn, player:player})

    return { t, playerCount, round, turn, player, playerColor, routeCalculator }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.$store.state)
    }
  },
  methods: {
    next() : void {
      this.$store.commit('turnPlayer',{round:this.round,turn:this.turn,player:this.player})
      this.$router.push(this.routeCalculator.getNextRouteTo(this.$store.state))
    },
    pass() : void {
      this.$store.commit('turnPlayer',{round:this.round,turn:this.turn,player:this.player,passed:true})
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
