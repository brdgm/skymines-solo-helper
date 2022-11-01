import { LunaStatePersistence, State, Turn } from "@/store"
import { RouteLocation } from "vue-router"
import PlayerColor from "@/services/enum/PlayerColor"
import LunaState from "@/services/LunaState"
import { CardAction } from "@/services/Card"
import AbstractNavigationState from "./AbstractNavigationState"
import Action from "@/services/enum/Action"

export default class BotNavigationState extends AbstractNavigationState {

  readonly bot : number
  readonly lunaState : LunaState
  readonly lunaActions : readonly CardAction[]

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.bot = parseInt(route.params['bot'] as string)
    this.lunaState = this.getLunaState(state)
    this.lunaActions = this.getLunaActions()
  }

  /**
   * Get player color for bot
   */
  protected getPlayerColor(playerColors : PlayerColor[]) : PlayerColor {
    return playerColors[this.playerCount + this.bot - 1] || PlayerColor.RED
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
      const lastBotTurn = BotNavigationState.getLastTurn(currentRound.turns
          .filter(item => item.round==this.round && item.turn<this.turn && item.bot==this.bot))
      persistence = lastBotTurn?.lunaState
    }
    if (!persistence && this.round > 1) {
      const previousRound = state.rounds.find(item => item.round == this.round-1)
      if (previousRound) {
        const lastBotTurn = BotNavigationState.getLastTurn(previousRound.turns
            .filter(item => item.round==this.round-1 && item.bot==this.bot))
        persistence = lastBotTurn?.lunaState
      }
    }
    let lunaState : LunaState
    if (persistence) {
      lunaState = LunaState.fromPersistence(persistence, this.difficultyLevel)
    }
    else {
      if (this.round != 1 || this.turn != 1) {
        console.log(`No persistence for previous turn found for round ${this.round}, turn ${this.turn}, bot ${this.bot}`)
      }
      lunaState = LunaState.new(this.difficultyLevel)
    }
    return lunaState
  }

  private static getLastTurn(turns : Turn[]) : Turn|undefined {
    if (turns.length == 0) {
      return undefined
    }
    return turns.reduce((previous,current) => current.turn > previous.turn ? current : previous)
  }

  /**
   * Get list of luna actions. Draws new cards in first turn of round, and adds
   * the majority card reveal actions to the list of actions.
   */
  private getLunaActions() : CardAction[] {
    const actions : CardAction[] = []
    
    // draw cards if first turn in round
    if (!this.lunaState.cardDeck.hasCardsDrawn) {
      this.lunaState.cardDeck.drawAll()
      // add helium/research from majority card reveal actions
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
        actions.unshift({action:Action.GAIN_COIN, count:gainedCoins})
      }
    }

    return actions
  }

}
