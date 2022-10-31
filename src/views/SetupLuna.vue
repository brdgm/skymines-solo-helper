<template>
  <h1>{{t('setupLuna.title')}}</h1>

  <p v-html="t('setupLuna.forEach')"></p>
  <ol>
    <li v-html="t('setupLuna.playerToken')"></li>
    <li v-html="t('setupLuna.coinsBonusMarkers')"></li>
    <li v-html="t('setupLuna.trackMarkers')"></li>
    <li v-html="t('setupLuna.startingBonus')"></li>
  </ol>
  <p v-html="t('setupLuna.finalNotes')"></p>

  <router-link to="/round/1/turn/1/player/1" class="btn btn-primary btn-lg mt-4">
    {{t('action.startGame')}}
  </router-link>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'SetupLuna',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
