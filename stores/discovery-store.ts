import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

import {
  emptyDiscoveryPreferences,
  type BudgetCeiling,
  type CategoryId,
  type DiscoveryPreferences,
  type MoodId,
} from '@/types/preferences';

type PersistedDiscoveryState = {
  preferences: DiscoveryPreferences;
  savedPlaceIds: string[];
};

type DiscoveryState = PersistedDiscoveryState & {
  hasHydrated: boolean;
  hydrate: () => Promise<void>;
  resetPreferences: () => void;
  setBudget: (budget: BudgetCeiling) => void;
  toggleCategory: (category: CategoryId) => void;
  toggleMood: (mood: MoodId) => void;
  toggleSavedPlace: (placeId: string) => void;
};

const DISCOVERY_STORAGE_KEY = 'saan-tayo-discovery-state-v1';
const MAX_MOODS = 3;
const MAX_CATEGORIES = 3;

const initialPersistedState: PersistedDiscoveryState = {
  preferences: emptyDiscoveryPreferences,
  savedPlaceIds: [],
};

const serverStorage = {
  getItem: async () => null,
  setItem: async () => undefined,
};

const getDiscoveryStorage = () =>
  process.env.EXPO_OS === 'web' && typeof window === 'undefined'
    ? serverStorage
    : AsyncStorage;

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const isPersistedDiscoveryState = (
  value: unknown,
): value is PersistedDiscoveryState => {
  if (!value || typeof value !== 'object') return false;

  const state = value as Partial<PersistedDiscoveryState>;
  const preferences = state.preferences;
  if (!preferences || typeof preferences !== 'object') return false;

  const validBudgets: BudgetCeiling[] = [
    'free',
    'up-to-300',
    'up-to-600',
    'any',
  ];

  return (
    validBudgets.includes(preferences.budget) &&
    isStringArray(preferences.categories) &&
    isStringArray(preferences.moods) &&
    isStringArray(state.savedPlaceIds)
  );
};

const persistDiscoveryState = (state: PersistedDiscoveryState) => {
  void getDiscoveryStorage()
    .setItem(DISCOVERY_STORAGE_KEY, JSON.stringify(state))
    .catch(() => undefined);
};

export const useDiscoveryStore = create<DiscoveryState>((set, get) => {
  const updatePersistedState = (
    update: (state: PersistedDiscoveryState) => PersistedDiscoveryState,
  ) => {
    const currentState: PersistedDiscoveryState = {
      preferences: get().preferences,
      savedPlaceIds: get().savedPlaceIds,
    };
    const nextState = update(currentState);
    set(nextState);
    persistDiscoveryState(nextState);
  };

  return {
    ...initialPersistedState,
    hasHydrated: false,
    hydrate: async () => {
      if (get().hasHydrated) return;

      try {
        const storedValue = await getDiscoveryStorage().getItem(
          DISCOVERY_STORAGE_KEY,
        );
        const parsedValue: unknown = storedValue
          ? JSON.parse(storedValue)
          : null;

        if (isPersistedDiscoveryState(parsedValue)) set(parsedValue);
      } catch {
        // Local discovery data should never block the app from opening.
      } finally {
        set({ hasHydrated: true });
      }
    },
    resetPreferences: () =>
      updatePersistedState((state) => ({
        ...state,
        preferences: emptyDiscoveryPreferences,
      })),
    setBudget: (budget) =>
      updatePersistedState((state) => ({
        ...state,
        preferences: { ...state.preferences, budget },
      })),
    toggleCategory: (category) =>
      updatePersistedState((state) => {
        const isSelected = state.preferences.categories.includes(category);
        const categories = isSelected
          ? state.preferences.categories.filter((item) => item !== category)
          : state.preferences.categories.length < MAX_CATEGORIES
            ? [...state.preferences.categories, category]
            : state.preferences.categories;

        return {
          ...state,
          preferences: { ...state.preferences, categories },
        };
      }),
    toggleMood: (mood) =>
      updatePersistedState((state) => {
        const isSelected = state.preferences.moods.includes(mood);
        const moods = isSelected
          ? state.preferences.moods.filter((item) => item !== mood)
          : state.preferences.moods.length < MAX_MOODS
            ? [...state.preferences.moods, mood]
            : state.preferences.moods;

        return {
          ...state,
          preferences: { ...state.preferences, moods },
        };
      }),
    toggleSavedPlace: (placeId) =>
      updatePersistedState((state) => ({
        ...state,
        savedPlaceIds: state.savedPlaceIds.includes(placeId)
          ? state.savedPlaceIds.filter((id) => id !== placeId)
          : [...state.savedPlaceIds, placeId],
      })),
  };
});
