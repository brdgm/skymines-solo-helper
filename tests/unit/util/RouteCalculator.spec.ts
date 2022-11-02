import RouteCalculator from '@/util/RouteCalculator'
import { expect } from 'chai'
import mockRound from '../testutil/mockRound'
import mockState from '../testutil/mockState'

describe('util/RouteCalculator', () => {
  it('getNextRouteTo-round1-turn1-player', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, player:1})

    const state = mockState()
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/1/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('')
  })

  it('getNextRouteTo-round1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:1})

    const state = mockState()
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/1/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/player/1')
  })

  it('getNextRouteTo_round1-turn1-bot2', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})
    
    const state = mockState()
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/player/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})

    const state = mockState({rounds:[
      mockRound(1, [{round:1, turn:1, player:1, passed:true}])
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/bot/1')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})

    const state = mockState({rounds:[
      mockRound(1, [{round:1, turn:1, player:1, passed:true},
        {round:1, turn:1, bot:1, passed:true}])
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/turn/2/bot/2')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})

    const state = mockState({rounds:[
      mockRound(1, [{round:1, turn:1, player:1, passed:true},
        {round:1, turn:1, bot:1, passed:true},
        {round:1, turn:1, bot:2, passed:true}])
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/round/1/end')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round7-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:7, turn:1, bot:2})

    const state = mockState({rounds:[
      mockRound(7, [{round:7, turn:1, player:1, passed:true},
        {round:7, turn:1, bot:1, passed:true},
        {round:7, turn:1, bot:2, passed:true}])
    ]})
    expect(routeCalculator.getNextRouteTo(state)).to.eq('/endOfGame')
    expect(routeCalculator.getBackRouteTo(state)).to.eq('/round/7/turn/1/bot/1')
  })

  it('getFirstTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1})

    const state = mockState()
    expect(routeCalculator.getFirstTurnRouteTo(state)).to.eq('/round/1/turn/1/player/1')
  })

  it('getLastTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1})

    const state = mockState({rounds:[
      mockRound(1, [{round:1, turn:1, player:1, passed:true},
        {round:1, turn:1, bot:1, passed:true},
        {round:1, turn:1, bot:2, passed:true}])
  ]})
    expect(routeCalculator.getLastTurnRouteTo(state)).to.eq('/round/1/turn/1/bot/2')
  })

  it('getLastTurnRouteTo-empty', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1})

    expect(routeCalculator.getLastTurnRouteTo(mockState())).to.eq('')
  })
})
