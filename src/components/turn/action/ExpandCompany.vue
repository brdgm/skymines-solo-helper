<template>
  <div class="actionBox col" data-bs-toggle="modal" data-bs-target="#modalExpandCompanyHelp">
    <span v-if="isMultipleCompanies" v-html="t('turnBot.action.expandCompany.expandMultiple')"></span>
    <span v-else v-html="t('turnBot.action.expandCompany.expand')"></span>
    <div class="expand">
      <AppIcon type="action" name="expand-company" class="icon"/>
      <div class="value">{{action.count}}</div>
      <div class="minMax">{{t(`turnBot.action.expandCompany.${action.sectorSelection}`)}}</div>
    </div>
  </div>

  <ModalDialog id="modalExpandCompanyHelp" :title="t('turnBot.action.expandCompany.help.title')"
      :size-lg="true" :scrollable="true">
    <template #body>
      <p v-html="t('turnBot.action.expandCompany.help.instruction')"></p>
      <div class="small">

        <p v-html="t('turnBot.action.expandCompany.help.rulesHint')"></p>
        <ul>
          <li v-html="t('turnBot.action.expandCompany.help.hint1')"></li>
          <li v-html="t('turnBot.action.expandCompany.help.hint2')"></li>
          <li v-html="t('turnBot.action.expandCompany.help.hint3')"></li>
        </ul>
        
        <hr/>

        <nav>
          <div class="nav nav-tabs mb-2" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">{{t('turnBot.action.expandCompany.help.moon.title')}}</button>
            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">{{t('turnBot.action.expandCompany.help.belt.title')}}</button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
            <p v-html="t('turnBot.action.expandCompany.help.moon.rulesHint')"></p>
            <ul>
              <li v-html="t('turnBot.action.expandCompany.help.moon.hint1')"></li>
              <ul>
                <li v-html="t('turnBot.action.expandCompany.help.moon.hint2')"></li>
                <li v-html="t('turnBot.action.expandCompany.help.moon.hint3')"></li>
                <li v-if="t('turnBot.action.expandCompany.help.moon.hint4')" v-html="t('turnBot.action.expandCompany.help.moon.hint4')"></li>
              </ul>
              <li v-html="t('turnBot.action.expandCompany.help.moon.hint5')"></li>
            </ul>
          </div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <p v-html="t('turnBot.action.expandCompany.help.belt.rulesHint')"></p>
            <ul>
              <li v-html="t('turnBot.action.expandCompany.help.belt.hint1')"></li>
              <li v-html="t('turnBot.action.expandCompany.help.belt.hint2')"></li>
              <li v-html="t('turnBot.action.expandCompany.help.belt.hint3')"></li>
              <li v-html="t('turnBot.action.expandCompany.help.belt.hint4')"></li>
              <li v-html="t('turnBot.action.expandCompany.help.belt.hint5')"></li>
              <li v-html="t('turnBot.action.expandCompany.help.belt.hint6')"></li>
            </ul>
          </div>
        </div>

      </div>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { CardAction } from '@/services/Card'
import CompanySelection from '@/services/enum/CompanySelection'
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../../structure/AppIcon.vue'
import ModalDialog from 'brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'ExpandCompany',
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
  },
  computed: {
    isMultipleCompanies() : boolean {
      return this.action.companySelection == CompanySelection.LEAD_BIGGEST_MARGIN_TWO_EACH
          ||this.action.companySelection == CompanySelection.MOST_VALUABLE_TWO_EACH
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
