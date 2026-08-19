import { categoryLabelById } from '@/constants/categories';
import { moodLabelById } from '@/constants/moods';
import type { MatchResult, Place } from '@/types/place';
import type {
  BudgetCeiling,
  CategoryId,
  DiscoveryPreferences,
} from '@/types/preferences';

const budgetMaximums: Record<Exclude<BudgetCeiling, 'any'>, number> = {
  free: 0,
  'up-to-300': 300,
  'up-to-600': 600,
};

export const budgetLabels: Record<BudgetCeiling, string> = {
  any: 'Any budget',
  free: 'Free only',
  'up-to-300': 'Up to \u20b1300',
  'up-to-600': 'Up to \u20b1600',
};

const getBudgetCompatibility = (
  place: Place,
  budget: BudgetCeiling,
): MatchResult['budgetCompatibility'] => {
  if (budget === 'any') {
    return place.cost.kind === 'varies' ? 'variable' : 'confirmed';
  }

  if (place.cost.kind === 'varies') return 'variable';

  return place.cost.maxPerPerson <= budgetMaximums[budget]
    ? 'confirmed'
    : 'over';
};

export const matchPlaces = (
  catalog: Place[],
  preferences: DiscoveryPreferences,
): MatchResult[] =>
  catalog
    .map((place, catalogIndex) => {
      const matchedMoods = preferences.moods.filter((mood) =>
        place.moods.includes(mood),
      );
      const matchedCategories = preferences.categories.filter((category) =>
        place.categories.includes(category),
      );
      const budgetCompatibility = getBudgetCompatibility(
        place,
        preferences.budget,
      );
      const categoryRequired = preferences.categories.length > 0;
      const moodRequired = preferences.moods.length > 0;
      const hasMoodMatch = !moodRequired || matchedMoods.length > 0;
      const hasCategoryMatch =
        !categoryRequired || matchedCategories.length > 0;
      const budgetFits = budgetCompatibility !== 'over';

      const reasons = [
        ...matchedMoods.slice(0, 1).map(
          (mood) => `Matches your ${moodLabelById[mood].toLowerCase()} vibe`,
        ),
      ];

      if (
        preferences.budget !== 'any' &&
        budgetCompatibility === 'confirmed'
      ) {
        reasons.push('Fits your budget');
      } else if (budgetCompatibility === 'variable') {
        reasons.push('Spending varies by your choices');
      } else if (budgetCompatibility === 'over') {
        reasons.push('May be above your selected budget');
      }

      reasons.push(
        ...matchedCategories.slice(0, 1).map(
          (category) => `${categoryLabelById[category]} is in your picks`,
        ),
      );

      if (reasons.length === 0) reasons.push(place.cost.label);

      return {
        budgetCompatibility,
        catalogIndex,
        isExact: hasMoodMatch && hasCategoryMatch && budgetFits,
        place,
        reasons: reasons.slice(0, 2),
        score:
          matchedMoods.length * 4 +
          matchedCategories.length * 3 +
          (budgetCompatibility === 'confirmed' ? 2 : 0) -
          (budgetCompatibility === 'over' ? 4 : 0),
      };
    })
    .sort((left, right) => {
      if (left.isExact !== right.isExact) return left.isExact ? -1 : 1;
      if (left.score !== right.score) return right.score - left.score;
      return left.catalogIndex - right.catalogIndex;
    })
    .map(({ catalogIndex: _catalogIndex, ...result }) => result);

const normalizeSearchTerm = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
    .trim();

export const placeMatchesSearch = (place: Place, query: string) => {
  const normalizedQuery = normalizeSearchTerm(query);
  if (!normalizedQuery) return true;

  const searchableText = [
    place.name,
    place.city,
    place.address,
    place.summary,
    ...place.categories.map((category) => categoryLabelById[category]),
    ...place.moods.map((mood) => moodLabelById[mood]),
  ]
    .join(' ')
    .toLocaleLowerCase();

  return normalizeSearchTerm(searchableText).includes(normalizedQuery);
};

export const filterPlaces = (
  catalog: Place[],
  query: string,
  category: CategoryId | 'all',
) =>
  catalog.filter(
    (place) =>
      (category === 'all' || place.categories.includes(category)) &&
      placeMatchesSearch(place, query),
  );
