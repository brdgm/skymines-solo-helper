import DifficultyLevel from "@/services/enum/DifficultyLevel";
import PlayerColor from "@/services/enum/PlayerColor";
import { Round, State } from "@/store";

export default function (params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      playerSetup: {
        playerCount: params?.playerCount ?? 1,
        botCount: params?.botCount ?? 1,
        playerColors: params?.playerColors ?? [PlayerColor.RED,PlayerColor.ORANGE,PlayerColor.BLUE,PlayerColor.GREEN]
      },
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.L2_STANDARD
    },
    rounds: params?.rounds ?? []
  }
}

export interface MockStateParams {
  playerCount?: number
  botCount?: number
  playerColors?: PlayerColor[]
  difficultyLevel?: DifficultyLevel
  rounds?: Round[]
}
