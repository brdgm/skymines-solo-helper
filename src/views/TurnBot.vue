<template>
  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnBot.title',{bot:bot},botCount)}}
  </h1>

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
import NavigationState from '@/util/NavigationState'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'

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
    const bot = navigationState.bot
    const playerColor = navigationState.playerColor

    return { t, playerColor, playerCount, botCount, round, turn, bot, navigationState }
  },
  computed: {
    nextButtonRouteTo() : string {
      if (this.bot < this.botCount) {
        return `/round/${this.round}/turn/${this.turn}/bot/${this.bot+1}`
      }
      else {
        return `/round/${this.round}/turn/${this.turn+1}/player/1`
      }
    },
    backButtonRouteTo() : string {
      if (this.bot > 1) {
        return `/round/${this.round}/turn/${this.turn}/bot/${this.bot-1}`
      }
      else {
        return `/round/${this.round}/turn/${this.turn}/player/${this.playerCount}`
      }
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
