import { LunaStatePersistence, Round, Turn } from "@/store";

export default function (round : number,
      turns : Turn[] = [],
      initialLunaStates : LunaStatePersistence[] = []) : Round {  
  return {
    round: round,
    initialLunaStates: initialLunaStates,
    turns: turns
  }
}
