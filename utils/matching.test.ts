import { describe, expect, it } from 'vitest';

import { places } from '@/data/places';
import type { DiscoveryPreferences } from '@/types/preferences';
import { filterPlaces, matchPlaces } from '@/utils/matching';

const preferences = (
  overrides: Partial<DiscoveryPreferences>,
): DiscoveryPreferences => ({
  budget: 'any',
  categories: [],
  moods: ['chill'],
  ...overrides,
});

describe('filterPlaces', () => {
  it('matches names, cities, categories, and editorial mood tags', () => {
    expect(filterPlaces(places, 'yardstick', 'all').map((place) => place.id)).toEqual([
      'yardstick-legazpi',
    ]);
    expect(filterPlaces(places, 'cafe', 'all').map((place) => place.id)).toEqual([
      'yardstick-legazpi',
      'commune-cafe-bar',
    ]);
    expect(filterPlaces(places, 'study', 'all').map((place) => place.id)).toEqual([
      'yardstick-legazpi',
    ]);
  });

  it('combines search and category filters', () => {
    expect(filterPlaces(places, 'Makati', 'park').map((place) => place.id)).toEqual([
      'ayala-triangle-gardens',
    ]);
  });
});

describe('matchPlaces', () => {
  it('puts exact mood, category, and known budget fits first', () => {
    const results = matchPlaces(
      places,
      preferences({
        budget: 'free',
        categories: ['park'],
        moods: ['chill'],
      }),
    );

    expect(results.slice(0, 2).map((result) => result.place.id)).toEqual([
      'ayala-triangle-gardens',
      'quezon-memorial-circle',
    ]);
    expect(results[0].isExact).toBe(true);
    expect(results[0].reasons).toContain('Fits your budget');
  });

  it('never reports a variable-price venue as a confirmed budget fit', () => {
    const result = matchPlaces(
      places,
      preferences({ budget: 'up-to-300', moods: ['study'] }),
    ).find((item) => item.place.id === 'yardstick-legazpi');

    expect(result?.budgetCompatibility).toBe('variable');
    expect(result?.reasons).toContain('Spending varies by your choices');
  });

  it('returns stable near matches when no venue satisfies every choice', () => {
    const results = matchPlaces(
      places,
      preferences({
        budget: 'free',
        categories: ['cafe'],
        moods: ['active'],
      }),
    );

    expect(results.some((result) => result.isExact)).toBe(false);
    expect(results).toHaveLength(places.length);
  });
});
