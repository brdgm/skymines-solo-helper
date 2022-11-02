<template>
  <h1>{{t('standaloneScoring.title')}}</h1>

  <p v-html="t('standaloneScoring.introduction')"></p>

  <StandaloneFinalScoring/>
  <FooterButtons endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import StandaloneFinalScoring from '@/components/scoring/StandaloneFinalScoring.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'StandaloneScoring',
  components: {
    StandaloneFinalScoring,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
