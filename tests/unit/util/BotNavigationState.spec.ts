import Action from '@/services/enum/Action'
import PlayerColor from '@/services/enum/PlayerColor'
import Slot from '@/services/enum/Slot'
import BotNavigationState from '@/util/BotNavigationState'
import { expect } from 'chai'
import mockCardDeck from '../helper/mockCardDeck'
import mockLunaState from '../helper/mockLunaState'
import mockRound from '../helper/mockRound'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'

describe('util/BotNavigationState', () => {
  it('turn-1', () => {
    const cardDeck = mockCardDeck({
      leftMajoritySlot: 'I-4',
      rightMajoritySlot: 'II-1',
      slots: [
        {slot: Slot.B, card: 'I-1', flipped: false},
        {slot: Slot.C, card: 'I-3', flipped: false},
        {slot: Slot.D, card: 'I-12', flipped: false}
      ]
    })
    const state = mockState({
      rounds: [
        mockRound({round:1, initialLunaStates:[
          mockLunaState({cardDeck:cardDeck.toPersistence()}).toPersistence(),
        ]})
      ]
    })
    const route = mockRouteLocation({params:{'round':'1','turn':'1','bot':'1'}})
    const navigationState = new BotNavigationState(route, state)
    const actions = navigationState.lunaActions

    expect(navigationState.round, 'round').to.eq(1)
    expect(navigationState.turn, 'turn').to.eq(1)
    expect(navigationState.bot, 'bot').to.eq(1)
    expect(navigationState.playerColor, 'playerColor').to.eq(PlayerColor.ORANGE)

    expect(actions.length, 'action count').to.eq(4)
    expect(actions[0].action, 'left reveal action').to.eq(Action.GAIN_HELIUM)
    expect(actions[0].count, 'left reveal count').to.eq(2)
    expect(actions[1].action, 'right reveal action').to.eq(Action.ADVANCE_RESEARCH)
    expect(actions[1].count, 'right reveal count').to.eq(1)
    expect(actions[2].action, 'slot B action 1').to.eq(Action.GAIN_CARD)
    expect(actions[3].action, 'slot B action 2').to.eq(Action.GAIN_CARD)
  })

  it('turn-2', () => {
    const cardDeck = mockCardDeck({
      leftMajoritySlot: 'I-4',
      rightMajoritySlot: 'II-1',
      slots: [
        {slot: Slot.B, card: 'I-1', flipped: true},
        {slot: Slot.C, card: 'I-3', flipped: false},
        {slot: Slot.D, card: 'I-12', flipped: false}
      ]
    })
    const state = mockState({
      rounds: [
        mockRound({round:1, turns:[
          {round:1, turn:1, bot:1, lunaState:mockLunaState({cardDeck:cardDeck.toPersistence()}).toPersistence()}
        ]})
      ]
    })
    const route = mockRouteLocation({params:{'round':'1','turn':'2','bot':'1'}})
    const navigationState = new BotNavigationState(route, state)
    const actions = navigationState.lunaActions

    expect(navigationState.round, 'round').to.eq(1)
    expect(navigationState.turn, 'turn').to.eq(2)
    expect(navigationState.bot, 'bot').to.eq(1)

    expect(actions.length, 'action count').to.eq(3)
    expect(actions[0].action, 'slot C action 1').to.eq(Action.GAIN_COIN)
    expect(actions[1].action, 'slot C action 2').to.eq(Action.ADVANCE_COMPANY)
    expect(actions[2].action, 'slot C action 2').to.eq(Action.PLACE_BONUS_MARKER)
  })

  it('turn-1-exceed-helium', () => {
    const cardDeck = mockCardDeck({
      leftMajoritySlot: 'I-4',
      rightMajoritySlot: 'II-1',
      slots: [
        {slot: Slot.B, card: 'I-1', flipped: false},
        {slot: Slot.C, card: 'I-3', flipped: false},
        {slot: Slot.D, card: 'I-12', flipped: false}
      ]
    })
    const state = mockState({
      rounds: [
        mockRound({round:1, initialLunaStates:[
          mockLunaState({heliumCount:28, cardDeck:cardDeck.toPersistence()}).toPersistence(),
        ]})
      ]
    })
    const route = mockRouteLocation({params:{'round':'1','turn':'1','bot':'1'}})
    const navigationState = new BotNavigationState(route, state)
    const actions = navigationState.lunaActions

    expect(actions.length, 'action count').to.eq(5)
    expect(actions[0].action, 'gain exceed coin action').to.eq(Action.GAIN_COIN)
    expect(actions[0].count, 'gain exceed coins').to.eq(4)
    expect(actions[1].action, 'left reveal action').to.eq(Action.GAIN_HELIUM)
    expect(actions[1].count, 'left reveal count').to.eq(2)
    expect(actions[2].action, 'right reveal action').to.eq(Action.ADVANCE_RESEARCH)
    expect(actions[2].count, 'right reveal count').to.eq(1)
    expect(actions[3].action, 'slot B action 1').to.eq(Action.GAIN_CARD)
    expect(actions[4].action, 'slot B action 2').to.eq(Action.GAIN_CARD)
  })

})
