import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerColor from '@/services/enum/PlayerColor'
import Slot from '@/services/enum/Slot'
import { defineStore } from 'pinia'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
      baseFontSize: 1.0,
      setup: {
        playerSetup: {
          playerCount: 1,
          botCount: 1,
          playerColors: [PlayerColor.RED,PlayerColor.ORANGE,PlayerColor.BLUE,PlayerColor.GREEN]
        },
        difficultyLevel: DifficultyLevel.L2_STANDARD
      },
      rounds: []
    } as State
  },
  actions: {
    prepareRound(round: Round) {      
      // merge with state already stored in existing round persistence
      const existingRound = this.rounds.find(item => item.round==round.round)
      if (existingRound) {
        if (existingRound.turns.length > 0) {
          round.turns = existingRound.turns
        }
        if (existingRound.initialLunaStates.length > 0) {
          round.initialLunaStates = existingRound.initialLunaStates
        }
      }
      this.rounds = this.rounds.filter(item => item.round!=round.round)
      this.rounds.push(round)
    },
    turnPlayer(turn: Turn) {
      const round = getRound(this, turn.round)
      round.turns = round.turns.filter(item => item.round==turn.round
          && (item.turn!=turn.turn || item.player!=turn.player))
      round.turns.push(turn)
      if (turn.passed) {
        // if passed: remove all stored later turns for this player
        round.turns = round.turns.filter(item => item.round==turn.round
            && (item.turn<=turn.turn || item.player!=turn.player))
      }
    },
    turnBot(turn: Turn) {
      const round = getRound(this, turn.round)
      round.turns = round.turns.filter(item => item.round==turn.round
          && (item.turn!=turn.turn || item.bot!=turn.bot))
      round.turns.push(turn)
      if (turn.passed) {
        // if passed: remove all stored later turns for this bot
        round.turns = round.turns.filter(item => item.round==turn.round
            && (item.turn<=turn.turn || item.bot!=turn.bot))
      }
    },
    resetGame() {
      this.rounds = []
    }
  },
  persist: true
})

function getRound(state: State, roundNo: number) : Round {
  let round = state.rounds.find(item => item.round==roundNo)
  if (!round) {
    console.log(`Persistence for round ${roundNo} not found.`)
    round = {round: roundNo, turns: [], initialLunaStates: []}
  }
  return round
}

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  rounds: Round[]
}
export interface Setup {
  playerSetup: PlayerSetup
  difficultyLevel: DifficultyLevel
}
export interface PlayerSetup {
  playerCount: number
  botCount: number
  playerColors: PlayerColor[]
}
export interface Round {
  round: number  
  initialLunaStates: LunaStatePersistence[]
  turns: Turn[]
}
export interface Turn {
  round: number
  turn: number
  player?: number
  bot?: number
  passed?: boolean
  claimFirstPlayer?: boolean
  lunaState?: LunaStatePersistence
}
export interface LunaStatePersistence {
  cardDeck: CardDeckPersistence
  heliumCount: number
  researchSteps: number
}
export interface CardDeckPersistence {
  pile: string[]
  grade2: string[]
  leftMajoritySlot?: string
  rightMajoritySlot?: string
  slots: CardSlotPersistence[]
  discard: string[],
  availableSlots: Slot[]
}
export interface CardSlotPersistence {
  slot: Slot
  card: string
  flipped: boolean
}
