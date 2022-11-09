<template>
  <table>
    <tr>
      <th colspan="2">
        <h3 v-html="t('endOfGame.scoring.companyValueTitle')"></h3>
      </th>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="astrogo-enterprises" class="icon"/>
        {{t('endOfGame.scoring.shareValue')}}
      </th>
      <td>
        <input type="number" min="0" max="15" step="1" v-model="astrogoShareValue" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="tawac-industries" class="icon"/>
        {{t('endOfGame.scoring.shareValue')}}
      </th>
      <td>
        <input type="number" min="0" max="15" step="1" v-model="tawacShareValue" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="skymine-resources" class="icon"/>
        {{t('endOfGame.scoring.shareValue')}}
      </th>
      <td>
        <input type="number" min="0" max="15" step="1" v-model="skymineShareValue" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="minerva-corp" class="icon"/>
        {{t('endOfGame.scoring.shareValue')}}
      </th>
      <td>
        <input type="number" min="0" max="15" step="1" v-model="minervaShareValue" @focus="inputSelectAll"/>
      </td>
    </tr>
  </table>

  <table class="mt-3">
    <tr>
      <th>
        <h3 v-html="t('endOfGame.scoring.scoringTitle')"></h3>
      </th>
      <th v-for="player in playerCount" :key="player">
        <PlayerColorIcon :playerColor="playerColors[player-1]" class="playerIcon"/>
        <input v-model="playerNames[player-1]" @focus="inputSelectAll"/>
      </th>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="astrogo-enterprises" class="icon"/>
        {{t('endOfGame.scoring.shareCount')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <input type="number" min="0" max="20" step="1" v-model="astrogoShares[index-1]" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="tawac-industries" class="icon"/>
        {{t('endOfGame.scoring.shareCount')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <input type="number" min="0" max="20" step="1" v-model="tawacShares[index-1]" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="skymine-resources" class="icon"/>
        {{t('endOfGame.scoring.shareCount')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <input type="number" min="0" max="20" step="1" v-model="skymineShares[index-1]" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="company" name="minerva-corp" class="icon"/>
        {{t('endOfGame.scoring.shareCount')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <input type="number" min="0" max="20" step="1" v-model="minervaShares[index-1]" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="action" name="gain-coin" class="icon"/>
        {{t('endOfGame.scoring.crypCoin')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <input type="number" min="0" max="999" step="1" v-model="coins[index-1]" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="action" name="gain-helium" class="icon"/>
        {{t('endOfGame.scoring.heliumCoin')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <input type="number" min="0" max="60" step="1" v-model="heliumCoins[index-1]" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        <AppIcon type="action" name="advance-research" class="icon"/>
        {{t('endOfGame.scoring.researchCoin')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <input type="number" min="0" max="60" step="1" v-model="researchCoins[index-1]" @focus="inputSelectAll"/>
      </td>
    </tr>
    <tr>
      <th>
        {{t('endOfGame.scoring.totalCoin')}}
      </th>
      <td v-for="index in playerCount" :key="index">
        <b>{{totalCoins[index-1]}}</b>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import AppIcon from '../structure/AppIcon.vue'
import PlayerColor from '@/services/enum/PlayerColor'

export default defineComponent({
  name: 'StandaloneFinalScoring',
  components: {
    PlayerColorIcon,
    AppIcon
  },
  setup() {
    const { t } = useI18n()

    const playerCount = 4
    const playerColors = [PlayerColor.RED,PlayerColor.ORANGE,PlayerColor.BLUE,PlayerColor.GREEN]
    const playerNames = []
    for (let player=1; player<=playerCount; player++) {
      playerNames.push(t('turnPlayer.title', {player:player},playerCount))
    }

    return { t, playerCount, playerColors, playerNames }
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
      heliumCoins: [] as number[],
      researchCoins: [] as number[]
    }
  },
  computed: {
    totalCoins() : number[] {
      const result = []
      for (let i=0; i<this.playerCount; i++) {
        result[i] = this.toNumber(this.coins[i])
            + (this.toNumber(this.astrogoShares[i]) * this.toNumber(this.astrogoShareValue))
            + (this.toNumber(this.tawacShares[i]) * this.toNumber(this.tawacShareValue))
            + (this.toNumber(this.skymineShares[i]) * this.toNumber(this.skymineShareValue))
            + (this.toNumber(this.minervaShares[i]) * this.toNumber(this.minervaShareValue))
            + this.toNumber(this.heliumCoins[i])
            + this.toNumber(this.researchCoins[i])
      }
      return result
    }
  },
  methods: {
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
    },
    toNumber(value? : number) {
      if (typeof value == 'string') {
        return 0
      }
      else {
        return value ?? 0
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.playerIcon {
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.25rem;
  margin-top: -0.5rem;
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
