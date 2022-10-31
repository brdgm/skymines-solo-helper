import { LunaStatePersistence } from "@/store"
import CardDeck from "./CardDeck"
import DifficultyLevel from "./enum/DifficultyLevel"

/**
 * Luna State
 */
export default class LunaState {

  private _cardDeck : CardDeck
  private _heliumCount : number
  private _researchSteps : number
  private _difficultyLevel : DifficultyLevel

  public constructor(cardDeck : CardDeck, heliumCount : number, researchSteps : number, difficultyLevel : DifficultyLevel) {
    this._cardDeck = cardDeck
    this._heliumCount = heliumCount
    this._researchSteps = researchSteps
    this._difficultyLevel = difficultyLevel
  }

  public get cardDeck() : CardDeck {
    return this._cardDeck
  }

  public get heliumCount() : number {
    return this._heliumCount
  }

  public get researchSteps() : number {
    return this._researchSteps
  }

  /**
   * Gets persistence view of luna state.
   */
  public toPersistence() : LunaStatePersistence {
    return {
      cardDeck: this._cardDeck.toPersistence(),
      heliumCount: this._heliumCount,
      researchSteps: this._researchSteps
    }
  }

  /**
   * Creates a new luna state and card deck.
   */
  public static new(difficultyLevel : DifficultyLevel) : LunaState {
    let initialHeliumCount = 0
    let initialResearchSteps = 0
    if (difficultyLevel == DifficultyLevel.ADVANCED_6) {
      initialHeliumCount = 1
      initialResearchSteps = 1
    }
    else if (difficultyLevel == DifficultyLevel.ADVANCED_7) {
      initialHeliumCount = 3
      initialResearchSteps = 2
    }
    else if (difficultyLevel == DifficultyLevel.ADVANCED_8) {
      initialHeliumCount = 5
      initialResearchSteps = 3
    }
    return new LunaState(
      CardDeck.new(difficultyLevel),
      initialHeliumCount,
      initialResearchSteps,
      difficultyLevel)
  }

  /**
   * Re-creates luna state from persistence.
   */
  public static fromPersistence(persistence : LunaStatePersistence, difficultyLevel : DifficultyLevel) : LunaState {
    return new LunaState(
      CardDeck.fromPersistence(persistence.cardDeck, difficultyLevel),
      persistence.heliumCount,
      persistence.researchSteps,
      difficultyLevel
    )
  }

}
