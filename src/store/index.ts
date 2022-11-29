import DifficultyLevel from '@/services/enum/DifficultyLevel'
import PlayerColor from '@/services/enum/PlayerColor'
import Slot from '@/services/enum/Slot'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "store"

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

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: "en",
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
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    language(state : State, language: string) {
      state.language = language
    },
    setupPlayer(state : State, playerSetup: PlayerSetup) {
      state.setup.playerSetup = playerSetup
    },
    setupDifficultyLevel(state : State, level: number) {
      state.setup.difficultyLevel = level
    },
    prepareRound(state : State, round: Round) {      
      // merge with state already stored in existing round persistence
      const existingRound = state.rounds.find(item => item.round==round.round)
      if (existingRound) {
        if (existingRound.turns.length > 0) {
          round.turns = existingRound.turns
        }
        if (existingRound.initialLunaStates.length > 0) {
          round.initialLunaStates = existingRound.initialLunaStates
        }
      }
      state.rounds = state.rounds.filter(item => item.round!=round.round)
      state.rounds.push(round)
    },
    turnPlayer(state : State, turn: Turn) {
      const round = getRound(state, turn.round)
      round.turns = round.turns.filter(item => item.round==turn.round
          && (item.turn!=turn.turn || item.player!=turn.player))
      round.turns.push(turn)
      if (turn.passed) {
        // if passed: remove all stored later turns for this player
        round.turns = round.turns.filter(item => item.round==turn.round
            && (item.turn<=turn.turn || item.player!=turn.player))
      }
    },
    turnBot(state : State, turn: Turn) {
      const round = getRound(state, turn.round)
      round.turns = round.turns.filter(item => item.round==turn.round
          && (item.turn!=turn.turn || item.bot!=turn.bot))
      round.turns.push(turn)
      if (turn.passed) {
        // if passed: remove all stored later turns for this bot
        round.turns = round.turns.filter(item => item.round==turn.round
            && (item.turn<=turn.turn || item.bot!=turn.bot))
      }
    },
    resetGame(state : State) {
      state.rounds = []
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((_mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}

function getRound(state: State, roundNo: number) : Round {
  let round = state.rounds.find(item => item.round==roundNo)
  if (!round) {
    console.log(`Persistence for round ${roundNo} not found.`)
    round = {round: roundNo, turns: [], initialLunaStates: []}
  }
  return round
}
