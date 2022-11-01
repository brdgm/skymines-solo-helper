import { State } from "@/store"
import { RouteLocation } from "vue-router"
import PlayerColor from "@/services/enum/PlayerColor"
import AbstractNavigationState from "./AbstractNavigationState"

export default class PlayerNavigationState extends AbstractNavigationState {

  readonly player : number

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.player = parseInt(route.params['player'] as string)
  }

  /**
   * Get player color for player
   */
  protected getPlayerColor(playerColors : PlayerColor[]) : PlayerColor {
    return playerColors[this.player - 1] || PlayerColor.RED
  }

}
