<template>
  <svg width="200" height="200" viewBox="-10 -10 220 220">
    <polygon v-if="playerColor=='red'" points="100,0 200,100 100,200 0,100" :style="styleString"/>
    <path v-else-if="playerColor=='orange'" d="m100,4 24,68h72l-56,44 20,68-60-40-60,40 20-68-56-44h72z" :style="styleString"/>
    <polygon v-else-if="playerColor=='blue'" points="100,0 0,200 200,200" :style="styleString"/>
    <circle v-else-if="playerColor=='green'" cx="100" cy="100" r="100" :style="styleString"/>
    <rect v-else width="200" height="200" :style="styleString"/>
  </svg>
</template>

<script lang="ts">
import PlayerColor from '@/services/enum/PlayerColor'
import { defineComponent } from 'vue'
import getPlayerColorCode from '@/util/getPlayerColorCode'

export default defineComponent({
  name: 'PlayerColorIcon',
  props: {
    playerColor: {
      type: String,
      required: true
    }
  },
  computed: {
    colorCode() : string {
      return getPlayerColorCode(this.playerColor as PlayerColor)
    },
    styleString() : string {
      return `fill:${this.colorCode};stroke:black;stroke-width:10;'`
    }
  }
})
</script>
