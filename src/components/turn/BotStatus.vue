<template>
  <table>
    <tr>
      <th>Turn</th>
      <td>{{round}}-{{turn}}</td>
    </tr>
    <tr>
      <th>Helium</th>
      <td>{{heliumCount}} + {{heliumCountGain}}</td>
    </tr>
    <tr>
      <th>Research</th>
      <td>{{researchSteps}} + {{researchStepsGain}}</td>
    </tr>
    <tr>
      <th>Grade 2 cards in use</th>
      <td>{{grade2CardsInUse}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import LunaState from '@/services/LunaState'
import NavigationState from '@/util/NavigationState'
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
      type: NavigationState,
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
      return this.navigationState.lunaState as LunaState
    },
    heliumCount() : number {
      return this.lunaState.heliumCount
    },
    heliumCountGain() : number {
      return this.lunaState.getHeliumCountFromActions(this.navigationState.lunaActions)
    },
    researchSteps() : number {
      return this.lunaState.researchSteps
    },
    researchStepsGain() : number {
      return this.lunaState.getResearchStepsFromActions(this.navigationState.lunaActions)
    },
    grade2CardsInUse() : number {
      return this.lunaState.cardDeck.grade2CardsInUse
    }
  }
})
</script>
