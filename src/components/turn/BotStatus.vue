<template>
  <div class="float-end ms-3">
    <p v-html="t('turnBot.botStatus.turn',{round:round,turn:turn})"></p>
    <div class="status">
      <table>
        <tr>
          <td>
            <Icon type="action" name="gain-helium" class="icon"/>
            <div class="label" v-html="t('turnBot.botStatus.helium')"></div>
          </td>
          <td>
            <div class="value">
              <span>{{heliumCount}}</span>
              <span v-if="heliumCountGain > 0" class="gain">+{{heliumCountGain}}</span>
            </div>
            <div class="coin-equivalent" v-if="heliumAsCoins > 0">
              <span>{{heliumAsCoins}}</span>
              <Icon type="action" name="gain-coin" class="icon"/>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <Icon type="action" name="advance-research" class="icon"/>
            <div class="label" v-html="t('turnBot.botStatus.research')"></div>
          </td>
          <td>
            <div class="value">
              <span>{{researchSteps}}</span>
              <span v-if="researchStepsGain > 0" class="gain">+{{researchStepsGain}}</span>
            </div>
            <div class="coin-equivalent" v-if="researchAsCoins > 0">
              <span>{{researchAsCoins}}</span>
              <Icon type="action" name="gain-coin" class="icon"/>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="cardSlots">
      <Icon name="luna-card" v-for="(slot,index) in cardSlots" :key="index"
          class="card" :class="{flipped:slot.flipped}"
          :title="t('turnBot.botStatus.slot',{slot:slot.slot})"/>
    </div>
    <div>
      <div v-for="(cardId,index) in cardIds" :key="index" class="cardId text-muted">{{cardId}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import CardSlot from '@/services/CardSlot'
import LunaState from '@/services/LunaState'
import BotNavigationState from '@/util/BotNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: 'BotStatus',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
    cardSlots() : readonly CardSlot[] {
      return this.lunaState.cardDeck.slots
    },
    cardIds() : string[] {
      return this.cardSlots
          .filter(item => item.flipped)
          .map(item => item.card.id)
    }
  }
})
</script>

<style lang="scss" scoped>
.status {
  color: white;
  background-color: #143142;
  border-radius: 0.5rem;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #888);
  padding: 1rem;
  td {
    text-align: center;
    vertical-align: top;
  }
  .label {
    font-size: 0.7rem;
  }
  .icon {
    margin-top: 0.5rem;
    height: 2rem;
  }
  .value {
    font-size: 2rem;
    font-weight: bold;
    min-width: 2.5rem;
    .gain {
      font-size: 1.5rem;
    }
  }
  .coin-equivalent {
    font-size: 0.7rem;
    .icon {
      margin-left: 0.1rem;
      margin-top: -0.1rem;
      height: 0.7rem;
    }
  }
}
.cardSlots {
  margin-top: 1rem;
  .card {
    display: inline-block;
    width: 1.5rem;
    margin-left: 0.25rem;
    &.flipped {
      filter: invert(100%);
    }
  }
}
.cardId {
  display: inline-block;
  width: 1.5rem;
  margin-left: 0.25rem;
  text-align: center;
  font-size: 0.7rem;
}
</style>
