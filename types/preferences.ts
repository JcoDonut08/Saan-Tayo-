export type MoodId =
  | 'chill'
  | 'food-trip'
  | 'study'
  | 'culture'
  | 'active';

export type CategoryId =
  | 'cafe'
  | 'park'
  | 'food'
  | 'mall'
  | 'museum'
  | 'activity';

export type BudgetCeiling = 'free' | 'up-to-300' | 'up-to-600' | 'any';

export type DiscoveryPreferences = {
  budget: BudgetCeiling;
  categories: CategoryId[];
  moods: MoodId[];
};

export const emptyDiscoveryPreferences: DiscoveryPreferences = {
  budget: 'any',
  categories: [],
  moods: [],
};
