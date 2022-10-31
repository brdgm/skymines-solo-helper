import { State } from "@/store"

/**
 * Calculate routes for next/back respecting "passed" state of players/bots.
 */
export default class RouteCalculator {

  readonly playerCount : number
  readonly botCount : number
  readonly round : number
  readonly turn : number
  readonly player? : number
  readonly bot? : number

  constructor(playerCount: number, botCount: number, round: number, turn: number, player: number, bot: number) {    
    this.playerCount = playerCount
    this.botCount = botCount
    this.round = round
    this.turn = turn
    this.player = player > 0 ? player : undefined
    this.bot = bot > 0 ? bot : undefined
  }

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
   * Generate list of all player/bot steps - leaving out steps after player/bot has passed.
   */
  private generateSteps(state: State) : Step[] {
    const currentRound = state.rounds.find(item => item.round=this.round)
    const turns = currentRound?.turns || []
    const steps = []
    for (let turnNo=1; turnNo<=this.turn+1; turnNo++) {
      for (let playerNo=1; playerNo<=this.playerCount; playerNo++) {
        const hasPassed = turns.find(item => item.round==this.round && item.turn<turnNo && item.player==playerNo && item.passed) != undefined
        if (!hasPassed) {
          steps.push({round:this.round,turn:turnNo,player:playerNo})
        }
      }
      for (let botNo=1; botNo<=this.botCount; botNo++) {
        const hasPassed = turns.find(item => item.round==this.round && item.turn<turnNo && item.bot==botNo && item.passed) != undefined
        if (!hasPassed) {
          steps.push({round:this.round,turn:turnNo,bot:botNo})
        }
      }
    }
    return steps
  }

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
