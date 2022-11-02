import { State } from "@/store"

/**
 * Determines which (human) player has the first player token.
 */
export default class FirstPlayerDetector {

  private static readonly DEFAULT_FIRST_PLAYER = 1

  private readonly state : State

  public constructor(state : State) {
    this.state = state
  }

  /**
   * Gets the player number which currently has the first player token.
   * @param round Round
   * @param turn Turn
   * @param player Player number - if given, the current round (up to this player) is checked as well
   */
  public getFirstPlayer(round: number, turn: number, player?: number) : number {
    // TODO: implement
    return FirstPlayerDetector.DEFAULT_FIRST_PLAYER
  }

  /**
   * Checks if ths first player marker was already claimed this round by someone (and thus cannot be claimed any longer).
   * @param round Round
   * @param turn Turn
   * @param player Player number - if given, the current round (up to this player) is checked as well
   */
  public isClaimedThisRound(round: number, turn: number, player?: number) : boolean {
    // TODO: implement
    return false
  }

}
