import { Redirect, useRouter } from 'expo-router';
import { SlidersHorizontal, Sparkles } from 'lucide-react-native';
import { useMemo } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PlaceCard } from '@/components/discovery/place-card';
import { ScreenLoading } from '@/components/discovery/screen-loading';
import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { categoryLabelById } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { moodLabelById } from '@/constants/moods';
import { places } from '@/data/places';
import { useAppStore } from '@/stores/app-store';
import { useDiscoveryStore } from '@/stores/discovery-store';
import { budgetLabels, matchPlaces } from '@/utils/matching';

export default function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const accessMode = useAppStore((state) => state.accessMode);
  const hasSessionHydrated = useAppStore((state) => state.hasHydrated);
  const hasDiscoveryHydrated = useDiscoveryStore(
    (state) => state.hasHydrated,
  );
  const preferences = useDiscoveryStore((state) => state.preferences);
  const results = useMemo(
    () => matchPlaces(places, preferences),
    [preferences],
  );
  const exactMatches = results.filter((result) => result.isExact);
  const displayedResults = exactMatches.length > 0 ? exactMatches : results;

  if (!hasSessionHydrated || !hasDiscoveryHydrated) {
    return <ScreenLoading />;
  }

  if (accessMode === 'none') return <Redirect href="/" />;
  if (preferences.moods.length === 0) {
    return <Redirect href="/preferences" />;
  }

  const summaryLabels = [
    ...preferences.moods.map((mood) => moodLabelById[mood]),
    budgetLabels[preferences.budget],
    ...preferences.categories.map(
      (category) => categoryLabelById[category],
    ),
  ];

  return (
    <FlatList
      alwaysBounceVertical={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom + 36, 52) },
      ]}
      data={displayedResults}
      keyExtractor={(result) => result.place.id}
      ListHeaderComponent={
        <View style={styles.header}>
          <StatusBar
            backgroundColor={colors.contentBackground}
            barStyle="light-content"
          />

          <View style={styles.titleBlock}>
            <View style={styles.sparkleWell}>
              <Sparkles
                color={colors.splashAccent}
                size={23}
                strokeWidth={2.2}
              />
            </View>
            <View style={styles.titleCopy}>
              <Text accessibilityRole="header" selectable style={styles.title}>
                {exactMatches.length > 0
                  ? `${exactMatches.length} ${exactMatches.length === 1 ? 'place fits' : 'places fit'}`
                  : 'No exact fit yet'}
              </Text>
              <Text selectable style={styles.subtitle}>
                {exactMatches.length > 0
                  ? 'Ranked by the choices you made, with the reasons kept visible.'
                  : 'These are the closest options. Adjust a category or budget to widen the match.'}
              </Text>
            </View>
          </View>

          <View accessibilityLabel="Selected preferences" style={styles.chips}>
            {summaryLabels.map((label) => (
              <View key={label} style={styles.chip}>
                <Text style={styles.chipLabel}>{label}</Text>
              </View>
            ))}
          </View>

          <SmoothPressable
            accessibilityHint="Returns to Smart Match preferences"
            accessibilityLabel="Edit preferences"
            accessibilityRole="button"
            onPress={() => router.replace('/preferences')}
            style={({ pressed }) => [
              styles.editButton,
              pressed && styles.editButtonPressed,
            ]}
          >
            <SlidersHorizontal
              color={colors.contentForeground}
              size={19}
              strokeWidth={2.2}
            />
            <Text style={styles.editButtonLabel}>Edit preferences</Text>
          </SmoothPressable>

          <Text accessibilityRole="header" style={styles.sectionTitle}>
            {exactMatches.length > 0 ? 'Your smart matches' : 'Closest options'}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <PlaceCard place={item.place} reasons={item.reasons} />
      )}
      showsVerticalScrollIndicator={false}
      style={styles.screen}
    />
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.contentYellowWash,
    borderColor: 'rgba(255, 194, 28, 0.2)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  chipLabel: {
    color: colors.splashAccent,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  content: {
    alignSelf: 'center',
    gap: 12,
    maxWidth: 640,
    paddingHorizontal: 20,
    paddingTop: 24,
    width: '100%',
  },
  editButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    overflow: 'hidden',
    paddingHorizontal: 17,
    paddingVertical: 11,
  },
  editButtonLabel: {
    color: colors.contentForeground,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  editButtonPressed: {
    backgroundColor: colors.contentSurfaceStrong,
  },
  header: {
    gap: 18,
    paddingBottom: 6,
  },
  screen: {
    backgroundColor: colors.contentBackground,
    flex: 1,
    width: '100%',
  },
  sectionTitle: {
    color: colors.contentForeground,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 26,
    paddingTop: 8,
  },
  sparkleWell: {
    alignItems: 'center',
    backgroundColor: colors.contentYellowWash,
    borderColor: 'rgba(255, 194, 28, 0.24)',
    borderRadius: 16,
    borderWidth: 1,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  subtitle: {
    color: colors.contentMuted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  title: {
    color: colors.contentForeground,
    fontSize: 29,
    fontWeight: '900',
    letterSpacing: -0.75,
    lineHeight: 35,
  },
  titleBlock: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 14,
  },
  titleCopy: {
    flex: 1,
    gap: 6,
  },
});
