import FirstPlayerDetector from '@/services/FirstPlayerDetector'
import { expect } from 'chai'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'

describe('services/FirstPlayerDetector', () => {
  it('initial', () => {
    const state = mockState({
      playerCount: 3
    })
    const detector = new FirstPlayerDetector(state)

    expect(detector.getFirstPlayer(1, 1), 'first player').to.eq(1)
    expect(detector.isClaimedThisRound(1, 1), 'claimed').to.false
  })
/*
  it('claimedThisRound', () => {
    const state = mockState({
      playerCount: 3,
      rounds: [
        mockRound({round: 1, turns:[
          {round:1, turn:1, player:1},
          {round:1, turn:1, player:2},
          {round:1, turn:1, player:3},
          {round:1, turn:2, player:1},
          {round:1, turn:2, player:2, claimFirstPlayer:true},
          {round:1, turn:2, player:3}
        ]})
      ]
    })
    const detector = new FirstPlayerDetector(state)

    expect(detector.getFirstPlayer(1, 1), 'first player turn 1-1').to.eq(1)
    expect(detector.isClaimedThisRound(1, 1), 'claimed turn 1-1').to.false
    expect(detector.getFirstPlayer(1, 2), 'first player turn 1-2').to.eq(1)
    expect(detector.isClaimedThisRound(1, 2), 'claimed turn 1-2').to.false
    expect(detector.isClaimedThisRound(1, 2, 1), 'claimed turn 1-2 player 1').to.false
    expect(detector.isClaimedThisRound(1, 2, 2), 'claimed turn 1-2 player 2').to.true
    expect(detector.isClaimedThisRound(1, 2, 3), 'claimed turn 1-2 player 3').to.true
    expect(detector.getFirstPlayer(1, 3), 'first player turn 1-3').to.eq(2)
    expect(detector.isClaimedThisRound(1, 3), 'claimed turn 1-3').to.true
  })

  it('claimedPreviousRound', () => {
    const state = mockState({
      playerCount: 3,
      rounds: [
        mockRound({round: 1, turns:[
          {round:1, turn:1, player:1},
          {round:1, turn:1, player:2},
          {round:1, turn:1, player:3},
          {round:1, turn:2, player:1},
          {round:1, turn:2, player:2},
          {round:1, turn:2, player:3, claimFirstPlayer:true}
        ]}),
        mockRound({round: 2, turns:[
          {round:2, turn:1, player:1},
          {round:2, turn:1, player:2},
          {round:2, turn:1, player:3},
          {round:2, turn:2, player:1},
          {round:2, turn:2, player:2},
          {round:2, turn:2, player:3}
        ]})
      ]
    })
    const detector = new FirstPlayerDetector(state)

    expect(detector.getFirstPlayer(2, 1), 'first player turn 2-1').to.eq(3)
    expect(detector.isClaimedThisRound(2, 1), 'claimed turn 2-1').to.false
    expect(detector.getFirstPlayer(2, 2), 'first player turn 2-2').to.eq(3)
    expect(detector.isClaimedThisRound(2, 2), 'claimed turn 2-2').to.false
    expect(detector.getFirstPlayer(2, 3), 'first player turn 2-3').to.eq(3)
    expect(detector.isClaimedThisRound(2, 3), 'claimed turn 2-3').to.false
  })

  it('claimedPreviousAndCurrentRound', () => {
    const state = mockState({
      playerCount: 3,
      rounds: [
        mockRound({round: 1, turns:[
          {round:1, turn:1, player:1},
          {round:1, turn:1, player:2},
          {round:1, turn:1, player:3},
          {round:1, turn:2, player:1},
          {round:1, turn:2, player:2},
          {round:1, turn:2, player:3, claimFirstPlayer:true}
        ]}),
        mockRound({round: 2, turns:[
          {round:2, turn:1, player:1},
          {round:2, turn:1, player:2, claimFirstPlayer:true},
          {round:2, turn:1, player:3},
          {round:2, turn:2, player:1},
          {round:2, turn:2, player:2},
          {round:2, turn:2, player:3}
        ]})
      ]
    })
    const detector = new FirstPlayerDetector(state)

    expect(detector.getFirstPlayer(2, 1), 'first player turn 2-1').to.eq(3)
    expect(detector.isClaimedThisRound(2, 1), 'claimed turn 2-1').to.false
    expect(detector.isClaimedThisRound(2, 1, 3), 'claimed turn 2-1 player 3').to.false
    expect(detector.isClaimedThisRound(2, 1, 1), 'claimed turn 2-1 player 1').to.false
    expect(detector.isClaimedThisRound(2, 1, 2), 'claimed turn 2-1 player 2').to.true
    expect(detector.getFirstPlayer(2, 2), 'first player turn 2-2').to.eq(2)
    expect(detector.isClaimedThisRound(2, 2), 'claimed turn 2-2').to.true
    expect(detector.getFirstPlayer(2, 3), 'first player turn 2-3').to.eq(2)
    expect(detector.isClaimedThisRound(2, 3), 'claimed turn 2-3').to.true
  })
*/
})
