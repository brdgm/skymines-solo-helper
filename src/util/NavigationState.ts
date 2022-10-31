import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { LunaStatePersistence, State, Turn } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"
import PlayerColor from "@/services/enum/PlayerColor"
import LunaState from "@/services/LunaState"
import { CardAction } from "@/services/Card"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly player : number
  readonly bot : number
  readonly playerColor : PlayerColor
  readonly lunaState? : LunaState
  readonly lunaActions : readonly CardAction[]

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
    const lunaCombinedActions : CardAction[] = []
    if (this.bot > 0) {
      this.lunaState = this.getLunaState(store.state)
      if (!this.lunaState.cardDeck.hasCardsDrawn) {
        this.lunaState.cardDeck.drawAll()
        // add helium/research from majority card reveal actions
        lunaCombinedActions.push(...this.lunaState.cardDeck.majorityCardActions)
      }
      if (this.lunaState.cardDeck.hasNextActions) {
        // add action from next slot card
        lunaCombinedActions.push(...this.lunaState.cardDeck.getNextActions())
      }
    }
    this.lunaActions = lunaCombinedActions
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

  /**
   * Get Luna state from previous bot round (or create new state for first round).
   * @param state State
   * @returns Luna state
   */
  private getLunaState(state : State) : LunaState {
    let persistence : LunaStatePersistence|undefined
    const currentRound = state.rounds.find(item => item.round == this.round)
    if (currentRound) {
      const lastBotTurn = NavigationState.getLastTurn(currentRound.turns
          .filter(item => item.round==this.round && item.turn<this.turn && item.bot==this.bot))
      persistence = lastBotTurn?.lunaState
    }
    else if (this.round > 1) {
      const previousRound = state.rounds.find(item => item.round == this.round-1)
      if (previousRound) {
        const lastBotTurn = NavigationState.getLastTurn(previousRound.turns
            .filter(item => item.round==this.round && item.bot==this.bot))
        persistence = lastBotTurn?.lunaState
      }
    }
    let lunaState : LunaState
    if (persistence) {
      lunaState = LunaState.fromPersistence(persistence, this.difficultyLevel)
    }
    else {
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

}
