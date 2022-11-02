<template>
  <h1>{{t('endOfRound.title',{round:1})}}</h1>

  <ul class="mt-4">
    <li v-html="t('endOfRound.planningPhase')"></li>
  </ul>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import RouteCalculator from '@/services/RouteCalculator'

export default defineComponent({
  name: 'StartGame',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  methods: {
    next() : void {
      // go to first turn
      const routeCalculator = new RouteCalculator({round:1})
      this.$router.push(routeCalculator.getFirstTurnRouteTo(this.$store.state))
    }
  }
})
</script>
