import getLunaState from '@/util/getLunaState'
import { expect } from 'chai'
import mockLunaState from '../helper/mockLunaState'
import mockRound from '../helper/mockRound'
import mockState from '../helper/mockState'

describe('util/getLunaState', () => {
  it('initialLunaState', () => {
    const state = mockState({
      rounds: [
        mockRound({round:1, initialLunaStates:[
          mockLunaState({heliumCount:1}).toPersistence(),
          mockLunaState({heliumCount:2}).toPersistence()
        ]})
      ]
    })

    const bot1LunaState = getLunaState(state, 1, 1, 1)
    expect(bot1LunaState.heliumCount, 'bot 1 helium initial').to.eq(1)

    const bot2LunaState = getLunaState(state, 1, 1, 2)
    expect(bot2LunaState.heliumCount, 'bot 2 helium initial').to.eq(2)
  })

  it('lastTurn', () => {
    const state = mockState({
      rounds: [
        mockRound({round:1, initialLunaStates:[
          mockLunaState({heliumCount:1}).toPersistence(),
          mockLunaState({heliumCount:2}).toPersistence()
        ], turns:[
          {round:1,turn:1,bot:1,lunaState: mockLunaState({heliumCount:11}).toPersistence()},
          {round:1,turn:1,bot:2,lunaState: mockLunaState({heliumCount:12}).toPersistence()},
          {round:1,turn:2,bot:1,lunaState: mockLunaState({heliumCount:21}).toPersistence()},
          {round:1,turn:2,bot:2,lunaState: mockLunaState({heliumCount:22}).toPersistence()},
          {round:1,turn:3,bot:1,lunaState: mockLunaState({heliumCount:31}).toPersistence()},
          {round:1,turn:3,bot:2,lunaState: mockLunaState({heliumCount:32}).toPersistence()}
        ]})
      ]
    })

    const bot1LunaState = getLunaState(state, 1, 3, 1)
    expect(bot1LunaState.heliumCount, 'bot 1 helium turn previous to 3').to.eq(21)

    const bot2LunaState = getLunaState(state, 1, 3, 2)
    expect(bot2LunaState.heliumCount, 'bot 2 helium turn previous to 3').to.eq(22)
  })
})
