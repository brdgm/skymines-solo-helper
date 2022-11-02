import { LunaStatePersistence, Round, Turn } from "@/store";

export default function (params?: MockRoundParams) : Round {
  const round = params?.round ?? 1
  const turns = params?.turns || []
  turns.forEach(turn => turn.round = round)
  return {
    round: round,
    initialLunaStates: params?.initialLunaStates || [],
    turns: turns
  }
}

export interface MockRoundParams {
  round? : number,
  turns? : Turn[],
  initialLunaStates? : LunaStatePersistence[]
}
