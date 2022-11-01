import RouteCalculator from '@/util/RouteCalculator'
import { expect } from 'chai'
import { Round, State } from "@/store"
import DifficultyLevel from '@/services/enum/DifficultyLevel'

describe('util/RouteCalculator', () => {
  it('getNextRouteTo-round1-turn1-player', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, player:1})

    expect(routeCalculator.getNextRouteTo(getState([]))).to.eq('/round/1/turn/1/bot/1')
    expect(routeCalculator.getBackRouteTo(getState([]))).to.eq('')
  })

  it('getNextRouteTo-round1-turn1-bot1', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:1})

    expect(routeCalculator.getNextRouteTo(getState([]))).to.eq('/round/1/turn/1/bot/2')
    expect(routeCalculator.getBackRouteTo(getState([]))).to.eq('/round/1/turn/1/player/1')
  })

  it('getNextRouteTo_round1-turn1-bot2', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})

    expect(routeCalculator.getNextRouteTo(getState([]))).to.eq('/round/1/turn/2/player/1')
    expect(routeCalculator.getBackRouteTo(getState([]))).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})

    const rounds = [
      {round:1, initialLunaStates:[], turns: [{round:1, turn:1, player:1, passed:true}]}
    ]
    expect(routeCalculator.getNextRouteTo(getState(rounds))).to.eq('/round/1/turn/2/bot/1')
    expect(routeCalculator.getBackRouteTo(getState(rounds))).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})

    const rounds = [
      {round:1, initialLunaStates:[], turns: [{round:1, turn:1, player:1, passed:true},
        {round:1, turn:1, bot:1, passed:true}]},
    ]
    expect(routeCalculator.getNextRouteTo(getState(rounds))).to.eq('/round/1/turn/2/bot/2')
    expect(routeCalculator.getBackRouteTo(getState(rounds))).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round1-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1, turn:1, bot:2})

    const rounds = [
      {round:1, initialLunaStates:[], turns: [{round:1, turn:1, player:1, passed:true},
        {round:1, turn:1, bot:1, passed:true},
        {round:1, turn:1, bot:2, passed:true}]},
    ]
    expect(routeCalculator.getNextRouteTo(getState(rounds))).to.eq('/round/1/end')
    expect(routeCalculator.getBackRouteTo(getState(rounds))).to.eq('/round/1/turn/1/bot/1')
  })

  it('getNextRouteTo_round7-turn1-bot2-playerpassed-bot1passed-bot2passed', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:7, turn:1, bot:2})

    const rounds = [
      {round:7, initialLunaStates:[], turns: [{round:7, turn:1, player:1, passed:true},
        {round:7, turn:1, bot:1, passed:true},
        {round:7, turn:1, bot:2, passed:true}]},
    ]
    expect(routeCalculator.getNextRouteTo(getState(rounds))).to.eq('/endOfGame')
    expect(routeCalculator.getBackRouteTo(getState(rounds))).to.eq('/round/7/turn/1/bot/1')
  })

  it('getFirstTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1})

    expect(routeCalculator.getFirstTurnRouteTo(getState([]))).to.eq('/round/1/turn/1/player/1')
  })

  it('getLastTurnRouteTo', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1})

    const rounds = [
      {round:1, initialLunaStates:[], turns: [{round:1, turn:1, player:1, passed:true},
        {round:1, turn:1, bot:1, passed:true},
        {round:1, turn:1, bot:2, passed:true}]},
    ]
    expect(routeCalculator.getLastTurnRouteTo(getState(rounds))).to.eq('/round/1/turn/1/bot/2')
  })

  it('getLastTurnRouteTo-empty', () => {
    const routeCalculator = new RouteCalculator({playerCount:1, botCount:2, round:1})

    expect(routeCalculator.getLastTurnRouteTo(getState([]))).to.eq('')
  })
})

function getState(rounds: Round[]) : State {
  return {
    language: '',
    baseFontSize: 0,
    setup: {
      playerSetup: {
        playerCount: 0,
        botCount: 0,
        playerColors: []
      },
      difficultyLevel: DifficultyLevel.L2_STANDARD
    },
    rounds: rounds
  }
}
