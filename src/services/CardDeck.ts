import { CardDeckPersistence } from "@/store"
import * as _ from "lodash"
import Card, { CardAction } from "./Card"
import Cards from "./Cards"
import CardSlot from "./CardSlot"
import Grade from "./enum/Grade"
import MajorityType from "./enum/MajorityType"
import Slot from "./enum/Slot"

/**
 * Luna Card Deck
 */
export default class CardDeck {

  private _pile : Card[]
  private _grade2 : Card[]
  private _leftMajoritySlot? : Card
  private _rightMajoritySlot? : Card
  private _slots : CardSlot[]
  private _discard : Card[]
  private _availableSlots : Slot[]

  public constructor(pile : Card[], grade2 : Card[], leftMajoritySlot : Card|undefined, rightMajoritySlot : Card|undefined,
      slots : CardSlot[], discard : Card[], availableSlots : Slot[]) {
    this._pile = pile
    this._grade2 = grade2
    this._leftMajoritySlot = leftMajoritySlot
    this._rightMajoritySlot = rightMajoritySlot
    this._slots = slots
    this._discard = discard
    this._availableSlots = availableSlots
  }

  public get pile() : readonly Card[] {
    return this._pile
  }

  public get grade2() : readonly Card[] {
    return this._grade2
  }

  public get leftMajoritySlot() : Card|undefined {
    return this._leftMajoritySlot
  }

  public get rightMajoritySlot() : Card|undefined {
    return this._rightMajoritySlot
  }

  public get slots() : readonly CardSlot[] {
    return this._slots
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  public get availableSlots() : readonly Slot[] {
    return this._availableSlots
  }

  /**
   * Draw all cards for new round.
   */
  public drawAll() : void {
    this._leftMajoritySlot = this.draw()
    this._rightMajoritySlot = this.draw()
    this._availableSlots.forEach(slot => this._slots.push({slot:slot, card:this.draw(), flipped:false}))
  }

  /**
   * Draw next card from pile.
   * If pile is empty, reshuffle dicard.
   * @returns Next card
   */
  private draw() : Card {
    if (this._pile.length == 0) {
      this.reshuffleDiscard()
    }
    const newCard = this._pile.shift()
    if (!newCard) {
      throw new Error('No card left in pile and discard.')
    }
    return newCard
  }

  /**
   * Shuffle discard pile together with a new grade 2 card as new draw pile.
   */
  private reshuffleDiscard() : void {
    this._pile.push(...this._discard)
    this._discard = []
    const grade2Card = this._grade2.shift()
    if (grade2Card)  {
      this._pile.push(grade2Card)
    }
    this._pile = _.shuffle(this.pile)
  }

  /**
   * Get the reveal actions from all majority cards.
   */
  public get majorityCardActions() : readonly CardAction[] {
    const actions = []
    if (this._leftMajoritySlot?.revealAction) {
      actions.push(this._leftMajoritySlot?.revealAction)
    }
    if (this._rightMajoritySlot?.revealAction) {
      actions.push(this._rightMajoritySlot?.revealAction)
    }
    return actions
  }

  /**
   * Discard all remaining cards.
   */
  public discardAll() : void {
    if (this._leftMajoritySlot) {
      this._discard.push(this._leftMajoritySlot)      
      this._leftMajoritySlot = undefined
    }
    if (this._rightMajoritySlot) {
      this._discard.push(this._rightMajoritySlot)      
      this._rightMajoritySlot = undefined
    }
    this._discard.push(...this._slots.map(item => item.card))
    this._slots = []
  }

  /**
   * Mark new slot as available
   * @param slot Slot
   */
  public addAvailableSlot(slot : Slot) : void {
    if (this._availableSlots.includes(slot)) {
      throw new Array(`Slot ${slot} is already available.`)
    }
    this._availableSlots.push(slot)
    this._availableSlots.sort()
  }

  /**
   * Checks if more actions are available.
   */
  public get hasNextActions() : boolean {
    return this._slots.find(slot => !slot.flipped) != undefined
  }

  /**
   * Get actions from card in next filled slot.
   * Discards the card after playing it. If it is the last card, discard on of the majority cards as well.
   */
  public getNextActions() : CardAction[] {
    const nextSlot = this._slots.find(slot => !slot.flipped)
    if (!nextSlot) {
      throw new Error('No next action.')
    }
    nextSlot.flipped = true
    if (!this.hasNextActions) {
      this.discardOneMajorityCard()
    }
    return nextSlot.card.actions
  }

  /**
   * Discards one of the two majority cards.
   */
  private discardOneMajorityCard() : void {
    if (!this._leftMajoritySlot || !this._rightMajoritySlot || this._discard.length == 0) {
      return
    }
    this._discard = _.shuffle(this._discard)
    const discardCard = this._discard[0]
    if (discardCard.majorityCountLeft > discardCard.majorityCountRight) {
      this._leftMajoritySlot = undefined
    }
    else if (discardCard.majorityCountRight > discardCard.majorityCountLeft) {
      this._rightMajoritySlot = undefined
    }
  }

  /**
   * Get total count for majority based on majority cards in slots.
   * @param majorityType Majority type
   * @returns Majority value
   */
  public getMajorityCount(majorityType : MajorityType) : number {
    switch (majorityType) {
      case MajorityType.TITANIUM:
        return this._leftMajoritySlot?.majorityCountLeft ?? 0
      case MajorityType.CARBON:
        return this._leftMajoritySlot?.majorityCountRight ?? 0
      case MajorityType.ENERGY:
        return this._rightMajoritySlot?.majorityCountLeft ?? 0
      case MajorityType.MINERALS:
        return this._rightMajoritySlot?.majorityCountRight ?? 0
      case MajorityType.SCIENTISTS:
        return (this._leftMajoritySlot?.scientistCount ?? 0)
            + (this._rightMajoritySlot?.scientistCount ?? 0)
      default:
        throw new Error(`Invalid majority type: ${majorityType}`)
    }
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      pile: this._pile.map(card => card.id),
      grade2: this._grade2.map(card => card.id),
      leftMajoritySlot: this._leftMajoritySlot ? this._leftMajoritySlot.id : undefined,
      rightMajoritySlot: this._rightMajoritySlot ? this._rightMajoritySlot.id : undefined,
      slots: this._slots.map(item => ({slot:item.slot, card:item.card.id, flipped:item.flipped})),
      discard: this._discard.map(card => card.id),
      availableSlots: _.clone(this._availableSlots)
    }
  }

  /**
   * Creates a shuffled new card deck with initially available slots.
   */
  public static new() : CardDeck {
    return new CardDeck(
      _.shuffle(Cards.getAll(Grade.GRADE_1)),
      _.shuffle(Cards.getAll(Grade.GRADE_2)),
      undefined, undefined, [], [],
      [Slot.B,Slot.C,Slot.D]
    )
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.pile.map(Cards.get),
      persistence.grade2.map(Cards.get),
      persistence.leftMajoritySlot ? Cards.get(persistence.leftMajoritySlot) : undefined,
      persistence.rightMajoritySlot ? Cards.get(persistence.rightMajoritySlot) : undefined,
      persistence.slots.map(item => ({slot:item.slot, card:Cards.get(item.card), flipped:item.flipped})),
      persistence.discard.map(Cards.get),
      _.clone(persistence.availableSlots)
    )
  }

}
