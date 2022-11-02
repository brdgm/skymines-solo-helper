import getPlayerOrder from '@/util/getPlayerOrder'
import { expect } from 'chai'

describe('util/getPlayerOrder', () => {
  it('1player-1bot', () => {
    expect(getPlayerOrder(1,1,1)).to.eql([
      {player:1},
      {bot:1}
    ])
  })

  it('3player-2bot-firstplayer1', () => {
    expect(getPlayerOrder(3,2,1)).to.eql([
      {player:1},
      {player:2},
      {player:3},
      {bot:1},
      {bot:2}
    ])
  })

  it('3player-2bot-firstplayer2', () => {
    expect(getPlayerOrder(3,2,2)).to.eql([
      {player:2},
      {player:3},
      {bot:1},
      {bot:2},
      {player:1}
    ])
  })

  it('3player-2bot-firstplayer3', () => {
    expect(getPlayerOrder(3,2,3)).to.eql([
      {player:3},
      {bot:1},
      {bot:2},
      {player:1},
      {player:2}
    ])
  })
})
