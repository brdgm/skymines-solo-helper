<template>
  <template v-if="cardSlots.length > 0">
    <div class="cardSlots">
      <Icon name="luna-card" v-for="(slot,index) in cardSlots" :key="index"
          class="card" :class="{flipped:slot.flipped}"
          :title="t('turnBot.botStatus.slot',{slot:slot.slot})"/>
    </div>
    <div v-if="showCardIds">
      <div v-for="(cardId,index) in cardIds" :key="index" class="cardId text-muted">{{cardId}}</div>
    </div>
  </template>
</template>

<script lang="ts">
import CardSlot from '@/services/CardSlot'
import LunaState from '@/services/LunaState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: 'BotCardSlotStatus',
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    lunaState: {
      type: LunaState,
      required: true
    },
    showCardIds: {
      type: Boolean
    }
  },
  computed: {
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
