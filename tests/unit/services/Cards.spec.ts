import Cards from '@/services/Cards'
import Grade from '@/services/enum/Grade'
import { expect } from 'chai'

describe('Cards', () => {
  it('get', () => {
    const card = Cards.get('I-1')

    expect(card).not.undefined
    expect(card?.id).to.eq('I-1')
  })

  it('getAll', () => {
    const cardsGradeI = Cards.getAll(Grade.GRADE_I)
    const cardsGradeII = Cards.getAll(Grade.GRADE_II)

    expect(cardsGradeI.length).eq(12)
    expect(cardsGradeII.length).eq(7)
  })
})
