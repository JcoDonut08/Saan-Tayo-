import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type AccessMode = 'none' | 'guest' | 'authenticated';
export type IntroStatus = 'not-started' | 'pending' | 'completed';

type AppState = {
  accessMode: AccessMode;
  beginGuestIntroduction: () => void;
  beginNewAccountIntroduction: () => void;
  cancelPendingEntry: () => void;
  completeIntroduction: () => void;
  hasHydrated: boolean;
  hydrate: () => Promise<void>;
  introStatus: IntroStatus;
  resetSession: () => void;
  signInReturningUser: () => void;
};

type PersistedEntryState = Pick<AppState, 'accessMode' | 'introStatus'>;

const emptySession = {
  accessMode: 'none' as const,
  introStatus: 'not-started' as const,
};

const ENTRY_STORAGE_KEY = 'saan-tayo-entry-state-v1';

const serverStorage = {
  getItem: async () => null,
  removeItem: async () => undefined,
  setItem: async () => undefined,
};

const getEntryStorage = () =>
  process.env.EXPO_OS === 'web' && typeof window === 'undefined'
    ? serverStorage
    : AsyncStorage;

const isPersistedEntryState = (
  value: unknown,
): value is PersistedEntryState => {
  if (!value || typeof value !== 'object') return false;

  const state = value as Partial<PersistedEntryState>;
  const hasValidAccessMode =
    state.accessMode === 'none' ||
    state.accessMode === 'guest' ||
    state.accessMode === 'authenticated';
  const hasValidIntroStatus =
    state.introStatus === 'not-started' ||
    state.introStatus === 'pending' ||
    state.introStatus === 'completed';

  return hasValidAccessMode && hasValidIntroStatus;
};

const persistEntryState = (state: PersistedEntryState) => {
  void getEntryStorage()
    .setItem(ENTRY_STORAGE_KEY, JSON.stringify(state))
    .catch(() => undefined);
};

export const useAppStore = create<AppState>((set, get) => {
  const updateEntryState = (state: PersistedEntryState) => {
    set(state);
    persistEntryState(state);
  };

  return {
    ...emptySession,
    hasHydrated: false,
    beginGuestIntroduction: () =>
      updateEntryState({ accessMode: 'guest', introStatus: 'pending' }),
    beginNewAccountIntroduction: () =>
      updateEntryState({
        accessMode: 'authenticated',
        introStatus: 'pending',
      }),
    cancelPendingEntry: () => {
      if (get().introStatus === 'pending') updateEntryState(emptySession);
    },
    completeIntroduction: () => {
      const { accessMode } = get();
      if (accessMode === 'none') return;

      updateEntryState({ accessMode, introStatus: 'completed' });
    },
    hydrate: async () => {
      if (get().hasHydrated) return;

      try {
        const storedValue = await getEntryStorage().getItem(ENTRY_STORAGE_KEY);
        const parsedValue: unknown = storedValue
          ? JSON.parse(storedValue)
          : null;

        if (isPersistedEntryState(parsedValue)) set(parsedValue);
      } catch {
        // A failed local read should never block access to the entry screen.
      } finally {
        set({ hasHydrated: true });
      }
    },
    resetSession: () => updateEntryState(emptySession),
    signInReturningUser: () =>
      updateEntryState({
        accessMode: 'authenticated',
        introStatus: 'completed',
      }),
  };
});
