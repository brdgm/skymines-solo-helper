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

    expect(detector.getFirstPlayerRoundStart(1), 'fp round 1 start').to.eq(1)
    expect(detector.getFirstPlayerRoundStart(2), 'fp round 2 start').to.eq(1)
    
    expect(detector.getFirstPlayerThisRound(1,1,1), 'fp turn 1-1 p1').to.eq(1)    
    expect(detector.isClaimedThisRound(1,1,1), 'claimed turn 1-1 p1').to.false
  })

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

    expect(detector.getFirstPlayerRoundStart(1), 'fp round 1 start').to.eq(1)
    expect(detector.getFirstPlayerRoundStart(2), 'fp round 2 start').to.eq(2)

    expect(detector.getFirstPlayerThisRound(1,1,1), 'fp turn 1-1 p1').to.eq(1)
    expect(detector.isClaimedThisRound(1,1,1), 'claimed turn 1-1 p1').to.false
    expect(detector.getFirstPlayerThisRound(1,1,2), 'fp turn 1-1 p2').to.eq(1)
    expect(detector.isClaimedThisRound(1,1,2), 'claimed turn 1-1 p2').to.false
    expect(detector.getFirstPlayerThisRound(1,1,3), 'fp turn 1-1 p3').to.eq(1)
    expect(detector.isClaimedThisRound(1,1,3), 'claimed turn 1-1 p3').to.false

    expect(detector.getFirstPlayerThisRound(1,2,1), 'fp turn 1-2 p1').to.eq(1)
    expect(detector.isClaimedThisRound(1,2,1), 'claimed turn 1-2 p1').to.false
    expect(detector.getFirstPlayerThisRound(1,2,2), 'fp turn 1-2 p2').to.eq(1)
    expect(detector.isClaimedThisRound(1,2,2), 'claimed turn 1-2 p2').to.false
    expect(detector.getFirstPlayerThisRound(1,2,3), 'fp turn 1-2 p3').to.eq(2)
    expect(detector.isClaimedThisRound(1,2,3), 'claimed turn 1-2 p3').to.true
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
          {round:2, turn:1, player:3},
          {round:2, turn:1, player:1},
          {round:2, turn:1, player:2},
          {round:2, turn:2, player:3},
          {round:2, turn:2, player:1},
          {round:2, turn:2, player:2}
        ]})
      ]
    })
    const detector = new FirstPlayerDetector(state)

    expect(detector.getFirstPlayerRoundStart(1), 'fp round 1 start').to.eq(1)
    expect(detector.getFirstPlayerRoundStart(2), 'fp round 2 start').to.eq(3)
    expect(detector.getFirstPlayerRoundStart(3), 'fp round 3 start').to.eq(3)
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
          {round:2, turn:1, player:3},
          {round:2, turn:1, player:1},
          {round:2, turn:1, player:2, claimFirstPlayer:true},
          {round:2, turn:2, player:3},
          {round:2, turn:2, player:1},
          {round:2, turn:2, player:2}
        ]})
      ]
    })
    const detector = new FirstPlayerDetector(state)

    expect(detector.getFirstPlayerRoundStart(1), 'fp round 1 start').to.eq(1)
    expect(detector.getFirstPlayerRoundStart(2), 'fp round 2 start').to.eq(3)
    expect(detector.getFirstPlayerRoundStart(3), 'fp round 3 start').to.eq(2)

    expect(detector.getFirstPlayerThisRound(2,1,3), 'fp turn 2-1 p3').to.eq(3)
    expect(detector.isClaimedThisRound(2,1,3), 'claimed turn 2-1 p3').to.false
    expect(detector.getFirstPlayerThisRound(2,1,1), 'fp turn 2-1 p1').to.eq(3)
    expect(detector.isClaimedThisRound(2,1,1), 'claimed turn 2-1 p1').to.false
    expect(detector.getFirstPlayerThisRound(2,1,2), 'fp turn 2-1 p2').to.eq(3)
    expect(detector.isClaimedThisRound(2,1,2), 'claimed turn 2-1 p2').to.false

    expect(detector.getFirstPlayerThisRound(2,2,3), 'fp turn 2-2 p3').to.eq(2)
    expect(detector.isClaimedThisRound(2,2,3), 'claimed turn 2-2 p3').to.true
    expect(detector.getFirstPlayerThisRound(2,2,1), 'fp turn 2-2 p1').to.eq(2)
    expect(detector.isClaimedThisRound(2,2,1), 'claimed turn 2-2 p1').to.true
    expect(detector.getFirstPlayerThisRound(2,2,2), 'fp turn 2-2 p2').to.eq(2)
    expect(detector.isClaimedThisRound(2,2,2), 'claimed turn 2-2 p2').to.true
  })

})
