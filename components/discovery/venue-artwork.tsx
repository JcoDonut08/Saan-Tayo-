import { StyleSheet, Text, View } from 'react-native';

import { CategoryIcon } from '@/components/discovery/category-icon';
import { categoryLabelById } from '@/constants/categories';
import { colors } from '@/constants/colors';
import type { Place } from '@/types/place';

type VenueArtworkProps = {
  compact?: boolean;
  place: Place;
};

const getCityCode = (city: string) =>
  city
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toLocaleUpperCase();

export function VenueArtwork({ compact = false, place }: VenueArtworkProps) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[styles.artwork, compact ? styles.compact : styles.full]}
    >
      <View style={styles.orbitLarge} />
      <View style={styles.orbitSmall} />
      <View style={styles.axisHorizontal} />
      <View style={styles.axisVertical} />

      <View style={styles.iconWell}>
        <CategoryIcon
          category={place.primaryCategory}
          color={colors.splashAccent}
          size={compact ? 30 : 46}
          strokeWidth={1.8}
        />
      </View>

      <Text style={[styles.cityCode, compact && styles.cityCodeCompact]}>
        {getCityCode(place.city)}
      </Text>
      <Text style={styles.categoryLabel}>
        {categoryLabelById[place.primaryCategory]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: {
    backgroundColor: colors.contentSurfaceStrong,
    overflow: 'hidden',
    position: 'relative',
  },
  axisHorizontal: {
    backgroundColor: 'rgba(255, 194, 28, 0.14)',
    height: 1,
    left: 12,
    position: 'absolute',
    right: 12,
    top: '50%',
  },
  axisVertical: {
    backgroundColor: 'rgba(255, 194, 28, 0.14)',
    bottom: 12,
    position: 'absolute',
    right: '32%',
    top: 12,
    width: 1,
  },
  categoryLabel: {
    bottom: 10,
    color: colors.contentMuted,
    fontSize: 10,
    fontWeight: '800',
    left: 12,
    letterSpacing: 1,
    lineHeight: 14,
    position: 'absolute',
    textTransform: 'uppercase',
  },
  cityCode: {
    color: 'rgba(247, 246, 241, 0.1)',
    fontSize: 72,
    fontWeight: '900',
    letterSpacing: -3,
    lineHeight: 80,
    position: 'absolute',
    right: -4,
    top: 4,
  },
  cityCodeCompact: {
    fontSize: 44,
    lineHeight: 52,
    right: -2,
    top: 0,
  },
  compact: {
    alignSelf: 'stretch',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    width: 112,
  },
  full: {
    borderRadius: 16,
    height: 220,
    width: '100%',
  },
  iconWell: {
    alignItems: 'center',
    backgroundColor: colors.contentYellowWash,
    borderColor: 'rgba(255, 194, 28, 0.28)',
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: [{ translateX: -32 }, { translateY: -32 }],
    width: 64,
  },
  orbitLarge: {
    borderColor: 'rgba(255, 194, 28, 0.2)',
    borderRadius: 999,
    borderWidth: 1,
    height: 154,
    left: -42,
    position: 'absolute',
    top: -52,
    width: 154,
  },
  orbitSmall: {
    borderColor: 'rgba(247, 246, 241, 0.09)',
    borderRadius: 999,
    borderWidth: 1,
    bottom: -38,
    height: 112,
    position: 'absolute',
    right: -24,
    width: 112,
  },
});
