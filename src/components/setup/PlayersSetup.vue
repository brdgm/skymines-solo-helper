<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerCount')}}</label>
    </div>
    <div class="col-5 col-md-3">
      <select class="form-select" id="playerCount" v-model="playerCount">
        <option v-for="i in maxPlayerCount" :key="i" :value="i">{{t('setup.players.playerCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="playerColorIndex in playerCount" :key="playerColorIndex+playerColors[playerColorIndex-1]">
    <div class="col-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerColor', {index:playerColorIndex}, playerCount)}}</label>
    </div>
    <div class="col-5 col-md-3">
      <PlayerColorPicker :model-value="playerColors[playerColorIndex-1]" @update:model-value="color => playerColorChanged(playerColorIndex-1, color)"/>
    </div>
  </div>  
  <div class="row mt-3">
    <div class="col-7 col-md-9 offset-5 offset-md-3" v-html="t('setup.players.playerBonusMarkers', {count:humanPlayerBonusMarkerCount})"></div>
  </div>  

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-5 col-md-3">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in maxBotCount" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="botColorIndex in botCount" :key="botColorIndex+playerColors[playerCount+botColorIndex-1]">
    <div class="col-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.botColor', {index:botColorIndex}, botCount)}}</label>
    </div>
    <div class="col-5 col-md-3">
      <PlayerColorPicker :model-value="playerColors[playerCount+botColorIndex-1]" @update:model-value="color => playerColorChanged(playerCount+botColorIndex-1, color)"/>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import PlayerColorPicker from './PlayerColorPicker.vue'
import PlayerColor from '@/services/enum/PlayerColor'

export default defineComponent({
  name: 'PlayersSetup',
  components: {
    PlayerColorPicker
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const playerCount = ref(state.setup.playerSetup?.playerCount || 1)
    const botCount = ref(state.setup.playerSetup?.botCount || 1)
    const playerColors = ref(state.setup.playerSetup?.playerColors || [PlayerColor.RED,PlayerColor.ORANGE,PlayerColor.BLUE,PlayerColor.GREEN])

    return { t, state, playerCount, botCount, playerColors }
  },
  computed: {
    maxPlayerCount() : number {
      return 4 - this.botCount
    },
    maxBotCount() : number {
      return 4 - this.playerCount
    },
    humanPlayerBonusMarkerCount() : number {
      const totalPlayerCount = this.botCount + this.playerCount
      if (totalPlayerCount <= 2) {
        return 3
      }
      else {
        return 2
      }
    }
  },
  watch: {
    playerCount() {
      if (this.botCount > this.maxBotCount) {
        this.botCount = this.maxBotCount
      }
      this.storePlayerSetup()
    },
    playerColors() {
      this.storePlayerSetup()
    },
    botCount() {
      if (this.playerCount > this.maxPlayerCount) {
        this.playerCount = this.maxPlayerCount
      }
      this.storePlayerSetup()
    }
  },
  methods: {
    storePlayerSetup() {
      this.state.setup.playerSetup =  {
        playerCount: this.playerCount,
        botCount: this.botCount,
        playerColors: this.playerColors
      }
    },
    playerColorChanged(index : number, color : PlayerColor) {
      const newPlayerColors = [...this.playerColors]
      newPlayerColors[index] = color
      for (let i=0; i<this.playerColors.length; i++) {
        if (i!=index && newPlayerColors[i]==color) {
          const newColor = Object.values(PlayerColor).find(c => !newPlayerColors.includes(c))
          if (newColor) {
            newPlayerColors[i] = newColor
          }
        }
      }
      this.playerColors = newPlayerColors
    }
  }
})
</script>
