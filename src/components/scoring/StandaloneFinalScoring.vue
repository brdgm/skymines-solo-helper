<template>
  <table>
    <tbody>
      <tr>
        <th colspan="2"  scope="col">
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
          <input v-model="playerNames[player-1]" @focus="inputSelectAll"/>
        </th>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="astrogo-enterprises" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="astrogoShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="tawac-industries" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="tawacShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="skymine-resources" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="skymineShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="company" name="minerva-corp" class="icon"/>
          {{t('endOfGame.scoring.shareCount')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <NumberInput :min="0" :max="20" v-model="minervaShares[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="action" name="gain-coin" class="icon"/>
          {{t('endOfGame.scoring.crypCoin')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <NumberInput :min="0" :max="999" v-model="coins[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="action" name="gain-helium" class="icon"/>
          {{t('endOfGame.scoring.heliumCoin')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <NumberInput :min="0" :max="60" v-model="heliumCoins[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          <AppIcon type="action" name="advance-research" class="icon"/>
          {{t('endOfGame.scoring.researchCoin')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <NumberInput :min="0" :max="60" v-model="researchCoins[index-1]"/>
        </td>
      </tr>
      <tr>
        <th scope="row">
          {{t('endOfGame.scoring.totalCoin')}}
        </th>
        <td v-for="index in playerCount" :key="index">
          <b>{{totalCoins[index-1]}}</b>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import AppIcon from '../structure/AppIcon.vue'
import PlayerColor from '@/services/enum/PlayerColor'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'

export default defineComponent({
  name: 'StandaloneFinalScoring',
  components: {
    PlayerColorIcon,
    AppIcon,
    NumberInput
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
    inputSelectAll(event: Event) : void {
      const input = event.target as HTMLInputElement
      input.select()
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
