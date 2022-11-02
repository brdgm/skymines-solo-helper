import { Turn } from "@/store";

/**
 * Get last turn in turn order from given list of turns.
 * The list already has to be filtern by player/bot.
 * @param turns Turn list
 * @returns Last turn in turn order
 */
export default function(turns : Turn[]) : Turn|undefined {
  if (turns.length == 0) {
    return undefined
  }
  return turns.reduce((previous,current) => current.turn > previous.turn ? current : previous)
}
