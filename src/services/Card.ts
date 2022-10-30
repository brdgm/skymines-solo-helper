import Action from "./enum/Action";
import CardSelection from "./enum/CardSelection";
import CompanySelection from "./enum/CompanySelection";
import Grade from "./enum/Grade";
import ResearchPlanSelection from "./enum/ResearchPlanSelection";
import SectorSelection from "./enum/SectorSelection";
import Slot from "./enum/Slot";

export default interface Card {
  id: string
  grade: Grade
  majorityCountLeft: number
  majorityCountRight: number
  scientistCount?: number
  revealAction?: CardAction
  actions: CardAction[]
}

export interface CardAction {
  action: Action
  count?: number
  companySelection?: CompanySelection
  cardSelection?: CardSelection
  sectorSelection?: SectorSelection
  cardSelectionMatrix?: Slot[][][]
  bonusMarkerSelectionMatrix?: Slot[][][]
  researchPlanSelection?: ResearchPlanSelection
  researchPlanRow?: Slot[][]
}