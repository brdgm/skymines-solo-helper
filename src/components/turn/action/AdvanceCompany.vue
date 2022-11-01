<template>
  <div>{{t('turnBot.action.lunaGains')}}</div>
  <div class="action">
    <span>{{action.count}}</span>
    <Icon type="action" name="advance-company" class="icon"/>
  </div>
  <p v-html="t(`turnBot.action.advanceCompany.${action.companySelection}`)"></p>
</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../../structure/Icon.vue'

export default defineComponent({
  name: 'AdvanceCompany',
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
.action {
  float: left;
  margin-right: 1rem;
  font-size: 3rem;
  line-height: 3rem;
  font-weight: bold;
  .icon {
    width: 3rem;
    margin-top: -0.5rem;
    margin-left: 0.5rem;
  }
}
</style>
