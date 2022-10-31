import CardDeck from '@/services/CardDeck'
import CardSlot from '@/services/CardSlot'
import Action from '@/services/enum/Action'
import MajorityType from '@/services/enum/MajorityType'
import Slot from '@/services/enum/Slot'
import { CardSlotPersistence } from '@/store'
import { expect } from 'chai'

describe('CardDeck', () => {
  it('new', () => {
    const cardDeck = CardDeck.new()

    expect(cardDeck.pile.length, 'deck size').to.eq(12)
    expect(cardDeck.grade2.length, 'grade2 size').to.eq(7)
    expect(cardDeck.leftMajoritySlot, 'left majority slot').to.undefined
    expect(cardDeck.rightMajoritySlot, 'right majority slot').to.undefined
    expect(cardDeck.slots.length, 'slots size').to.eq(0)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
    expect(cardDeck.availableSlots, 'available slots').to.eql([Slot.B,Slot.C,Slot.D])
  })

  it('drawAllDiscardAll', () => {
    const cardDeck = newWithPiles(['I-1','I-2','I-3','I-4','I-5'],[],[])

    cardDeck.drawAll()

    expect(cardDeck.pile.length, 'deck size').to.eq(0)
    expect(cardDeck.grade2.length, 'grade2 size').to.eq(0)
    expect(cardDeck.leftMajoritySlot?.id, 'left majority slots').to.eq('I-1')
    expect(cardDeck.rightMajoritySlot?.id, 'right majority slots').to.eq('I-2')
    expect(cardDeck.slots.length, 'slots size').to.eq(3)
    expect(getSlotCardId(cardDeck.slots, Slot.B), 'slot B').to.eq('I-3')
    expect(getSlotCardId(cardDeck.slots, Slot.C), 'slot C').to.eq('I-4')
    expect(getSlotCardId(cardDeck.slots, Slot.D), 'slot D').to.eq('I-5')
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
    expect(cardDeck.availableSlots, 'available slots').to.eql([Slot.B,Slot.C,Slot.D])

    cardDeck.discardAll()

    expect(cardDeck.pile.length, 'deck size').to.eq(0)
    expect(cardDeck.grade2.length, 'grade2 size').to.eq(0)
    expect(cardDeck.leftMajoritySlot, 'left majority slots').to.undefined
    expect(cardDeck.rightMajoritySlot, 'right majority slots').to.undefined
    expect(cardDeck.slots.length, 'slots size').to.eq(0)
    expect(cardDeck.discard.length, 'discard size').to.eq(5)
  })

  it('drawAll4Slots', () => {
    const cardDeck = newWithPiles(['I-1','I-2','I-3','I-4','I-5','I-6','I-7','I-8'],[],[])

    cardDeck.addAvailableSlot(Slot.E)
    cardDeck.drawAll()

    expect(cardDeck.pile.length, 'deck size').to.eq(2)
    expect(cardDeck.grade2.length, 'grade2 size').to.eq(0)
    expect(cardDeck.leftMajoritySlot?.id, 'left majority slots').to.eq('I-1')
    expect(cardDeck.rightMajoritySlot?.id, 'right majority slots').to.eq('I-2')
    expect(cardDeck.slots.length, 'slots size').to.eq(4)
    expect(getSlotCardId(cardDeck.slots, Slot.B), 'slot B').to.eq('I-3')
    expect(getSlotCardId(cardDeck.slots, Slot.C), 'slot C').to.eq('I-4')
    expect(getSlotCardId(cardDeck.slots, Slot.D), 'slot D').to.eq('I-5')
    expect(getSlotCardId(cardDeck.slots, Slot.E), 'slot E').to.eq('I-6')
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
    expect(cardDeck.availableSlots, 'available slots').to.eql([Slot.B,Slot.C,Slot.D,Slot.E])
  })

  it('drawAll5Slots', () => {
    const cardDeck = newWithPiles(['I-1','I-2','I-3','I-4','I-5','I-6','I-7','I-8'],[],[])

    cardDeck.addAvailableSlot(Slot.A)
    cardDeck.addAvailableSlot(Slot.E)
    cardDeck.drawAll()

    expect(cardDeck.pile.length, 'deck size').to.eq(1)
    expect(cardDeck.grade2.length, 'grade2 size').to.eq(0)
    expect(cardDeck.leftMajoritySlot?.id, 'left majority slots').to.eq('I-1')
    expect(cardDeck.rightMajoritySlot?.id, 'right majority slots').to.eq('I-2')
    expect(cardDeck.slots.length, 'slots size').to.eq(5)
    expect(getSlotCardId(cardDeck.slots, Slot.A), 'slot A').to.eq('I-3')
    expect(getSlotCardId(cardDeck.slots, Slot.B), 'slot B').to.eq('I-4')
    expect(getSlotCardId(cardDeck.slots, Slot.C), 'slot C').to.eq('I-5')
    expect(getSlotCardId(cardDeck.slots, Slot.D), 'slot D').to.eq('I-6')
    expect(getSlotCardId(cardDeck.slots, Slot.E), 'slot E').to.eq('I-7')
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
    expect(cardDeck.availableSlots, 'available slots').to.eql([Slot.A,Slot.B,Slot.C,Slot.D,Slot.E])
  })

  it('drawAllWithReshuffle', () => {
    const cardDeck = newWithPiles(['I-1','I-2','I-3','I-4'],['II-1','II-2'],['I-5'])
  
    cardDeck.drawAll()
  
    expect(cardDeck.pile.length, 'deck size').to.eq(1)
    expect(cardDeck.grade2.length, 'grade2 size').to.eq(1)
    expect(cardDeck.leftMajoritySlot, 'left majority slots').to.not.undefined
    expect(cardDeck.rightMajoritySlot, 'right majority slots').to.not.undefined
    expect(cardDeck.slots.length, 'slots size').to.eq(3)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)
  })
  
  it('majorityCardsBoth', () => {
    const cardDeck = newWithSlots('I-4','II-1',[])
  
    const majorityActions = cardDeck.majorityCardActions
  
    expect(majorityActions.length).to.eq(2)
    expect(majorityActions[0].action).to.eq(Action.GAIN_HELIUM)
    expect(majorityActions[0].count).to.eq(2)
    expect(majorityActions[1].action).to.eq(Action.ADVANCE_RESEARCH)
    expect(majorityActions[1].count).to.eq(1)

    expect(cardDeck.getMajorityCount(MajorityType.TITANIUM)).to.eq(0)
    expect(cardDeck.getMajorityCount(MajorityType.CARBON)).to.eq(3)
    expect(cardDeck.getMajorityCount(MajorityType.ENERGY)).to.eq(4)
    expect(cardDeck.getMajorityCount(MajorityType.MINERALS)).to.eq(6)
    expect(cardDeck.getMajorityCount(MajorityType.SCIENTISTS)).to.eq(2)
  })
  
  it('majorityCardsLeft', () => {
    const cardDeck = newWithSlots('I-4',undefined,[])
  
    const majorityActions = cardDeck.majorityCardActions
  
    expect(majorityActions.length).to.eq(1)
    expect(majorityActions[0].action).to.eq(Action.GAIN_HELIUM)
    expect(majorityActions[0].count).to.eq(2)

    expect(cardDeck.getMajorityCount(MajorityType.TITANIUM)).to.eq(0)
    expect(cardDeck.getMajorityCount(MajorityType.CARBON)).to.eq(3)
    expect(cardDeck.getMajorityCount(MajorityType.ENERGY)).to.eq(0)
    expect(cardDeck.getMajorityCount(MajorityType.MINERALS)).to.eq(0)
    expect(cardDeck.getMajorityCount(MajorityType.SCIENTISTS)).to.eq(1)
  })
  
  it('majorityCardsRight', () => {
    const cardDeck = newWithSlots(undefined,'I-1',[])
  
    const majorityActions = cardDeck.majorityCardActions
  
    expect(majorityActions.length).to.eq(0)

    expect(cardDeck.getMajorityCount(MajorityType.TITANIUM)).to.eq(0)
    expect(cardDeck.getMajorityCount(MajorityType.CARBON)).to.eq(0)
    expect(cardDeck.getMajorityCount(MajorityType.ENERGY)).to.eq(0)
    expect(cardDeck.getMajorityCount(MajorityType.MINERALS)).to.eq(3)
    expect(cardDeck.getMajorityCount(MajorityType.SCIENTISTS)).to.eq(1)
  })

  it('nextActions', () => {
    const cardDeck = newWithPiles(['I-4','II-1','I-1','I-2','II-2','I-3'],[],['I-12'])
    cardDeck.addAvailableSlot(Slot.E)
    cardDeck.drawAll()

    expect(cardDeck.hasNextActions, 'initial hasNextActions').to.true
    expect(cardDeck.leftMajoritySlot, 'initial leftMajoritySlot').to.not.undefined
    expect(cardDeck.rightMajoritySlot, 'initial rightMajoritySlot').to.not.undefined

    expect(cardDeck.getNextActions().map(item => item.action), 'card-1 actions').to.eql([Action.GAIN_CARD,Action.GAIN_CARD])
    expect(cardDeck.hasNextActions, 'card-1 hasNextActions').to.true
    expect(cardDeck.leftMajoritySlot, 'card-1 leftMajoritySlot').to.not.undefined
    expect(cardDeck.rightMajoritySlot, 'card-1 rightMajoritySlot').to.not.undefined

    expect(cardDeck.getNextActions().map(item => item.action), 'card-2 actions').to.eql([Action.ADVANCE_COMPANY,Action.GAIN_CARD])
    expect(cardDeck.hasNextActions, 'card-2 hasNextActions').to.true
    expect(cardDeck.leftMajoritySlot, 'card-2 leftMajoritySlot').to.not.undefined
    expect(cardDeck.rightMajoritySlot, 'card-2 rightMajoritySlot').to.not.undefined

    expect(cardDeck.getNextActions().map(item => item.action), 'card-3 actions').to.eql([Action.ADVANCE_COMPANY,Action.DISCARD_RESEARCH_PLAN,Action.DISCARD_RESEARCH_PLAN])
    expect(cardDeck.hasNextActions, 'card-3 hasNextActions').to.true
    expect(cardDeck.leftMajoritySlot, 'card-3 leftMajoritySlot').to.not.undefined
    expect(cardDeck.rightMajoritySlot, 'card-3 rightMajoritySlot').to.not.undefined

    expect(cardDeck.getNextActions().map(item => item.action), 'card-4 actions').to.eql([Action.GAIN_COIN,Action.ADVANCE_COMPANY,Action.PLACE_BONUS_MARKER])
    expect(cardDeck.hasNextActions, 'card-4 hasNextActions').to.false
    expect(cardDeck.leftMajoritySlot, 'card-4 leftMajoritySlot').to.undefined
    expect(cardDeck.rightMajoritySlot, 'card-4 rightMajoritySlot').to.not.undefined
  })

})

function newWithPiles(cardIds : string[], grade2 : string[], discard : string[]) : CardDeck {
  return CardDeck.fromPersistence({
    pile: cardIds,
    grade2: grade2,
    leftMajoritySlot: undefined,
    rightMajoritySlot: undefined,
    slots: [],
    discard: discard,
    availableSlots: [Slot.B,Slot.C,Slot.D]
  })
}

function newWithSlots(leftMajoritySlot : string|undefined, rightMajoritySlot : string|undefined, slots: CardSlotPersistence[]) : CardDeck {
  const availableSlots = slots.map(item => item.slot)
  availableSlots.sort()
  return CardDeck.fromPersistence({
    pile: [],
    grade2: [],
    leftMajoritySlot: leftMajoritySlot,
    rightMajoritySlot: rightMajoritySlot,
    slots: slots,
    discard: [],
    availableSlots: availableSlots
  })
}

function getSlotCardId(slots: readonly CardSlot[], slot: Slot) : string|undefined {
  return slots.find(item => item.slot==slot)?.card.id
}
