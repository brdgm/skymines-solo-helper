<template>
  <PlayerColorIcon v-for="playerColor in playerColors" :key="playerColor" :player-color="playerColor"
      class="color" :class="{selected:playerColor==selectedColor}" @click="selectColor(playerColor)"/>
</template>

<script lang="ts">
import PlayerColor from '@/services/enum/PlayerColor'
import { defineComponent } from 'vue'
import getPlayerColorCode from '@/util/getPlayerColorCode'
import PlayerColorIcon from '../structure/PlayerColorIcon.vue'

export default defineComponent({
  name: 'PlayerColorPicker',
  components: {
    PlayerColorIcon
  },
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      playerColors: Object.values(PlayerColor),
      selectedColor: this.modelValue
    }
  },
  methods: {
    getColorCode(color: PlayerColor): string {
      return getPlayerColorCode(color)
    },
    selectColor(color: PlayerColor): void {
      this.selectedColor = color
      this.$emit('update:modelValue', color)
    }
  }
})
</script>

<style lang="scss" scoped>
.color {
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  border: 4px solid transparent;
  border-radius: 0.25rem;
  cursor: pointer;
  &.selected {
    border: 4px solid #999;
  }
}
</style>
