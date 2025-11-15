interface BenefitDetail {
  rate?: number | null;
  amount?: number | null;
  minimum_amount?: number | null;
  benefit_limit?: number | null;
  channel?: string | null;
  minimum_spending?: number | null;
  discription?: string | null;
  name?: string | null;
  targets?: string[];
  categories?: string[];
}

/*

interface Benefits {
  discounts: BenefitDetail[];
  points: BenefitDetail[];
  cashbacks: BenefitDetail[];
  applicableCategory: string[];
  applicableTargets: string[];
  summary?: string;
}

interface Performance {
  currentAmount: number; // 현재 실적
  targetAmount: number; // 목표 실적
  isAchieved: boolean; // 달성 여부
}

interface Limit {
  usedDiscountAmount: number; // 사용된 할인 금액
  totalDiscountLimit: number; // 할인 한도
  usedPointAmount: number; // 사용된 포인트 금액
  totalPointLimit: number; // 포인트 한도
  usedCashbackAmount: number; // 사용된 캐시백 금액
  totalCashbackLimit: number; // 캐시백 한도
}
  */

interface Benefit {
  discounts?: BenefitDetail[];
  points?: BenefitDetail[];
  cashbacks?: BenefitDetail[];
  categories?: string[];
  targets?: string[];
  summary?: string | null;
}

export interface Card {
  cardId: number;
  cardUrl: string | null;
  cardCompany?: string;
  cardName: string | null;
  imgUrl?: string | null;
  cardType: string | null;
  benefits?: Benefit[];
  benefit?: Benefit;
}

/*

export interface MatchingCard {
  cardName: string;
  imgUrl: string;
  type: string;
  benefits: Benefits;
  performance: Performance;
  limits: Limit;
}
  */
