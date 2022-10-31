<template>
  <h1>{{t('endOfGame.title')}}</h1>

  <p>...</p>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'EndOfGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  computed: {
    backButtonRouteTo() : string {
      // TODO: calculate back route
      return `/setupGame`
    }
  }
})
</script>
