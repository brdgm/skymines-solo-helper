<template>
  <table>
    <tr>
      <th>Turn</th>
      <td>{{round}}-{{turn}}</td>
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
import PlayerNavigationState from '@/util/PlayerNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'PlayerStatus',
  setup() {
    const { t } = useI18n()
    return { }
  },
  props: {
    navigationState: {
      type: PlayerNavigationState,
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
    majorityTitanium() : number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.TITANIUM)
    },
    majorityCarbon() : number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.CARBON)
    },
    majorityEnergy() : number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.ENERGY)
    },
    majorityMinerals() : number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.MINERALS)
    }
  }
})
</script>
