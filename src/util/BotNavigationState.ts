import { LunaStatePersistence, State, Turn } from "@/store"
import { RouteLocation } from "vue-router"
import PlayerColor from "@/services/enum/PlayerColor"
import LunaState from "@/services/LunaState"
import { CardAction } from "@/services/Card"
import AbstractNavigationState from "./AbstractNavigationState"
import Action from "@/services/enum/Action"
import getLastTurn from "./getLastTurn"

export default class BotNavigationState extends AbstractNavigationState {

  readonly bot : number
  readonly playerColor : PlayerColor
  readonly lunaState : LunaState
  readonly lunaActions : readonly CardAction[]

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.bot = parseInt(route.params['bot'] as string)
    this.playerColor = this.playerColors[this.playerCount + this.bot - 1] || PlayerColor.RED
    this.lunaState = this.getLunaState(state)
    this.lunaActions = this.getLunaActions()
  }

  /**
   * Get Luna state from previous bot turn (or create new state for first round).
   * @param state State
   * @returns Luna state
   */
  private getLunaState(state : State) : LunaState {
    let persistence : LunaStatePersistence|undefined
    const currentRound = state.rounds.find(item => item.round == this.round)
    if (currentRound) {
      // try to get state from last bot turn in current round
      const lastBotTurn = getLastTurn(currentRound.turns
          .filter(item => item.round==this.round && item.turn<this.turn && item.bot==this.bot))
      persistence = lastBotTurn?.lunaState
      // otherwise use initial luna state for this round
      if (!persistence) {
        persistence = currentRound.initialLunaStates[this.bot-1]
      }
    }
    let lunaState : LunaState
    if (persistence) {
      lunaState = LunaState.fromPersistence(persistence, this.difficultyLevel)
    }
    else {
      console.log(`No persistence for previous turn found for round ${this.round}, turn ${this.turn}, bot ${this.bot}`)
      lunaState = LunaState.new(this.difficultyLevel)
    }
    return lunaState
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
      // try to add coins to existing gain coins actions - or add new one
      const existingGainCoinsAction = actions.find(item => item.action==Action.GAIN_COIN)
      if (existingGainCoinsAction && existingGainCoinsAction.count) {
        existingGainCoinsAction.count += gainedCoins
      }
      else {
        actions.unshift({action:Action.GAIN_COIN, count:gainedCoins, revealAction: true})
      }
    }

    return actions
  }

}
