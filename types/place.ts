import type { CategoryId, MoodId } from '@/types/preferences';

export type PlaceCost =
  | {
      kind: 'free';
      label: string;
      maxPerPerson: 0;
    }
  | {
      kind: 'fixed';
      label: string;
      maxPerPerson: number;
    }
  | {
      kind: 'varies';
      label: string;
    };

export type Place = {
  address: string;
  categories: CategoryId[];
  city: string;
  cost: PlaceCost;
  id: string;
  lastVerifiedAt: string;
  moods: MoodId[];
  name: string;
  officialUrl: string;
  primaryCategory: CategoryId;
  sourceLabel: string;
  summary: string;
};

export type BudgetCompatibility = 'confirmed' | 'over' | 'variable';

export type MatchResult = {
  budgetCompatibility: BudgetCompatibility;
  isExact: boolean;
  place: Place;
  reasons: string[];
  score: number;
};
