<template>
  {{t('turnBot.action.placeBonusMarker.place')}}
  <div class="selection">
    <Icon type="selection" name="bonus-marker-selection" class="matrix"/>
    <table>
      <tr v-for="(row,indexRow) in action.bonusMarkerSelectionMatrix" :key="indexRow">
        <td v-for="(col,indexCol) in row" :key="indexCol">
          <span v-if="col.includes(slot)">X</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import Slot from '@/services/enum/Slot'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../../structure/Icon.vue'

export default defineComponent({
  name: 'PlaceBonusMarker',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    Icon
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    cardSlot: {
      type: String,
      required: true
    }
  },
  computed: {
    slot() : Slot {
      return this.cardSlot as Slot
    }
  }
})
</script>

<style lang="scss" scoped>
.selection {
  display: inline-block;
  position: relative;
  margin-left: 1rem;
  width: 6rem;
  .matrix {
    width: 6rem;
  }
  table {
    position: absolute;
    left: 0.1rem;
    top: -0.1rem;
    z-index: 100;
    width: 5.9rem;
    height: 7.3rem;
    td {
      text-align: center;
      font-size: 1.1rem;
      font-weight: bold;
      width: calc(100%/4);
      height: calc(100%/3);
    } 
  }
}
</style>
