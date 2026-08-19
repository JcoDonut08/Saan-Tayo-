import type { CategoryId } from '@/types/preferences';

export type CategoryOption = {
  id: CategoryId;
  label: string;
  pluralLabel: string;
};

export const categoryOptions: CategoryOption[] = [
  { id: 'cafe', label: 'Caf\u00e9', pluralLabel: 'Caf\u00e9s' },
  { id: 'park', label: 'Park', pluralLabel: 'Parks' },
  { id: 'food', label: 'Food', pluralLabel: 'Food' },
  { id: 'mall', label: 'Mall', pluralLabel: 'Malls' },
  { id: 'museum', label: 'Museum', pluralLabel: 'Museums' },
  { id: 'activity', label: 'Activity', pluralLabel: 'Activities' },
];

export const categoryLabelById = Object.fromEntries(
  categoryOptions.map((category) => [category.id, category.label]),
) as Record<CategoryId, string>;
