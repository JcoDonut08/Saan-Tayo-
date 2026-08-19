import type { MoodId } from '@/types/preferences';

export type MoodOption = {
  description: string;
  id: MoodId;
  label: string;
  shortLabel: string;
};

export const moodOptions: MoodOption[] = [
  {
    description: 'Easygoing places for tambay and kwentuhan.',
    id: 'chill',
    label: 'Chill / Kwentuhan',
    shortLabel: 'Chill',
  },
  {
    description: 'Food, coffee, and something worth sharing.',
    id: 'food-trip',
    label: 'Food Trip',
    shortLabel: 'Food trip',
  },
  {
    description: 'Calmer spots where you can focus for a while.',
    id: 'study',
    label: 'Study / Focus',
    shortLabel: 'Study',
  },
  {
    description: 'Museums, stories, and something new to learn.',
    id: 'culture',
    label: 'Culture',
    shortLabel: 'Culture',
  },
  {
    description: 'Movement, play, and hands-on experiences.',
    id: 'active',
    label: 'Active',
    shortLabel: 'Active',
  },
];

export const moodLabelById = Object.fromEntries(
  moodOptions.map((mood) => [mood.id, mood.shortLabel]),
) as Record<MoodId, string>;
