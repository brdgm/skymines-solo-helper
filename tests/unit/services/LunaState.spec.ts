import DifficultyLevel from '@/services/enum/DifficultyLevel'
import LunaState from '@/services/LunaState'
import { expect } from 'chai'

describe('LunaState', () => {
  it('new-STANDARD_2', () => {
    const lunaState = LunaState.new(DifficultyLevel.STANDARD_2)

    expect(lunaState.cardDeck.pile.length, 'deck size').to.eq(12)
    expect(lunaState.cardDeck.grade2.length, 'grade2 size').to.eq(7)
    expect(lunaState.heliumCount).to.eq(0)
    expect(lunaState.researchSteps).to.eq(0)
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

})
