<template>
  <span v-html="t('turnBot.action.expandCompany.expand')"></span>
  <div class="expand">
    <Icon type="action" name="expand-company" class="icon"/>
    <div class="value">{{action.count}}</div>
    <div class="minMax">{{t(`turnBot.action.expandCompany.${action.sectorSelection}`)}}</div>
  </div>
</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../../structure/Icon.vue'

export default defineComponent({
  name: 'ExpandCompany',
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
    }
  }
})
</script>

<style lang="scss" scoped>
.expand {
  float: right;
  margin-left: 1rem;
  position: relative;
  width: 6rem;
  height: 6rem;
  .icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 6rem;
  }
  .value {
    position: absolute;
    z-index: 100;
    width: 6rem;
    text-align: center;
    left: 0rem;
    top: 1.2rem;
    font-size: 2.25rem;
    font-weight: bold;
  }
  .minMax {
    position: absolute;
    z-index: 100;
    right: 0;
    bottom: 0;
    font-size: 0.75rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    border: 1px solid white;
    border-radius: 0.25rem;
  }
}
</style>
