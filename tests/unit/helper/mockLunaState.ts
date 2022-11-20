import DifficultyLevel from "@/services/enum/DifficultyLevel";
import LunaState from "@/services/LunaState";
import mockCardDeck, { MockCardDeckParams } from "./mockCardDeck";

export default function (params?: MockLunaStateParams) : LunaState {  
  let cardDeckParams = params?.cardDeck
  if (!cardDeckParams) {
    cardDeckParams = {}
  }
  if (!cardDeckParams.difficultyLevel) {
    cardDeckParams.difficultyLevel = params?.difficultyLevel
  }
  return LunaState.fromPersistence({
    cardDeck: mockCardDeck(cardDeckParams).toPersistence(),
    heliumCount: params?.heliumCount ?? 0,
    researchSteps: params?.researchSteps ?? 0
  }, params?.difficultyLevel ?? DifficultyLevel.L2_STANDARD)
}

export interface MockLunaStateParams {
  cardDeck?: MockCardDeckParams
  heliumCount?: number
  researchSteps?: number
  difficultyLevel?: DifficultyLevel
}
