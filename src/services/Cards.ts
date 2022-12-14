import findMandatory from "brdgm-commons/src/util/map/findMandatory";
import Card from "./Card";
import Action from "./enum/Action";
import CardSelection from "./enum/CardSelection";
import CompanySelection from "./enum/CompanySelection";
import Grade from "./enum/Grade";
import ResearchPlanSelection from "./enum/ResearchPlanSelection";
import SectorSelection from "./enum/SectorSelection";
import Slot from "./enum/Slot";

const cards = [
  {
    id: 'I-1',
    grade: Grade.GRADE_1,
    majorityCountLeft: 0,
    majorityCountRight: 3,
    scientistCount: 1,
    actions: [
      {
        action: Action.GAIN_CARD,
        cardSelection: CardSelection.MATCH_SLOT,
        cardSelectionMatrix: [
          [[],[],[Slot.A,Slot.B,Slot.C,Slot.D,Slot.E]],
          [[],[],[]],
          [[],[],[]],
          [[],[],[]]
        ]
      },
      {
        action: Action.GAIN_CARD,
        cardSelection: CardSelection.MOST_VALUABLE_SHARE
      }
    ]
  },
  {
    id: 'I-2',
    grade: Grade.GRADE_1,
    majorityCountLeft: 4,
    majorityCountRight: 0,
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 2,
        companySelection: CompanySelection.SECOND_MOST_VALUABLE
      },
      {
        action: Action.GAIN_CARD,
        cardSelection: CardSelection.MATCH_SLOT,
        cardSelectionMatrix: [
          [[],[],[]],
          [[Slot.E],[Slot.E],[Slot.B]],
          [[],[Slot.A],[Slot.C]],
          [[],[Slot.A],[Slot.D]]
        ]
      }
    ]
  },
  {
    id: 'I-3',
    grade: Grade.GRADE_1,
    majorityCountLeft: 3,
    majorityCountRight: 0,
    scientistCount: 1,
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 2
      },
      {
        action: Action.ADVANCE_COMPANY,
        count: 2,
        companySelection: CompanySelection.MOST_VALUABLE
      },
      {
        action: Action.PLACE_BONUS_MARKER,
        bonusMarkerSelectionMatrix: [
          [[],[],[],[]],
          [[],[],[Slot.A],[Slot.B]],
          [[],[Slot.C],[Slot.D],[Slot.E]]
        ]
      }
    ]
  },
  {
    id: 'I-4',
    grade: Grade.GRADE_1,
    majorityCountLeft: 0,
    majorityCountRight: 3,
    scientistCount: 1,
    revealAction: {
      action: Action.GAIN_HELIUM,
      count: 2,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 2
      },
      {
        action: Action.ADVANCE_RESEARCH,
        count: 1
      },
      {
        action: Action.PLACE_BONUS_MARKER,
        bonusMarkerSelectionMatrix: [
          [[],[],[],[]],
          [[],[],[],[Slot.E]],
          [[Slot.D],[Slot.C],[Slot.A],[Slot.B]]
        ]
      }
    ]
  },
  {
    id: 'I-5',
    grade: Grade.GRADE_1,
    majorityCountLeft: 3,
    majorityCountRight: 3,
    scientistCount: 1,
    revealAction:{
      action: Action.GAIN_HELIUM,
      count: 2,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 2
      },
      {
        action: Action.ADVANCE_RESEARCH,
        count: 1
      },
      {
        action: Action.PLACE_BONUS_MARKER,
        bonusMarkerSelectionMatrix: [
          [[],[],[],[]],
          [[],[],[Slot.D],[]],
          [[Slot.A],[Slot.B],[Slot.C],[Slot.E]]
        ]
      }
    ]
  },
  {
    id: 'I-6',
    grade: Grade.GRADE_1,
    majorityCountLeft: 4,
    majorityCountRight: 0,
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 2,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN
      },
      {
        action: Action.EXPAND_COMPANY,
        count: 2,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN,
        sectorSelection: SectorSelection.MIN
      }
    ]
  },
  {
    id: 'I-7',
    grade: Grade.GRADE_1,
    majorityCountLeft: 0,
    majorityCountRight: 4,
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 2,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN
      },
      {
        action: Action.EXPAND_COMPANY,
        count: 2,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN,
        sectorSelection: SectorSelection.MAX
      }
    ]
  },
  {
    id: 'I-8',
    grade: Grade.GRADE_1,
    majorityCountLeft: 3,
    majorityCountRight: 3,
    scientistCount: 1,
    revealAction: {
      action: Action.GAIN_HELIUM,
      count: 2,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 2
      },
      {
        action: Action.ADVANCE_RESEARCH,
        count: 1
      },
      {
        action: Action.PLACE_BONUS_MARKER,
        bonusMarkerSelectionMatrix: [
          [[],[],[],[]],
          [[],[],[Slot.C],[]],
          [[Slot.D],[Slot.A],[Slot.B],[Slot.E]]
        ]
      }
    ]
  },
  {
    id: 'I-9',
    grade: Grade.GRADE_1,
    majorityCountLeft: 0,
    majorityCountRight: 3,
    scientistCount: 1,
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 2,
        companySelection: CompanySelection.MOST_VALUABLE_TWO_EACH
      },
      {
        action: Action.DISCARD_RESEARCH_PLAN,
        researchPlanSelection: ResearchPlanSelection.SPECIAL_RESEARCH
      },
      {
        action: Action.DISCARD_RESEARCH_PLAN,
        researchPlanSelection: ResearchPlanSelection.PLAN_A_MATCH_SLOT,
        researchPlanRow: [[Slot.A,Slot.E],[Slot.B],[Slot.C],[Slot.D]]
      }
    ]
  },
  {
    id: 'I-10',
    grade: Grade.GRADE_1,
    majorityCountLeft: 0,
    majorityCountRight: 4,
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 3
      },
      {
        action: Action.ADVANCE_COMPANY,
        count: 3,
        companySelection: CompanySelection.LEAST_VALUABLE
      },
      {
        action: Action.EXPAND_COMPANY,
        count: 3,
        companySelection: CompanySelection.LEAST_VALUABLE,
        sectorSelection: SectorSelection.MAX
      }
    ]
  },
  {
    id: 'I-11',
    grade: Grade.GRADE_1,
    majorityCountLeft: 3,
    majorityCountRight: 0,
    scientistCount: 1,
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 2,
        companySelection: CompanySelection.MOST_VALUABLE_TWO_EACH
      },
      {
        action: Action.DISCARD_RESEARCH_PLAN,
        researchPlanSelection: ResearchPlanSelection.PLAN_B_MATCH_SLOT,
        researchPlanRow: [[Slot.A,Slot.E],[Slot.B],[Slot.C],[Slot.D]]
      },
      {
        action: Action.DISCARD_RESEARCH_PLAN,
        researchPlanSelection: ResearchPlanSelection.PLAN_C_MATCH_SLOT,
        researchPlanRow: [[Slot.A,Slot.E],[Slot.B],[Slot.C],[Slot.D]]
      }
    ]
  },
  {
    id: 'I-12',
    grade: Grade.GRADE_1,
    majorityCountLeft: 3,
    majorityCountRight: 0,
    scientistCount: 1,
    revealAction: {
      action: Action.GAIN_HELIUM,
      count: 2,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_HELIUM,
        count: 2
      },
      {
        action: Action.GAIN_CARD,
        cardSelection: CardSelection.MATCH_SLOT,
        cardSelectionMatrix: [
          [[],[],[Slot.A,Slot.B,Slot.C,Slot.D,Slot.E]],
          [[],[Slot.D],[Slot.A]],
          [[],[Slot.E],[Slot.B]],
          [[],[],[Slot.C]]
        ]
      }
    ]
  },
  {
    id: 'II-1',
    grade: Grade.GRADE_2,
    majorityCountLeft: 4,
    majorityCountRight: 6,
    scientistCount: 1,
    revealAction: {
      action: Action.ADVANCE_RESEARCH,
      count: 1,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 3
      },
      {
        action: Action.ADVANCE_COMPANY,
        count: 3,
        companySelection: CompanySelection.MOST_VALUABLE_TWO_EACH
      },
      {
        action: Action.DISCARD_RESEARCH_PLAN,
        researchPlanSelection: ResearchPlanSelection.PLAN_B_MATCH_SLOT,
        researchPlanRow: [[Slot.A,Slot.E],[Slot.B],[Slot.C],[Slot.D]]
      }
    ]
  },
  {
    id: 'II-2',
    grade: Grade.GRADE_2,
    majorityCountLeft: 6,
    majorityCountRight: 4,
    scientistCount: 1,
    revealAction: {
      action: Action.ADVANCE_RESEARCH,
      count: 1,
      revealAction: true
    },
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 3,
        companySelection: CompanySelection.ALL_FOUR_EACH
      },
      {
        action: Action.DISCARD_RESEARCH_PLAN,
        researchPlanSelection: ResearchPlanSelection.SPECIAL_RESEARCH
      },
      {
        action: Action.DISCARD_RESEARCH_PLAN,
        researchPlanSelection: ResearchPlanSelection.PLAN_A_MATCH_SLOT,
        researchPlanRow: [[Slot.A,Slot.E],[Slot.B],[Slot.C],[Slot.D]]
      }
    ]
  },
  {
    id: 'II-3',
    grade: Grade.GRADE_2,
    majorityCountLeft: 3,
    majorityCountRight: 6,
    scientistCount: 2,
    revealAction: {
      action: Action.ADVANCE_RESEARCH,
      count: 1,
      revealAction: true
    },
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 3,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN
      },
      {
        action: Action.EXPAND_COMPANY,
        count: 3,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN,
        sectorSelection: SectorSelection.MAX
      }
    ]
  },
  {
    id: 'II-4',
    grade: Grade.GRADE_2,
    majorityCountLeft: 4,
    majorityCountRight: 6,
    scientistCount: 1,
    revealAction: {
      action: Action.ADVANCE_RESEARCH,
      count: 1,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 3
      },
      {
        action: Action.ADVANCE_RESEARCH,
        count: 2
      },
      {
        action: Action.PLACE_BONUS_MARKER,
        bonusMarkerSelectionMatrix: [
          [[],[],[],[]],
          [[],[],[Slot.A],[Slot.E]],
          [[Slot.B],[Slot.C],[Slot.D],[]]
        ]
      }
    ]
  },
  {
    id: 'II-5',
    grade: Grade.GRADE_2,
    majorityCountLeft: 6,
    majorityCountRight: 6,
    scientistCount: 1,
    revealAction: {
      action: Action.GAIN_HELIUM,
      count: 2,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_HELIUM,
        count: 2
      },
      {
        action: Action.ADVANCE_RESEARCH,
        count: 2
      },
      {
        action: Action.GAIN_CARD,
        cardSelection: CardSelection.MATCH_SLOT,
        cardSelectionMatrix: [
          [[],[],[]],
          [[],[Slot.D],[Slot.A]],
          [[Slot.E],[],[Slot.B]],
          [[],[],[Slot.C]]
        ]
      },
      {
        action: Action.GAIN_CARD,
        cardSelection: CardSelection.MOST_VALUABLE_SHARE
      }
    ]
  },
  {
    id: 'II-6',
    grade: Grade.GRADE_2,
    majorityCountLeft: 6,
    majorityCountRight: 4,
    scientistCount: 2,
    revealAction: {
      action: Action.GAIN_HELIUM,
      count: 2,
      revealAction: true
    },
    actions: [
      {
        action: Action.GAIN_COIN,
        count: 3
      },
      {
        action: Action.GAIN_HELIUM,
        count: 4
      },
      {
        action: Action.PLACE_BONUS_MARKER,
        bonusMarkerSelectionMatrix: [
          [[],[],[],[]],
          [[],[],[Slot.A],[Slot.E]],
          [[],[Slot.C],[Slot.D],[Slot.B]]
        ]
      }
    ]
  },
  {
    id: 'II-7',
    grade: Grade.GRADE_2,
    majorityCountLeft: 6,
    majorityCountRight: 3,
    scientistCount: 2,
    revealAction: {
      action: Action.GAIN_HELIUM,
      count: 2,
      revealAction: true
    },
    actions: [
      {
        action: Action.ADVANCE_COMPANY,
        count: 2,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN_TWO_EACH
      },
      {
        action: Action.EXPAND_COMPANY,
        count: 2,
        companySelection: CompanySelection.LEAD_BIGGEST_MARGIN_TWO_EACH,
        sectorSelection: SectorSelection.MIN
      }
    ]
  }
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param grade Luna Card Grade
   * @returns cards
   */
  getAll(grade : Grade) : Card[] {
    return cards.filter(item => item.grade == grade)
  }

}
