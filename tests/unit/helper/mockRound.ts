import { LunaStatePersistence, Round, Turn } from "@/store";

export default function (params?: MockRoundParams) : Round {
  return {
    round: params?.round ?? 1,
    initialLunaStates: params?.initialLunaStates || [],
    turns: params?.turns ?? []
  }
}

export interface MockRoundParams {
  round? : number
  turns? : Turn[]
  initialLunaStates? : LunaStatePersistence[]
}
