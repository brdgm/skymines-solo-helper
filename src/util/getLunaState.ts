import LunaState from "@/services/LunaState";
import { LunaStatePersistence, State } from "@/store";
import getLastTurn from "./getLastTurn";

/**
 * Get Luna state from previous bot turn in same round, or from initial state in round.
 * @param state State
 * @returns Luna state
 */
export default function(state : State, round : number, turn : number, bot : number) : LunaState {
  const difficultyLevel = state.setup.difficultyLevel
  let persistence : LunaStatePersistence|undefined
  const currentRound = state.rounds.find(item => item.round == round)
  if (currentRound) {
    // try to get state from last bot turn in current round
    const lastBotTurn = getLastTurn(currentRound.turns
        .filter(item => item.round==round && item.turn<turn && item.bot==bot))
    persistence = lastBotTurn?.lunaState
    // otherwise use initial luna state for this round
    if (!persistence) {
      persistence = currentRound.initialLunaStates[bot-1]
    }
  }
  let lunaState : LunaState
  if (persistence) {
    lunaState = LunaState.fromPersistence(persistence, difficultyLevel)
  }
  else {
    console.log(`No luna state persistence found for round ${round}, turn ${turn}, bot ${bot}`)
    lunaState = LunaState.new(difficultyLevel)
  }
  return lunaState
}
