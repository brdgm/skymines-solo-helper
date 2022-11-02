import { State } from "@/store"
import { RouteLocation } from "vue-router"
import PlayerColor from "@/services/enum/PlayerColor"
import LunaState from "@/services/LunaState"
import { CardAction } from "@/services/Card"
import AbstractNavigationState from "./AbstractNavigationState"
import Action from "@/services/enum/Action"
import getLunaState from "./getLunaState"

export default class BotNavigationState extends AbstractNavigationState {

  readonly bot : number
  readonly playerColor : PlayerColor
  readonly lunaState : LunaState
  readonly lunaActions : readonly CardAction[]

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.bot = parseInt(route.params['bot'] as string)
    this.playerColor = this.playerColors[this.playerCount + this.bot - 1] || PlayerColor.RED
    this.lunaState = getLunaState(state, this.round, this.turn, this.bot)
    this.lunaActions = this.getLunaActions()
  }

  /**
   * Get list of luna actions. Draws new cards in first turn of round, and adds
   * the majority card reveal actions to the list of actions.
   */
  private getLunaActions() : CardAction[] {
    const actions : CardAction[] = []
    
    // on 1st turn: add helium/research from majority card reveal actions
    if (this.turn == 1) {
      actions.push(...this.lunaState.cardDeck.majorityCardActions)
    }

    // add action from next slot card
    if (this.lunaState.cardDeck.hasNextActions) {
      actions.push(...this.lunaState.cardDeck.getNextActions())
    }

    // check if helium/research gain exceeds maximum level and results in extra coin gains
    const gainedCoins = this.lunaState.calculateHeliumResearchExceedCoins(actions)
    if (gainedCoins > 0) {
      actions.unshift({action:Action.GAIN_COIN, count:gainedCoins, revealAction: true})
    }

    return actions
  }

}
