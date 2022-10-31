import { LunaStatePersistence } from "@/store"
import { CardAction } from "./Card"
import CardDeck from "./CardDeck"
import Action from "./enum/Action"
import DifficultyLevel from "./enum/DifficultyLevel"
import Slot from "./enum/Slot"

/**
 * Luna State
 */
export default class LunaState {

  private static readonly HELIUM_MAX = 28
  private static readonly RESEARCH_MAX = 15
  private static readonly HELIUM_SLOT_A_TRESHOLD = 8
  private static readonly RESEARCH_SLOT_E_TRESHOLD = 4

  private _cardDeck : CardDeck
  private _heliumCount : number
  private _researchSteps : number
  private _heliumCardTresholds : number[]
  private _researchCardTresholds : number[]

  public constructor(cardDeck : CardDeck, heliumCount : number, researchSteps : number, difficultyLevel : DifficultyLevel) {
    this._cardDeck = cardDeck
    this._heliumCount = heliumCount
    this._researchSteps = researchSteps
    switch (difficultyLevel) {
      case DifficultyLevel.L3_ADVANCED:
        this._heliumCardTresholds = [11,19]
        this._researchCardTresholds = [5,10]
        break;
      case DifficultyLevel.L4_ADVANCED:
        this._heliumCardTresholds = [9,16]
        this._researchCardTresholds = [4,8]
        break;
      case DifficultyLevel.L5_ADVANCED:
        this._heliumCardTresholds = [7,13]
        this._researchCardTresholds = [2,7]
        break;
      case DifficultyLevel.L6_ADVANCED:
        this._heliumCardTresholds = [6,13]
        this._researchCardTresholds = [4,8]
        break;
      case DifficultyLevel.L7_ADVANCED:
        this._heliumCardTresholds = [7,10]
        this._researchCardTresholds = [5,7]
        break;
      case DifficultyLevel.L8_ADVANCED:
        this._heliumCardTresholds = [8,11]
        this._researchCardTresholds = [5,7]
        break;
      default:
        this._heliumCardTresholds = []
        this._researchCardTresholds = []
        break;
    }
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
   * Add helium, regarding thresholds to add Slot A and grade 2 cards on advanced difficulty levels.
   * @param count Helium count
   * @return Number of coins earned because max. helium limit was reached
   */
  public addHelium(count : number) : number {
    let coins = 0
    for (let i=0; i<count; i++) {
      coins += this.addHeliumSingle()
    }
    return coins
  }

  private addHeliumSingle() : number {
    if (this._heliumCount == LunaState.HELIUM_MAX) {
      // max. helium reached
      return 2
    }
    this._heliumCount++
    if (this._heliumCount == LunaState.HELIUM_SLOT_A_TRESHOLD) {
      this._cardDeck.addAvailableSlot(Slot.A)
    }
    if (this._heliumCardTresholds.includes(this._heliumCount)) {
      this._cardDeck.addGrade2CardToPile()
    }
    return 0
  }

  /**
   * Advance research, regarding thresholds to add Slot E and grade 2 cards on advanced difficulty levels.
   * @param steps Research steps
   * @return Number of coins earned because max. research limit was reached
   */
  public advanceResearch(steps : number) : number {
    let coins = 0
    for (let i=0; i<steps; i++) {
      coins += this.advanceResearchSingle()
    }
    return coins
  }

  private advanceResearchSingle() : number {
    if (this._researchSteps == LunaState.RESEARCH_MAX) {
      // max. research reached
      return 2
    }
    this._researchSteps++
    if (this._researchSteps == LunaState.RESEARCH_SLOT_E_TRESHOLD) {
      this._cardDeck.addAvailableSlot(Slot.E)
    }
    if (this._researchCardTresholds.includes(this._researchSteps)) {
      this._cardDeck.addGrade2CardToPile()
    }
    return 0
  }

  /**
   * Apply card actions that direcly affect the Luna state (advance helium + research).
   * @param actions Action
   * @return Number of coins earned because max. helium or research limit was reached
   */
  public applyActions(actions : readonly CardAction[]) : number {
    return this.addHelium(this.getHeliumCountFromActions(actions))
        + this.advanceResearch(this.getResearchStepsFromActions(actions))
  }

  /**
   * Get sum of helium added with given actions
   * @param actions Actions
   * @returns Helium count
   */
  public getHeliumCountFromActions(actions : readonly CardAction[]) : number {
    return actions
        .filter(item => item.action==Action.GAIN_HELIUM)
        .reduce((sum,item) => sum + (item.count ?? 0), 0)
  }

  /**
   * Get sum of research added with given actions
   * @param actions Actions
   * @returns Research steps
   */
  public getResearchStepsFromActions(actions : readonly CardAction[]) : number {
    return actions
        .filter(item => item.action==Action.ADVANCE_RESEARCH)
        .reduce((sum,item) => sum + (item.count ?? 0), 0)
  }

  /**
   * Returns the equivalent of coins for the stored helium.
   * @returns Coins
   */
  public getHeliumInCoins() : number {
    if (this._heliumCount >= LunaState.HELIUM_MAX) {
      return 60
    }
    else if (this._heliumCount >= 25) {
      return 50
    }
    else if (this._heliumCount >= 23) {
      return 45
    }
    else if (this._heliumCount >= 20) {
      return 40
    }
    else if (this._heliumCount >= 16) {
      return 30
    }
    else if (this._heliumCount >= 13) {
      return 25
    }
    else if (this._heliumCount >= 9) {
      return 15
    }
    else if (this._heliumCount >= 6) {
      return 10
    }
    return 0
  }

  /**
   * Returns the equivalent of coins for the advanced research.
   * @returns Coins
   */
  public getResearchInCoins() : number {
    if (this._researchSteps >= LunaState.RESEARCH_MAX) {
      return 60
    }
    else if (this._researchSteps >= 13) {
      return 50
    }
    else if (this._researchSteps >= 11) {
      return 40
    }
    else if (this._researchSteps >= 9) {
      return 30
    }
    else if (this._researchSteps >= 7) {
      return 20
    }
    else if (this._researchSteps >= 5) {
      return 15
    }
    else if (this._researchSteps >= 3) {
      return 10
    }
    return 0
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
    let initialHeliumCount
    let initialResearchSteps
    switch (difficultyLevel) {
      case DifficultyLevel.L6_ADVANCED:
        initialHeliumCount = 1
        initialResearchSteps = 1
        break;
      case DifficultyLevel.L7_ADVANCED:
        initialHeliumCount = 3
        initialResearchSteps = 2
        break;
      case DifficultyLevel.L8_ADVANCED:
        initialHeliumCount = 5
        initialResearchSteps = 3
        break;
      default:
        initialHeliumCount = 0
        initialResearchSteps = 0
        break;
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
        difficultyLevel)
  }

}
