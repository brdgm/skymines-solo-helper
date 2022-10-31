import PlayerColor from "@/services/enum/PlayerColor";

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.BLUE:
      return "#0159a3"
    case PlayerColor.GREEN:
      return "#a3d2a8"
    case PlayerColor.ORANGE:
      return "#f08418"
    case PlayerColor.RED:
      return "#b41917";
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
