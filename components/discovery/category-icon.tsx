import {
  Coffee,
  Landmark,
  ShoppingBag,
  Ticket,
  Trees,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react-native';

import type { CategoryId } from '@/types/preferences';

const iconByCategory: Record<CategoryId, LucideIcon> = {
  activity: Ticket,
  cafe: Coffee,
  food: UtensilsCrossed,
  mall: ShoppingBag,
  museum: Landmark,
  park: Trees,
};

type CategoryIconProps = {
  category: CategoryId;
  color: string;
  size?: number;
  strokeWidth?: number;
};

export function CategoryIcon({
  category,
  color,
  size = 24,
  strokeWidth = 2,
}: CategoryIconProps) {
  const Icon = iconByCategory[category];

  return <Icon color={color} size={size} strokeWidth={strokeWidth} />;
}
