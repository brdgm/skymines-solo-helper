/**
 * Get order of player and bots depending on human start player.
 * @param playerCount Player count
 * @param botCount Bot count
 * @param startPlayer (Human) start player
 * @returns Player order
 */
export default function(playerCount: number, botCount: number, startPlayer: number) : PlayerOrder[] {
  const result : PlayerOrder[] = []
  for (let player=startPlayer; player<=playerCount; player++) {
    result.push({player:player})
  }
  for (let bot=1; bot<=botCount; bot++) {
    result.push({bot:bot})
  }
  for (let player=1; player<startPlayer; player++) {
    result.push({player:player})
  }
  return result
}

export class PlayerOrder {
  readonly player?: number
  readonly bot?: number
}
