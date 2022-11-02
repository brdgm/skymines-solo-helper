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

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import InitialLunaStates from '@/services/InitialLunaStates'

export default defineComponent({
  name: 'SetupLuna',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()

    return { t }
  },
  methods: {
    startGame() : void {
      // prepare luna states for all bots
      const initialLunaStates = new InitialLunaStates(this.$store)
      initialLunaStates.prepareRound(1)
      // go to start game screen
      this.$router.push("/startGame")
    }
  }
})
</script>
