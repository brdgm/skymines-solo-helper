<template>
  <div class="float-end">
    <p v-html="t('turnPlayer.playerStatus.turn',{round:round,turn:turn})"></p>
    <div class="majorities">
      <div v-html="t('turnPlayer.playerStatus.majorities')"></div>
      <table>
        <tr>
          <td>
            <Icon type="resource" name="titanium" class="icon"/>
            <div class="label" v-html="t('resource.titanium')"></div>
          </td>
          <td class="value">{{majorityTitanium}}</td>
        </tr>
        <tr>
          <td>
            <Icon type="resource" name="carbon" class="icon"/>
            <div class="label" v-html="t('resource.carbon')"></div>
          </td>
          <td class="value">{{majorityCarbon}}</td>
        </tr>
        <tr>
          <td>
            <Icon type="resource" name="energy" class="icon"/>
            <div class="label" v-html="t('resource.energy')"></div>
          </td>
          <td class="value">{{majorityEnergy}}</td>
        </tr>
        <tr>
          <td>
            <Icon type="resource" name="minerals" class="icon"/>
            <div class="label" v-html="t('resource.minerals')"></div>
          </td>
          <td class="value">{{majorityMinerals}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import MajorityType from '@/services/enum/MajorityType'
import PlayerNavigationState from '@/util/PlayerNavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: 'PlayerStatus',
  components: {
    Icon
  },
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
  computed: {
    round(): number {
      return this.navigationState.round;
    },
    turn(): number {
      return this.navigationState.turn;
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
    }
  }
})
</script>

<style lang="scss" scoped>
.majorities {
  color: white;
  background-color: #5b718a;
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
</style>
