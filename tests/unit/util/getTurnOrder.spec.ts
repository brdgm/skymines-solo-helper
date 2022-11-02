import getTurnOrder from '@/util/getTurnOrder'
import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'

describe('util/getTurnOrder', () => {
  it('round1-turn2', () => {
    const state = mockState({playerCount:1, botCount:2})
    expect(getTurnOrder(state, 1, 2, 1)).to.eql([
      {round:1, turn:1, player:1},
      {round:1, turn:1, bot:1},
      {round:1, turn:1, bot:2},
      {round:1, turn:2, player:1},
      {round:1, turn:2, bot:1},
      {round:1, turn:2, bot:2},
      {round:1, turn:3, player:1},
      {round:1, turn:3, bot:1},
      {round:1, turn:3, bot:2}
    ])
  })

  it('round1-turn2-passed', () => {
    const state = mockState({playerCount:1, botCount:2, rounds:[
      mockRound({round:1, turns:[
        {round:1,turn:1,player:1},
        {round:1,turn:1,bot:1,passed:true},
        {round:1,turn:1,bot:2},
        {round:1,turn:2,player:1,passed:true},
        {round:1,turn:2,bot:2}
      ]})
    ]})
    expect(getTurnOrder(state, 1, 2, 1)).to.eql([
      {round:1, turn:1, player:1},
      {round:1, turn:1, bot:1},
      {round:1, turn:1, bot:2},
      {round:1, turn:2, player:1},
      {round:1, turn:2, bot:2},
      {round:1, turn:3, bot:2}
    ])
  })

  it('round1-turn2-passed-playerorder', () => {
    const state = mockState({playerCount:2, botCount:2, rounds:[
      mockRound({round:1, turns:[
        {round:1,turn:1,player:2},
        {round:1,turn:1,bot:1,passed:true},
        {round:1,turn:1,bot:2},
        {round:1,turn:1,player:1},
        {round:1,turn:2,player:2},
        {round:1,turn:2,bot:2},
        {round:1,turn:2,player:1,passed:true}
      ]})
    ]})
    expect(getTurnOrder(state, 1, 2, 2)).to.eql([
      {round:1, turn:1, player:2},
      {round:1, turn:1, bot:1},
      {round:1, turn:1, bot:2},
      {round:1, turn:1, player:1},
      {round:1, turn:2, player:2},
      {round:1, turn:2, bot:2},
      {round:1, turn:2, player:1},
      {round:1, turn:3, player:2},
      {round:1, turn:3, bot:2}
    ])
  })
})
