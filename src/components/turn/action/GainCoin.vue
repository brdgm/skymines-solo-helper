<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalGainCoinHelp">
    <div>{{t('turnBot.action.lunaGains')}}</div>
    <div class="action">
      <span>{{action.count}}</span>
      <AppIcon type="action" name="gain-coin" class="icon"/>
    </div>
  </div>

  <ModalDialog id="modalGainCoinHelp" :title="t('turnBot.action.gainCoin.help.title')">
    <template #body>
      <p v-html="t('turnBot.action.gainCoin.help.instruction')"></p>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../structure/AppIcon.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'GainCoin',
  components: {
    AppIcon,
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
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
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: inline-block;
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
