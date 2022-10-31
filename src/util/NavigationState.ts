import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { State } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"
import PlayerColor from "@/services/enum/PlayerColor"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly player : number
  readonly bot : number
  readonly playerColor : PlayerColor

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.playerCount = setup.playerSetup.playerCount
    this.botCount = setup.playerSetup.botCount

    this.round = parseInt(route.params['round'] as string)
    this.turn = parseInt(route.params['turn'] as string)
    this.player = (route.name == 'TurnPlayer') ? parseInt(route.params['player'] as string) : 0
    this.bot = (route.name == 'TurnBot') ? parseInt(route.params['bot'] as string) : 0
    this.playerColor = this.getPlayerColor(setup.playerSetup.playerColors)
  }

  private getPlayerColor(playerColors : PlayerColor[]) : PlayerColor {
    let playerColor
    if (this.player > 0) {
      playerColor = playerColors[this.player - 1]
    }
    if (this.bot > 0) {
      playerColor = playerColors[this.playerCount + this.bot - 1]
    }
    return playerColor || PlayerColor.RED
  }

}
