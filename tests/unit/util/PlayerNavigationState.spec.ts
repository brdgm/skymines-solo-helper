import MajorityType from '@/services/enum/MajorityType'
import PlayerColor from '@/services/enum/PlayerColor'
import Slot from '@/services/enum/Slot'
import PlayerNavigationState from '@/util/PlayerNavigationState'
import { expect } from 'chai'
import mockCardDeck from '../helper/mockCardDeck'
import mockLunaState from '../helper/mockLunaState'
import mockRound from '../helper/mockRound'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'

describe('util/PlayerNavigationState', () => {
  it('initial-player1', () => {
    const state = mockState({
      playerCount: 2,
      botCount: 1,
      rounds: [
        mockRound({round:1, initialLunaStates:[
          mockLunaState().toPersistence()
        ]})
      ]
    })
    const route = mockRouteLocation({params:{'round':'1','turn':'1','player':'1'}})
    const navigationState = new PlayerNavigationState(route, state)

    expect(navigationState.round, 'round').to.eq(1)
    expect(navigationState.turn, 'turn').to.eq(1)
    expect(navigationState.player, 'player').to.eq(1)
    expect(navigationState.playerColor, 'playerColor').to.eq(PlayerColor.RED)
    expect(navigationState.fistPlayer, 'firstPlayer').to.true
    expect(navigationState.canClaimFirstPlayer, 'canClaimFirstPlayer').to.true
  })

  it('initial-player2', () => {
    const state = mockState({
      playerCount: 2,
      botCount: 1,
      rounds: [
        mockRound({round:1, initialLunaStates:[
          mockLunaState().toPersistence()
        ]})
      ]
    })
    const route = mockRouteLocation({params:{'round':'1','turn':'1','player':'2'}})
    const navigationState = new PlayerNavigationState(route, state)

    expect(navigationState.round, 'round').to.eq(1)
    expect(navigationState.turn, 'turn').to.eq(1)
    expect(navigationState.player, 'player').to.eq(2)
    expect(navigationState.playerColor, 'playerColor').to.eq(PlayerColor.ORANGE)
    expect(navigationState.fistPlayer, 'firstPlayer').to.false
    expect(navigationState.canClaimFirstPlayer, 'canClaimFirstPlayer').to.true
  })

  it('getConsolidatedMajorityCount', () => {
    const bot1CardDeck = mockCardDeck({
      leftMajoritySlot: 'I-4',
      rightMajoritySlot: 'II-1',
      slots: [
        {slot: Slot.B, card: 'I-1', flipped: false},
        {slot: Slot.C, card: 'I-3', flipped: false},
        {slot: Slot.D, card: 'I-12', flipped: false}
      ]
    })
    const bot2CardDeck = mockCardDeck({
      leftMajoritySlot: 'I-2',
      rightMajoritySlot: 'II-7',
      slots: [
        {slot: Slot.B, card: 'I-1', flipped: false},
        {slot: Slot.C, card: 'I-3', flipped: false},
        {slot: Slot.D, card: 'I-12', flipped: false}
      ]
    })
    const state = mockState({
      botCount: 2,
      rounds: [
        mockRound({round:1, initialLunaStates:[
          mockLunaState({cardDeck:bot1CardDeck.toPersistence()}).toPersistence(),
          mockLunaState({cardDeck:bot2CardDeck.toPersistence()}).toPersistence()
        ]})
      ]
    })
    const route = mockRouteLocation({params:{'round':'1','turn':'1','player':'1'}})
    const navigationState = new PlayerNavigationState(route, state)

    expect(navigationState.getConsolidatedMajorityCount(MajorityType.TITANIUM), 'majority: titanium').to.eq(4)
    expect(navigationState.getConsolidatedMajorityCount(MajorityType.CARBON), 'majority: carbon').to.eq(3)
    expect(navigationState.getConsolidatedMajorityCount(MajorityType.ENERGY), 'majority: energy').to.eq(6)
    expect(navigationState.getConsolidatedMajorityCount(MajorityType.MINERALS), 'majority: minerals').to.eq(6)
    expect(navigationState.getConsolidatedMajorityCount(MajorityType.SCIENTISTS), 'majority: scientists').to.eq(2)
  })
})
