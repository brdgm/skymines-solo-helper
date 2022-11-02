import { State } from "@/store"
import { RouteLocation } from "vue-router"
import PlayerColor from "@/services/enum/PlayerColor"
import AbstractNavigationState from "./AbstractNavigationState"
import LunaState from "@/services/LunaState"
import getLunaState from "./getLunaState"
import MajorityType from "@/services/enum/MajorityType"
import FirstPlayerDetector from "@/services/FirstPlayerDetector"

export default class PlayerNavigationState extends AbstractNavigationState {

  readonly player : number
  readonly playerColor : PlayerColor
  readonly fistPlayer : boolean
  readonly canClaimFirstPlayer : boolean
  readonly lunaStates : LunaState[]

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.player = parseInt(route.params['player'] as string)
    this.playerColor = this.playerColors[this.player - 1] || PlayerColor.RED

    const detector = new FirstPlayerDetector(state)
    this.fistPlayer = detector.getFirstPlayerThisRound(this.round, this.turn, this.player) == this.player
    this.canClaimFirstPlayer = !detector.isClaimedThisRound(this.round, this.turn, this.player)

    this.lunaStates = this.getLunaStates(state)
  }

  /**
   * Get states of all Luna bots to display majorities values of bots.
   */
  private getLunaStates(state : State) : LunaState[] {
    const states : LunaState[] = []
    for (let bot=1; bot<=this.botCount; bot++) {
      states.push(getLunaState(state, this.round, this.turn, bot))
    }
    return states
  }

  /**
   * Get the maximum majority cound from all luna bots in this turn.
   * @param majorityType Majority type
   * @returns Majority value
   */
  public getConsolidatedMajorityCount(majorityType : MajorityType) : number {
    return this.lunaStates
        .map(state => state.cardDeck.getMajorityCount(majorityType))
        .reduce((max, value) => value > max ? value : max, 0)
  }

}
