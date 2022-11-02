import { Turn } from '@/store'
import getLastTurn from '@/util/getLastTurn'
import { expect } from 'chai'

describe('util/getLastTurn', () => {
  it('list-ordered', () => {
    const turns : Turn[] = [
      {round:1,turn:1,player:1},
      {round:1,turn:2,player:1},
      {round:1,turn:3,player:1},
      {round:1,turn:4,player:1,passed:true}
    ]

    const lastTurn = getLastTurn(turns)
    expect(lastTurn).is.not.undefined
    expect(lastTurn?.passed).is.true
  })

  it('list-unordered', () => {
    const turns : Turn[] = [
      {round:1,turn:3,player:1},
      {round:1,turn:1,player:1},
      {round:1,turn:4,player:1,passed:true},
      {round:1,turn:2,player:1}
    ]

    const lastTurn = getLastTurn(turns)
    expect(lastTurn).is.not.undefined
    expect(lastTurn?.passed).is.true
  })

  it('single', () => {
    const turns : Turn[] = [
      {round:1,turn:4,player:1,passed:true}
    ]

    const lastTurn = getLastTurn(turns)
    expect(lastTurn).is.not.undefined
    expect(lastTurn?.passed).is.true
  })

  it('empty', () => {
    const turns : Turn[] = []

    const lastTurn = getLastTurn(turns)
    expect(lastTurn).is.undefined
  })
})
