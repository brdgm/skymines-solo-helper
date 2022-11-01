<template>
  <template v-if="isMostValueableShare">
    <span v-html="t('turnBot.action.gainCard.mostValuableShare')"></span>
  </template>
  <template v-else>
    <span v-html="t('turnBot.action.gainCard.matchSlot')"></span>
    <div class="selection">
      <Icon type="selection" name="card-selection" class="matrix"/>
      <table>
        <tr v-for="(row,indexRow) in action.cardSelectionMatrix" :key="indexRow">
          <td v-for="(col,indexCol) in row" :key="indexCol">
            <span v-if="col.includes(cardSlot as Slot)">X</span>
          </td>
        </tr>
      </table>
    </div>
  </template>
</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import CardSelection from '@/services/enum/CardSelection'
import Slot from '@/services/enum/Slot'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../../structure/Icon.vue'

export default defineComponent({
  name: 'GainCard',
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
    isMostValueableShare() : boolean {
      return this.action.cardSelection == CardSelection.MOST_VALUABLE_SHARE
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
    left: 0.5rem;
    top: 0.25rem;
    z-index: 100;
    width: 5rem;
    height: 8.15rem;
    td {
      text-align: center;
      font-size: 1.1rem;
      font-weight: bold;
      width: (100%/3);
      height: calc(100%/4);
    } 
  }
}
</style>
