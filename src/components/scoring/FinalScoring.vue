<template>
  <table>
    <tbody>
      <tr>
        <th colspan="2" scope="col">
          <h3 v-html="t('endOfGame.scoring.companyValueTitle')"></h3>
        </th>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="astrogo-enterprises" class="icon"/>
          {{t('endOfGame.scoring.shareValue')}}
        </th>
        <td>
          <NumberInput :min="0" :max="15" v-model="astrogoShareValue"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="tawac-industries" class="icon"/>
          {{t('endOfGame.scoring.shareValue')}}
        </th>
        <td>
          <NumberInput :min="0" :max="15" v-model="tawacShareValue"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="skymine-resources" class="icon"/>
          {{t('endOfGame.scoring.shareValue')}}
        </th>
        <td>
          <NumberInput :min="0" :max="15" v-model="skymineShareValue"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="minerva-corp" class="icon"/>
          {{t('endOfGame.scoring.shareValue')}}
        </th>
        <td>
          <NumberInput :min="0" :max="15" v-model="minervaShareValue"/>
        </td>
      </tr>
    </tbody>
  </table>

  <table class="mt-3">
    <tbody>
      <tr>
        <th scope="col">
          <h3 v-html="t('endOfGame.scoring.scoringTitle')"></h3>
        </th>
        <th v-for="player in playerCount" :key="player" scope="col">
          <PlayerColorIcon :playerColor="playerColors[player-1]" class="playerIcon"/>
          <span>{{t('turnPlayer.title', {player:player}, playerCount)}}</span>
        </th>
        <th v-for="bot in botCount" :key="bot" scope="col">
          <PlayerColorIcon :playerColor="playerColors[playerCount+bot-1]" class="playerIcon"/>
          <span>{{t('turnBot.title', {bot:bot}, botCount)}}</span>
        </th>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="astrogo-enterprises" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="astrogoShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="tawac-industries" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="tawacShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="skymine-resources" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="skymineShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="minerva-corp" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="minervaShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="action" name="gain-coin" class="icon"/>
          {{t('endOfGame.scoring.crypCoin')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <NumberInput :min="0" :max="999" v-model="coins[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="action" name="gain-helium" class="icon"/>
          {{t('endOfGame.scoring.heliumCoin')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <NumberInput :min="0" :max="60" v-model="heliumCoins[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="action" name="advance-research" class="icon"/>
          {{t('endOfGame.scoring.researchCoin')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <NumberInput :min="0" :max="60" v-model="researchCoins[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.totalCoin')}}
        </th>
        <td v-for="index in playerCount+botCount" :key="index">
          <b>{{totalCoins[index-1]}}</b>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import AppIcon from '../structure/AppIcon.vue'
import LunaState from '@/services/LunaState'
import getLunaState from '@/util/getLunaState'
import { MAX_TURN } from '@/util/getTurnOrder'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    PlayerColorIcon,
    AppIcon,
    NumberInput
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    const playerSetup = state.setup.playerSetup
    const playerCount = playerSetup.playerCount
    const botCount = playerSetup.botCount
    const playerColors = playerSetup.playerColors

    const lunaStates : LunaState[] = []
    for (let bot=1; bot<=botCount; bot++) {
      lunaStates[bot-1] = getLunaState(state, 7, MAX_TURN, bot)
    }

    return { t, playerCount, botCount, playerColors, lunaStates }
  },
  data() {
    return {
      coins: [] as number[],
      astrogoShareValue: undefined as number|undefined,
      astrogoShares: [] as number[],
      tawacShareValue: undefined as number|undefined,
      tawacShares: [] as number[],
      skymineShareValue: undefined as number|undefined,
      skymineShares: [] as number[],
      minervaShareValue: undefined as number|undefined,
      minervaShares: [] as number[],
      heliumCoins: this.getInitialHeliumCoinArray(),
      researchCoins: this.getInitialResearchCoinArray()
    }
  },
  computed: {
    totalCoins() : number[] {
      const result = []
      for (let i=0; i<this.playerCount+this.botCount; i++) {
        result[i] = toNumber(this.coins[i])
            + (toNumber(this.astrogoShares[i]) * toNumber(this.astrogoShareValue))
            + (toNumber(this.tawacShares[i]) * toNumber(this.tawacShareValue))
            + (toNumber(this.skymineShares[i]) * toNumber(this.skymineShareValue))
            + (toNumber(this.minervaShares[i]) * toNumber(this.minervaShareValue))
            + toNumber(this.heliumCoins[i])
            + toNumber(this.researchCoins[i])
      }
      return result
    }
  },
  methods: {
    getInitialHeliumCoinArray() : number[] {
      const result = [] as number[]
      for (let bot=1; bot<=this.botCount; bot++) {
        result[this.playerCount + bot - 1] = this.lunaStates[bot-1].getHeliumInCoins()
      }
      return result
    },
    getInitialResearchCoinArray() : number[] {
      const result = [] as number[]
      for (let bot=1; bot<=this.botCount; bot++) {
        result[this.playerCount + bot - 1] = this.lunaStates[bot-1].getResearchInCoins()
      }
      return result
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
.icon {
  width: 2.5rem;
  margin-right: 0.25rem;
  filter: drop-shadow(0.05rem 0.05rem 0.1rem #888);  
}
th, td {
  text-align: center;
  padding: 0.5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  white-space: nowrap;
  vertical-align: middle;
}
input {
  width: 5rem;
}
</style>
