<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalAdvanceCompanyHelp">
    <div>{{t('turnBot.action.lunaGains')}}</div>
    <div class="action">
      <span>{{action.count}}</span>
      <AppIcon type="action" name="advance-company" class="icon"/>
    </div>
    <p v-html="t(`turnBot.action.advanceCompany.${action.companySelection}`)"></p>
  </div>

  <ModalDialog id="modalAdvanceCompanyHelp" :title="t('turnBot.action.advanceCompany.help.title')"
      :size-lg="true" :scrollable="true">
    <template #body>
      <p v-html="t('turnBot.action.advanceCompany.help.instruction')"></p>
      <div class="small">
        <p v-html="t('turnBot.action.advanceCompany.help.rulesHint')"></p>
        <ul>
          <li v-html="t('turnBot.action.advanceCompany.help.hint1')"></li>
          <li v-html="t('turnBot.action.advanceCompany.help.hint2')"></li>
          <li v-html="t('turnBot.action.advanceCompany.help.hint3')"></li>
          <li v-html="t('turnBot.action.advanceCompany.help.hint4')"></li>
        </ul>
        <hr/>
        <ul>
          <li v-html="t('turnBot.action.advanceCompany.help.mostValuable')"></li>
          <li v-html="t('turnBot.action.advanceCompany.help.tied')"></li>
          <li v-html="t('turnBot.action.advanceCompany.help.biggestMargin')"></li>
          <li v-html="t('turnBot.action.advanceCompany.help.farthestBehind')"></li>
        </ul>
      </div>
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
  name: 'AdvanceCompany',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  components: {
    AppIcon,
    ModalDialog
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
