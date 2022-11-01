<template>
  <div class="container-fluid">
    <div class="row" v-for="(action,index) in lunaActions" :key="index">
      <div class="actionBox col-8 col-md-6 col-lg-4 mt-2 mb-2">
        <component :is="action.action" :action="action" :cardSlot="cardSlot"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'
import Slot from '@/services/enum/Slot'
import BotNavigationState from '@/util/BotNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'
import AdvanceCompany from './action/AdvanceCompany.vue'
import DiscardResearchPlan from './action/DiscardResearchPlan.vue'
import ExpandCompany from './action/ExpandCompany.vue'
import GainCard from './action/GainCard.vue'
import GainCoin from './action/GainCoin.vue'
import PlaceBonusMarker from './action/PlaceBonusMarker.vue'

export default defineComponent({
  name: 'BotActions',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    Icon,
    AdvanceCompany,
    DiscardResearchPlan,
    ExpandCompany,
    GainCard,
    GainCoin,
    PlaceBonusMarker,
  },
  props: {
    navigationState: {
      type: BotNavigationState,
      required: true
    }
  },
  computed: {
    lunaActions() : readonly CardAction[] {
      // filter out helium and research actions - applied automatically
      return this.navigationState.lunaActions
          .filter(item => item.action != Action.GAIN_HELIUM && item.action != Action.ADVANCE_RESEARCH)
    },
    cardSlot() : Slot {
      return this.navigationState.lunaState.cardDeck.slots
          .filter(item => item.flipped)
          .reverse()[0].slot
    }
  }
})
</script>


<style lang="scss" scoped>
.actionBox {
  color: white;
  background-color: #5b718a;
  border-radius: 0.5rem;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #888);
  padding: 1rem;
}
</style>
