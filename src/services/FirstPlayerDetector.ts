import { State } from "@/store"
import getTurnOrder, { TurnOrder } from "@/util/getTurnOrder"

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
   * Get first player for this round (by looking at previous round).
   * In first round, returns the default first player (1).
   * @param roundNo Round
   * @return First player
   */
  public getFirstPlayerRoundStart(roundNo: number) : number {
    return this.getFirstPlayerFromRoundRecursive(roundNo-1)
  }

  /**
   * Get the first player by also looking at the current round/turn, respecting
   * a claim of first player toking within this round.
   * @param roundNo Current round
   * @param turnNo Current turn
   * @param player Current player
   */
  public getFirstPlayerThisRound(roundNo: number, turnNo: number, player: number) : number {
    // get first player from previous round / or the default fist player
    const firstPlayer = this.getFirstPlayerRoundStart(roundNo)

    // check if first player token was claimed this round
    const firstPlayerClaimedThisRound = this.getFirstPlayerClaimedThisRound(roundNo, turnNo, player, firstPlayer)

    return firstPlayerClaimedThisRound ?? firstPlayer
  }

  /**
   * Checks if ths first player marker was already claimed this round by someone (and thus cannot be claimed any longer).
   * @param roundNo Current round
   * @param turnNo Current turn
   * @param player Current player
   */
  public isClaimedThisRound(roundNo: number, turnNo: number, player: number) : boolean {
    // get first player from previous round / or the default fist player
    const firstPlayer = this.getFirstPlayerRoundStart(roundNo)

    // check if first player token was claimed this round
    const firstPlayerClaimedThisRound = this.getFirstPlayerClaimedThisRound(roundNo, turnNo, player, firstPlayer)

    return firstPlayerClaimedThisRound != undefined
  }

  /**
   * Checks recursively in the given and the previous rounds if a first player was claimed.
   * Returns default first player if no found.
   * @param roundNo Round
   * @returns First player
   */
  private getFirstPlayerFromRoundRecursive(roundNo : number) : number {
    if (roundNo <= 0) {
      return FirstPlayerDetector.DEFAULT_FIRST_PLAYER
    }
    const round = this.state.rounds.find(item => item.round==roundNo)
    if (round) {
      const turnFirstPlayerClaimed = round.turns.find(item => item.round==roundNo && item.claimFirstPlayer)
      if (turnFirstPlayerClaimed?.player) {
        return turnFirstPlayerClaimed?.player
      }
    }
    return this.getFirstPlayerFromRoundRecursive(roundNo - 1)
  }

  /**
   * Gets the player number of a player that claimed the first player token this round -
   * up to (and excluding) looking at teh current turn of the current player.
   * @param roundNo 
   * @param turnNo 
   * @param player 
   * @param firstPlayer 
   * @returns 
   */
  private getFirstPlayerClaimedThisRound(roundNo : number, turnNo : number,
        player : number, firstPlayer : number) : number|undefined {
    const round = this.state.rounds.find(item => item.round==roundNo)
    if (round) {
      const turnOrder = this.getTurnOrderUpToCurrentPlayerTurn(roundNo, turnNo, player, firstPlayer)
      for (const item of turnOrder) {
        if (round.turns.find(turn => turn.round == roundNo && turn.turn == item.turn
              && turn.player == item.player && turn.claimFirstPlayer)) {
          return item.player
        }
      }
    }
    return undefined
  }

  /**
   * Get turn order for given turn up to (and excluding) the current turn of the current player.
   * Ignores bot turns.
   * @param roundNo Current round
   * @param turnNo Current turn
   * @param player Currenr player
   * @param firstPlayer First player for this round
   * @returns Turn order
   */
  private getTurnOrderUpToCurrentPlayerTurn(roundNo : number, turnNo : number,
        player : number, firstPlayer : number) : TurnOrder[] {
    const result : TurnOrder[] = []
    
    const turnOrder = getTurnOrder(this.state, roundNo, turnNo, firstPlayer)
        .filter(item => item.player)
    for (const item of turnOrder) {
      // stop looking on current turn of current player
      if (item.round == roundNo && item.turn == turnNo && item.player == player) {
        break
      }
      result.push(item)
    }
    
    return result
  }

}
