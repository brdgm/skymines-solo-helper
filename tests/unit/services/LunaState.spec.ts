import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Slot from '@/services/enum/Slot'
import LunaState from '@/services/LunaState'
import { expect } from 'chai'

describe('LunaState', () => {
  it('new-STANDARD_2', () => {
    const lunaState = LunaState.new(DifficultyLevel.STANDARD_2)

    assertState({lunaState: lunaState, label: 'initial',
        heliumCount: 0, researchSteps: 0,
        availableSlots: [Slot.B,Slot.C,Slot.D], pileSize: 12, grade2Size: 7})
  })

  it('new_ADVANCED_6', () => {
    const lunaState = LunaState.new(DifficultyLevel.ADVANCED_6)

    expect(lunaState.heliumCount).to.eq(1)
    expect(lunaState.researchSteps).to.eq(1)
  })

  it('new_ADVANCED_7', () => {
    const lunaState = LunaState.new(DifficultyLevel.ADVANCED_7)

    expect(lunaState.heliumCount).to.eq(3)
    expect(lunaState.researchSteps).to.eq(2)
  })

  it('new_ADVANCED_8', () => {
    const lunaState = LunaState.new(DifficultyLevel.ADVANCED_8)

    expect(lunaState.heliumCount).to.eq(5)
    expect(lunaState.researchSteps).to.eq(3)
  })

  it('addHelium-STANDARD_2', () => {
    const lunaState = LunaState.new(DifficultyLevel.STANDARD_2)

    expect(lunaState.addHelium(5), 'add 5 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'add 5',
        heliumCount: 5, researchSteps: 0,
        availableSlots: [Slot.B,Slot.C,Slot.D], pileSize: 12, grade2Size: 7})

    expect(lunaState.addHelium(6), 'add 6 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'add 6',
        heliumCount: 11, researchSteps: 0,
        availableSlots: [Slot.A,Slot.B,Slot.C,Slot.D], pileSize: 12, grade2Size: 7})

    expect(lunaState.addHelium(18), 'add 18 - coins').to.eq(2)
    assertState({lunaState: lunaState, label: 'add 18',
        heliumCount: 28, researchSteps: 0,
        availableSlots: [Slot.A,Slot.B,Slot.C,Slot.D], pileSize: 12, grade2Size: 7})
  })

  it('addHelium-ADVANCED_4', () => {
    const lunaState = LunaState.new(DifficultyLevel.ADVANCED_4)

    expect(lunaState.addHelium(5), 'add 5 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'add 5',
        heliumCount: 5, researchSteps: 0,
        availableSlots: [Slot.B,Slot.C,Slot.D], pileSize: 12, grade2Size: 7})

    expect(lunaState.addHelium(4), 'add 4 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'add 4',
        heliumCount: 9, researchSteps: 0,
        availableSlots: [Slot.A,Slot.B,Slot.C,Slot.D], pileSize: 13, grade2Size: 6})

    expect(lunaState.addHelium(12), 'add 12 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'add 12',
        heliumCount: 21, researchSteps: 0,
        availableSlots: [Slot.A,Slot.B,Slot.C,Slot.D], pileSize: 14, grade2Size: 5})
  })

  it('advanceResearch-STANDARD_2', () => {
    const lunaState = LunaState.new(DifficultyLevel.STANDARD_2)

    expect(lunaState.advanceResearch(1), 'advance 1 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'advance 1',
        heliumCount: 0, researchSteps: 1,
        availableSlots: [Slot.B,Slot.C,Slot.D], pileSize: 12, grade2Size: 7})

    expect(lunaState.advanceResearch(3), 'advance 3 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'advance 3',
        heliumCount: 0, researchSteps: 4,
        availableSlots: [Slot.B,Slot.C,Slot.D,Slot.E], pileSize: 12, grade2Size: 7})

    expect(lunaState.advanceResearch(11), 'advance 11 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'advance 11',
        heliumCount: 0, researchSteps: 15,
        availableSlots: [Slot.B,Slot.C,Slot.D,Slot.E], pileSize: 12, grade2Size: 7})

    expect(lunaState.advanceResearch(2), 'advance 2 - coins').to.eq(4)
    assertState({lunaState: lunaState, label: 'advance 2',
        heliumCount: 0, researchSteps: 15,
        availableSlots: [Slot.B,Slot.C,Slot.D,Slot.E], pileSize: 12, grade2Size: 7})
  })

  it('advanceResearch-ADVANCED_7', () => {
    const lunaState = LunaState.new(DifficultyLevel.ADVANCED_7)

    expect(lunaState.advanceResearch(1), 'advance 1 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'advance 1',
        heliumCount: 3, researchSteps: 3,
        availableSlots: [Slot.B,Slot.C,Slot.D], pileSize: 12, grade2Size: 7})

    expect(lunaState.advanceResearch(3), 'advance 3 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'advance 3',
        heliumCount: 3, researchSteps: 6,
        availableSlots: [Slot.B,Slot.C,Slot.D,Slot.E], pileSize: 13, grade2Size: 6})

    expect(lunaState.advanceResearch(5), 'advance 5 - coins').to.eq(0)
    assertState({lunaState: lunaState, label: 'advance 5',
        heliumCount: 3, researchSteps: 11,
        availableSlots: [Slot.B,Slot.C,Slot.D,Slot.E], pileSize: 14, grade2Size: 5})
  })
})

function assertState(params: {lunaState: LunaState, label: string,
    heliumCount: number, researchSteps: number,
    availableSlots: Slot[], pileSize: number, grade2Size: number}) : void {
  expect(params.lunaState.heliumCount, `${params.label} - heliumCount`).to.eq(params.heliumCount)
  expect(params.lunaState.researchSteps, `${params.label} - researchSteps`).to.eq(params.researchSteps)
  expect(params.lunaState.cardDeck.availableSlots, `${params.label} - availableSlots`).to.eql(params.availableSlots)
  expect(params.lunaState.cardDeck.pile.length, `${params.label} - pile size`).to.eq(params.pileSize)
  expect(params.lunaState.cardDeck.grade2.length, `${params.label} - grade2 size`).to.eq(params.grade2Size)
}
