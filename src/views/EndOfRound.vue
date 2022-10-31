<template>
  <h1>{{t('endOfRound.title', {round:round})}}</h1>

  <p>...</p>

  <router-link :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-4">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'EndOfRound',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()

    const round = parseInt(route.params['round'] as string)

    return { t, round }
  },
  computed: {
    nextButtonRouteTo() : string {
      // TODO: respect player order
      return `/round/${this.round+1}/turn/1/player/1`
    },
    backButtonRouteTo() : string {
      // TODO: calculate back route
      return `/setupGame`
    }
  }
})
</script>
