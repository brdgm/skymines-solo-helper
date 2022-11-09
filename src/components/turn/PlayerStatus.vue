<template>
  <div class="float-end ms-3">
    <p v-html="t('turnPlayer.playerStatus.turn',{round:round,turn:turn})"></p>
    <div class="majorities">
      <div v-html="t('turnPlayer.playerStatus.majorities')"></div>
      <table>
        <tr>
          <td>
            <AppIcon type="majority" name="scientist" class="icon"/>
            <div class="label" v-html="t('turnPlayer.playerStatus.scientist')"></div>
          </td>
          <td class="value">{{majorityScientist}}</td>
        </tr>
        <tr>
          <td>
            <AppIcon type="majority" name="titanium" class="icon"/>
            <div class="label" v-html="t('turnPlayer.playerStatus.titanium')"></div>
          </td>
          <td class="value">{{majorityTitanium}}</td>
        </tr>
        <tr>
          <td>
            <AppIcon type="majority" name="carbon" class="icon"/>
            <div class="label" v-html="t('turnPlayer.playerStatus.carbon')"></div>
          </td>
          <td class="value">{{majorityCarbon}}</td>
        </tr>
        <tr>
          <td>
            <AppIcon type="majority" name="energy" class="icon"/>
            <div class="label" v-html="t('turnPlayer.playerStatus.energy')"></div>
          </td>
          <td class="value">{{majorityEnergy}}</td>
        </tr>
        <tr>
          <td>
            <AppIcon type="majority" name="minerals" class="icon"/>
            <div class="label" v-html="t('turnPlayer.playerStatus.minerals')"></div>
          </td>
          <td class="value">{{majorityMinerals}}</td>
        </tr>
      </table>
    </div>

    <div class="firstPlayerToken" v-if="showFirstPlayer">
      <AppIcon name="first-player-marker" class="icon" v-if="isFirstPlayer"/>
      <button class="btn btn-secondary btn-sm" v-if="canClaimFirstPlayer" @click="firstPlayerClaimed()" v-html="t('turnPlayer.playerStatus.claimFirstPlayer')"></button>
    </div>

    <BotCardSlotStatus v-for="(lunaState,index) of navigationState.lunaStates" :key="index" :luna-state="lunaState"/>

  </div>
</template>

<script lang="ts">
import MajorityType from '@/services/enum/MajorityType'
import PlayerNavigationState from '@/util/PlayerNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '../structure/AppIcon.vue'
import BotCardSlotStatus from './BotCardSlotStatus.vue'

export default defineComponent({
  name: 'PlayerStatus',
  components: {
    AppIcon,
    BotCardSlotStatus
  },
  emits: ['firstPlayerClaimed'],
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: PlayerNavigationState,
      required: true
    }
  },
  data() {
    return {
      claimFirstPlayer : false
    }
  },
  computed: {
    round(): number {
      return this.navigationState.round;
    },
    turn(): number {
      return this.navigationState.turn;
    },
    majorityScientist(): number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.SCIENTISTS);
    },
    majorityTitanium(): number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.TITANIUM);
    },
    majorityCarbon(): number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.CARBON);
    },
    majorityEnergy(): number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.ENERGY);
    },
    majorityMinerals(): number {
      return this.navigationState.getConsolidatedMajorityCount(MajorityType.MINERALS);
    },
    showFirstPlayer() : boolean {
      return this.navigationState.playerCount > 1
    },
    isFirstPlayer() : boolean {
      return this.navigationState.fistPlayer || this.claimFirstPlayer
    },
    canClaimFirstPlayer() : boolean {
      return !this.isFirstPlayer && this.navigationState.canClaimFirstPlayer
    }
  },
  methods: {
    firstPlayerClaimed() : void {
      this.claimFirstPlayer = true
      this.$emit('firstPlayerClaimed')
    }
  }
})
</script>

<style lang="scss" scoped>
.majorities {
  color: white;
  background-color: #143142;
  border-radius: 0.5rem;
  filter: drop-shadow(0.1rem 0.1rem 0.2rem #888);
  padding: 1rem;
  table {
    margin-left: auto;
    margin-right: auto;
  }
  td {
    text-align: center;
    vertical-align: top;
  }
  .label {
    font-size: 0.7rem;
  }
  .icon {
    margin-top: 0.5rem;
    width: 2rem;
  }
  .value {
    font-size: 2rem;
    font-weight: bold;
    min-width: 2.5rem;
  }
}
.firstPlayerToken {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  .icon {
    width: 3rem;
    filter: drop-shadow(0.05rem 0.05rem 0.1rem #888);
  }
}
</style>
