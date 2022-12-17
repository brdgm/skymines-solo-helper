<template>
  <h1>{{t('setupLuna.title')}}</h1>

  <p v-html="t('setupLuna.forEach')"></p>
  <ol>
    <li v-html="t('setupLuna.playerToken')"></li>
    <li v-html="t('setupLuna.coinsBonusMarkers')"></li>
    <li v-html="t('setupLuna.trackMarkers')"></li>
    <li>
      <span v-html="t('setupLuna.startingBonus')"></span><br/>
      <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#modalLunaHeliumStartBonus">{{t('setupLuna.heliumBonus.title')}}</button>
    </li>
  </ol>
  <p v-html="t('setupLuna.finalNotes')"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <ModalDialog id="modalLunaHeliumStartBonus" :title="t('setupLuna.heliumBonus.title')" :size-lg="true">
    <template #body>
      <p v-html="t('setupLuna.heliumBonus.introduction')"></p>
      <p v-for="bot in botCount" :key="bot" class="ms-3">
        <PlayerColorIcon :playerColor="playerColors[playerCount+bot-1]" class="playerIcon"/>
        <span class="fw-bold">{{t('turnBot.title', {bot:bot}, botCount)}}</span>
        <span class="form-check form-check-inline ms-4">
          <input class="form-check-input" type="radio" :id="`inputHeliumBonus${bot}-0`" :value="undefined" v-model="lunaHeliumBonus[bot-1]">
          <label class="form-check-label" :for="`inputHeliumBonus${bot}-0`">{{t('setupLuna.heliumBonus.heliumNone')}}</label>
        </span>
        <span class="form-check form-check-inline">
          <input class="form-check-input" type="radio" :id="`inputHeliumBonus${bot}-1`" :value="1" v-model="lunaHeliumBonus[bot-1]">
          <label class="form-check-label" :for="`inputHeliumBonus${bot}-1`">{{t('setupLuna.heliumBonus.heliumCount',{count:1})}}</label>
        </span>
        <span class="form-check form-check-inline">
          <input class="form-check-input" type="radio" :id="`inputHeliumBonus${bot}-2`" :value="2" v-model="lunaHeliumBonus[bot-1]">
          <label class="form-check-label" :for="`inputHeliumBonus${bot}-2`">{{t('setupLuna.heliumBonus.heliumCount',{count:2})}}</label>
        </span>
      </p>
    </template>
  </ModalDialog>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import InitialLunaStates from '@/services/InitialLunaStates'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'SetupLuna',
  components: {
    FooterButtons,
    PlayerColorIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()

    const playerSetup = store.state.setup.playerSetup
    const playerCount = playerSetup.playerCount
    const botCount = playerSetup.botCount
    const playerColors = playerSetup.playerColors

    return { t, playerCount, botCount, playerColors }
  },
  data() {
    return {
      lunaHeliumBonus: [] as (number|undefined)[]
    }
  },
  methods: {
    startGame() : void {
      // start with clean game state
      this.$store.commit('resetGame')
      // prepare luna states for all bots
      const initialLunaStates = new InitialLunaStates(this.$store)
      initialLunaStates.prepareRound(1, this.lunaHeliumBonus)
      // go to start game screen
      this.$router.push("/startGame")
    }
  }
})
</script>

<style lang="scss" scoped>
.playerIcon {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.25rem;
  margin-top: -0.25rem;
}
</style>
