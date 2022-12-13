import DifficultyLevel from "@/services/enum/DifficultyLevel"
import LunaState from "@/services/LunaState"
import { State } from "@/store"
import { Store } from "vuex"
import getLastTurn from "../util/getLastTurn"

/**
 * Prepares Luna states for new round.
 */
export default class InitialLunaStates {

  private readonly store : Store<State>
  private readonly difficultyLevel : DifficultyLevel
  private readonly botCount : number

  public constructor(store : Store<State>) {
    this.store = store
    this.difficultyLevel = store.state.setup.difficultyLevel
    this.botCount = store.state.setup.playerSetup.botCount
  }

  /**
   * Stores a new round with luna states from previous round, or new ones for first round.
   * Draws new cards for each bot.
   * @param round round
   * @param lunaHeliumBonus Helium Bonus for luna from start research tokens (only round 1)
   */
  public prepareRound(round : number, lunaHeliumBonus? : (number|undefined)[]) : void {
    let lunaStates

    // get/prepare luna states
    if (round == 1) {
      lunaStates = this.newLunaStates(lunaHeliumBonus)
    }
    else {
      lunaStates = this.getLunaStatesFromRound(round-1)
    }
    
    // draw cards for new round
    lunaStates.forEach(this.drawCards)

    // store round
    const lunaStatesPersistence = lunaStates.map(item => item.toPersistence())
    this.store.commit('prepareRound', {round:round, initialLunaStates:lunaStatesPersistence, turns:[]})
  }

  /**
   * Prepare new Luna states for first round.
   */
  private newLunaStates(lunaHeliumBonus? : (number|undefined)[]) : LunaState[] {
    const initialLunaStates : LunaState[] = []
    for (let botIndex=0; botIndex<this.botCount; botIndex++) {
      initialLunaStates[botIndex] = this.newLunaState()
      if (lunaHeliumBonus) {
        const heliumBonus = lunaHeliumBonus[botIndex]
        if (heliumBonus) {
          initialLunaStates[botIndex].addHelium(heliumBonus)
        }
      }
    }
    return initialLunaStates
  }

  /**
   * Get last Luna states from last turns in given round.
   */
  private getLunaStatesFromRound(roundNo : number) : LunaState[] {
    const initialLunaStates : LunaState[] = []
    const roundTurns = this.store.state.rounds.find(item => item.round==roundNo)?.turns ?? []
    for (let bot=1; bot<=this.botCount; bot++) {
      const botTurns = roundTurns.filter(item => item.bot==bot)
      const lastTurn = getLastTurn(botTurns)
      let lunaState
      if (lastTurn?.lunaState) {
        lunaState = LunaState.fromPersistence(lastTurn?.lunaState, this.difficultyLevel)
      }
      else {
        console.log(`Unable to get luna state for round ${roundNo}, bot ${bot}.`)
        lunaState = this.newLunaState()
      }
      initialLunaStates.push(lunaState)
    }
    return initialLunaStates
  }

  private newLunaState() : LunaState {
    return LunaState.new(this.difficultyLevel)
  }

  private drawCards(lunaState : LunaState) {
    const cardDeck = lunaState.cardDeck
    if (cardDeck.hasCardsDrawn) {
      cardDeck.discardAll()
    }
    cardDeck.drawAll()
  }

}
