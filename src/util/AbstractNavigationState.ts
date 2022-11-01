import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { State } from "@/store"
import { RouteLocation } from "vue-router"
import PlayerColor from "@/services/enum/PlayerColor"
import LunaState from "@/services/LunaState"
import { CardAction } from "@/services/Card"

export default abstract class AbstractNavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly playerColor : PlayerColor
  readonly lunaState? : LunaState
  readonly lunaActions? : readonly CardAction[]

  constructor(route : RouteLocation, state : State) {    
    const setup = state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)
    this.playerColor = this.getPlayerColor(setup.playerSetup.playerColors)
  }

  /**
   * Get player color
   */
   protected abstract getPlayerColor(playerColors : PlayerColor[]) : PlayerColor;

}
