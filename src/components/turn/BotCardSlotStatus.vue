<template>
  <template v-if="cardSlots.length > 0">
    <div class="cardSlots">
      <AppIcon type="luna-card" :name="getCardImage(slot)" v-for="(slot,index) in cardSlots" :key="index"
          class="card" :title="t('turnBot.botStatus.slot',{slot:slot.slot})"/>
    </div>
    <div v-if="showCardIds">
      <div v-for="(cardId,index) in cardIds" :key="index" class="cardId text-muted">{{cardId}}</div>
    </div>
  </template>
</template>

<script lang="ts">
import CardSlot from '@/services/CardSlot'
import Grade from '@/services/enum/Grade'
import LunaState from '@/services/LunaState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'BotCardSlotStatus',
  components: {
    AppIcon
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
  },
  methods: {
    getCardImage(slot : CardSlot) {
      if (slot.flipped) {
        if (slot.card.grade == Grade.GRADE_2) {
          return 'grade-2'
        }
        else {
          return 'grade-1'
        }
      }
      else {
        return 'back'
      }
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
