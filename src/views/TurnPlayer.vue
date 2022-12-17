<template>
  <PlayerStatus :navigation-state="navigationState" @first-player-claimed="firstPlayerClaimed()"/>

  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnPlayer.title',{player:player},playerCount)}}
  </h1>

  <p v-html="t('turnPlayer.makeTurn')" class="mt-4 mb-4"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>
  <button class="btn btn-secondary btn-sm mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#modalPassInfo">
    {{t('action.pass')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>

  <ModalDialog id="modalPassInfo" :title="t('turnPlayer.pass.title')">
    <template #body>
      <ul>
        <li v-html="t('turnPlayer.pass.step1')"></li>
        <li v-html="t('turnPlayer.pass.step2')"></li>
        <li v-html="t('turnPlayer.pass.step3')"></li>
        <li v-html="t('turnPlayer.pass.step4')"></li>
      </ul>
    </template>
    <template #footer>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="pass()">{{t('action.pass')}}</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import RouteCalculator from '@/services/RouteCalculator'
import PlayerNavigationState from '@/util/PlayerNavigationState'
import PlayerStatus from '@/components/turn/PlayerStatus.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    PlayerColorIcon,
    PlayerStatus,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const store = useStore()

    const navigationState = new PlayerNavigationState(route, store.state);
    const playerCount = navigationState.playerCount
    const round = navigationState.round
    const turn = navigationState.turn
    const player = navigationState.player
    const playerColor = navigationState.playerColor
    const routeCalculator = new RouteCalculator({round:round, turn:turn, player:player})

    return { t, playerCount, round, turn, player, playerColor, routeCalculator, navigationState }
  },
  data() {
    return {
      claimFirstPlayer: false
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.$store.state)
    }
  },
  methods: {
    next() : void {
      this.nextWithPassed(false)
    },
    pass() : void {
      this.nextWithPassed(true)
    },
    nextWithPassed(passed : boolean) {
      this.$store.commit('turnPlayer', {
        round:this.round,
        turn:this.turn,
        player:this.player,
        claimFirstPlayer: this.claimFirstPlayer ? true : undefined,
        passed: passed ? true : undefined
      })
      this.$router.push(this.routeCalculator.getNextRouteTo(this.$store.state))
    },
    firstPlayerClaimed() : void {
      this.claimFirstPlayer = true
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
