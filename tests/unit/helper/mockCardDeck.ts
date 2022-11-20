import CardDeck from "@/services/CardDeck";
import DifficultyLevel from "@/services/enum/DifficultyLevel";
import Slot from "@/services/enum/Slot";
import { CardSlotPersistence } from "@/store";

export default function (params?: MockCardDeckParams) : CardDeck {  
  return CardDeck.fromPersistence({
    pile: params?.pile ?? [],
    grade2: params?.grade2 ?? [],
    leftMajoritySlot: params?.leftMajoritySlot,
    rightMajoritySlot: params?.rightMajoritySlot,
    slots: params?.slots ?? [],
    discard: params?.discard ?? [],
    availableSlots: params?.availableSlots ?? [Slot.B,Slot.C,Slot.D]
  }, params?.difficultyLevel ?? DifficultyLevel.L2_STANDARD)
}

export interface MockCardDeckParams {
  pile?: string[]
  grade2?: string[]
  leftMajoritySlot?: string
  rightMajoritySlot?: string
  slots?: CardSlotPersistence[]
  discard?: string[]
  availableSlots?: Slot[]
  difficultyLevel?: DifficultyLevel 
}
