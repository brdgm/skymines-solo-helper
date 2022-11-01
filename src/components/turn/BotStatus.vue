<template>
  <table>
    <tr>
      <th>Turn</th>
      <td>{{round}}-{{turn}}</td>
    </tr>
    <tr>
      <th>Helium</th>
      <td>{{heliumCount}} + {{heliumCountGain}} (={{heliumAsCoins}} coins)</td>
    </tr>
    <tr>
      <th>Research</th>
      <td>{{researchSteps}} + {{researchStepsGain}} (={{researchAsCoins}} coins)</td>
    </tr>
    <tr>
      <th>Grade 2 cards in use</th>
      <td>{{grade2CardsInUse}}</td>
    </tr>
    <tr>
      <th>Majority Titanium</th>
      <td>{{majorityTitanium}}</td>
    </tr>
    <tr>
      <th>Majority Carbon</th>
      <td>{{majorityCarbon}}</td>
    </tr>
    <tr>
      <th>Majority Energy</th>
      <td>{{majorityEnergy}}</td>
    </tr>
    <tr>
      <th>Majority Minerals</th>
      <td>{{majorityMinerals}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import MajorityType from '@/services/enum/MajorityType'
import LunaState from '@/services/LunaState'
import BotNavigationState from '@/util/BotNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'BotStatus',
  setup() {
    const { t } = useI18n()
    return { }
  },
  props: {
    navigationState: {
      type: BotNavigationState,
      required: true
    }
  },
  computed: {
    round() : number {
      return this.navigationState.round
    },
    turn() : number {
      return this.navigationState.turn
    },
    lunaState() : LunaState {
      return this.navigationState.lunaState
    },
    heliumCount() : number {
      return this.lunaState.heliumCount
    },
    heliumCountGain() : number {
      return this.lunaState.getHeliumCountFromActions(this.navigationState.lunaActions)
    },
    heliumAsCoins() : number {
      return this.lunaState.getHeliumInCoins(this.heliumCount + this.heliumCountGain)
    },
    researchSteps() : number {
      return this.lunaState.researchSteps
    },
    researchStepsGain() : number {
      return this.lunaState.getResearchStepsFromActions(this.navigationState.lunaActions)
    },
    researchAsCoins() : number {
      return this.lunaState.getResearchInCoins(this.researchSteps + this.researchStepsGain)
    },
    grade2CardsInUse() : number {
      return this.lunaState.cardDeck.grade2CardsInUse
    },
    majorityTitanium() : number {
      return this.lunaState.cardDeck.getMajorityCount(MajorityType.TITANIUM)
    },
    majorityCarbon() : number {
      return this.lunaState.cardDeck.getMajorityCount(MajorityType.CARBON)
    },
    majorityEnergy() : number {
      return this.lunaState.cardDeck.getMajorityCount(MajorityType.ENERGY)
    },
    majorityMinerals() : number {
      return this.lunaState.cardDeck.getMajorityCount(MajorityType.MINERALS)
    }
  }
})
</script>
