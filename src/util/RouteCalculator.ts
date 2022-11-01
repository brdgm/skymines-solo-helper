import { State } from "@/store"

/**
 * Calculate routes for next/back respecting "passed" state of players/bots.
 */
export default class RouteCalculator {

  private static readonly MAX_TURN = 99

  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly player? : number
  readonly bot? : number

  constructor(params:{playerCount: number, botCount: number,
      round: number, turn?: number, player?: number, bot?: number}) {    
    this.playerCount = params.playerCount
    this.botCount = params.botCount
    this.round = params.round
    this.turn = params.turn ?? RouteCalculator.MAX_TURN  // when called in EndOfRound/EndOfGame context
    this.player = params.player
    this.bot = params.bot
  }

  /**
   * Get route to next step in round.
   * If all have passed, returns route to round end/game end.
   */
  public getNextRouteTo(state: State) : string {
    const steps = this.generateSteps(state)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const nextStep = steps[currentStepIndex+1]
    if (!nextStep) {
      if (this.round == 7) {
        return `/endOfGame`
      }
      else {
        return `/round/${this.round}/end`
      }
    }
    return RouteCalculator.routeTo(nextStep)
  }

  /**
   * Get route to previous step in round.
   * If this is the first turn in round, returns route to end of previous round (or empty route in first round).
   */
  public getBackRouteTo(state: State) : string {
    const steps = this.generateSteps(state)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const previousStep = steps[currentStepIndex-1]
    if (!previousStep) {
      if (this.round > 1) {
        return `/round/${this.round-1}/end`
      }
      else {
        return ''
      }
    }
    return RouteCalculator.routeTo(previousStep)
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getFirstTurnRouteTo(state: State) : string {
    const playerOrder = this.determinePlayerOrder()
    return RouteCalculator.routeTo({round:this.round,turn:1,player:playerOrder[0].player,bot:playerOrder[0].bot})
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getLastTurnRouteTo(state: State) : string {
    const steps = this.generateSteps(state)
    const lastStep = steps[steps.length-1]
    if (lastStep) {
      return RouteCalculator.routeTo(lastStep)
    }
    else {
      return ''
    }
  }

  /**
   * Generate list of all player/bot steps - leaving out steps after player/bot has passed.
   */
  private generateSteps(state: State) : Step[] {
    const playerOrder = this.determinePlayerOrder()
    const currentRound = state.rounds.find(item => item.round==this.round)
    const turns = currentRound?.turns || []
    const steps : Step[] = []
    let invalidTurn = false
    for (let turnNo=1; turnNo<=this.turn+1; turnNo++) {
      playerOrder.forEach(playerOrder => {
        const hasPassed = turns.find(item => item.round==this.round && item.turn<turnNo
              && item.player==playerOrder.player && item.bot==playerOrder.bot && item.passed) != undefined
        if (!hasPassed) {
          if (turnNo > RouteCalculator.MAX_TURN) {
            // not a valid round as not all have passed, return empty list of steps
            invalidTurn = true
          }
          steps.push({round:this.round,turn:turnNo,player:playerOrder.player,bot:playerOrder.bot})
        }
      })
    }
    if (invalidTurn) {
      return []
    }
    else {
      return steps
    }
  }

  /**
   * Determine player order from previous round (human players may claim first player marker).
   */
  private determinePlayerOrder() : Step[] {
    const playerOrder : Step[] = []
    for (let playerNo=1; playerNo<=this.playerCount; playerNo++) {
      playerOrder.push({player:playerNo})
    }
    for (let botNo=1; botNo<=this.botCount; botNo++) {
      playerOrder.push({bot:botNo})
    }
    // TODO: check for first player marker in previous round
    return playerOrder
  }

  /**
   * Build route to player/bot step
   */
  private static routeTo(step: Step) : string {
    if (step.bot) {
      return `/round/${step.round}/turn/${step.turn}/bot/${step.bot}`
    }
    else {
      return `/round/${step.round}/turn/${step.turn}/player/${step.player}`
    }
  }

}

class Step {
  round?: number
  turn?: number
  player?: number
  bot?: number
}
