/*
THESIS: Let people explore immediately, then make indecision easy to escape; refuse a preference form as the price of entry.
OWN-WORLD: Flat near-black destination slips, warm-white information, and one location-yellow decision action with crisp map geometry.
STORY: Search or filter real Metro Manila places, save a possibility, or ask Smart Match to narrow the choice.
FIRST VIEWPORT: Compact supplied logo and Match me action, then search, category rail, and the first destination slip without a wallpaper or hero card.
FORM: User-pinned browse-first surface; approved plan Browse-First Discover with Smart Matching.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/
import { Image } from 'expo-image';
import { Redirect, useRouter } from 'expo-router';
import { Search, Sparkles, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MatchBanner } from '@/components/discovery/match-banner';
import { PlaceCard } from '@/components/discovery/place-card';
import { ScreenLoading } from '@/components/discovery/screen-loading';
import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { SAAN_TAYO_LOGO } from '@/constants/branding';
import { categoryOptions } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { places } from '@/data/places';
import { useAppStore } from '@/stores/app-store';
import { useDiscoveryStore } from '@/stores/discovery-store';
import type { Place } from '@/types/place';
import type { CategoryId } from '@/types/preferences';
import { filterPlaces } from '@/utils/matching';

type DiscoverItem =
  | { id: string; place: Place; type: 'place' }
  | { id: 'smart-match'; type: 'match' };

export default function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const accessMode = useAppStore((state) => state.accessMode);
  const hasSessionHydrated = useAppStore((state) => state.hasHydrated);
  const hasDiscoveryHydrated = useDiscoveryStore(
    (state) => state.hasHydrated,
  );
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryId | 'all'
  >('all');

  const filteredPlaces = useMemo(
    () => filterPlaces(places, query, selectedCategory),
    [query, selectedCategory],
  );
  const items = useMemo<DiscoverItem[]>(() => {
    const placeItems: DiscoverItem[] = filteredPlaces.map((place) => ({
      id: place.id,
      place,
      type: 'place',
    }));

    if (placeItems.length < 2) return placeItems;

    return [
      ...placeItems.slice(0, 2),
      { id: 'smart-match', type: 'match' },
      ...placeItems.slice(2),
    ];
  }, [filteredPlaces]);

  if (!hasSessionHydrated || !hasDiscoveryHydrated) {
    return <ScreenLoading />;
  }

  if (accessMode === 'none') return <Redirect href="/" />;

  return (
    <FlatList
      alwaysBounceVertical={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.listContent,
        {
          paddingBottom: Math.max(insets.bottom + 104, 120),
          paddingTop: Math.max(insets.top + 12, 28),
        },
      ]}
      data={items}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text selectable style={styles.emptyTitle}>
            No places match that search.
          </Text>
          <Text selectable style={styles.emptyBody}>
            Try another name, city, vibe, or category.
          </Text>
          <SmoothPressable
            accessibilityLabel="Clear search and filters"
            accessibilityRole="button"
            onPress={() => {
              setQuery('');
              setSelectedCategory('all');
            }}
            style={({ pressed }) => [
              styles.clearFilters,
              pressed && styles.clearFiltersPressed,
            ]}
          >
            <Text style={styles.clearFiltersLabel}>Clear filters</Text>
          </SmoothPressable>
        </View>
      }
      ListHeaderComponent={
        <View style={styles.header}>
          <StatusBar
            backgroundColor={colors.contentBackground}
            barStyle="light-content"
          />

          <View style={styles.brandRow}>
            <Image
              accessibilityLabel="Saan Tayo?"
              accessibilityRole="image"
              contentFit="contain"
              source={SAAN_TAYO_LOGO}
              style={styles.logo}
            />

            <SmoothPressable
              accessibilityHint="Opens Smart Match preferences"
              accessibilityLabel="Match me"
              accessibilityRole="button"
              android_ripple={{ color: colors.splashAccentPressed }}
              containerStyle={styles.matchButtonContainer}
              onPress={() => router.push('/preferences')}
              style={({ pressed }) => [
                styles.matchButton,
                pressed && styles.matchButtonPressed,
              ]}
            >
              <Sparkles
                color={colors.splashOnAccent}
                size={17}
                strokeWidth={2.3}
              />
              <Text style={styles.matchButtonLabel}>Match me</Text>
            </SmoothPressable>
          </View>

          <View style={styles.intro}>
            <Text accessibilityRole="header" selectable style={styles.title}>
              Explore Metro Manila
            </Text>
            <Text selectable style={styles.subtitle}>
              Browse a place now. If nothing clicks, Smart Match can narrow it
              down.
            </Text>
          </View>

          <View style={styles.searchField}>
            <Search
              color={colors.contentSubtle}
              size={20}
              strokeWidth={2.2}
            />
            <TextInput
              accessibilityHint="Searches the local place catalog as you type"
              accessibilityLabel="Search places"
              autoCapitalize="words"
              autoCorrect={false}
              clearButtonMode="never"
              onChangeText={setQuery}
              placeholder="Search places, cities, or vibes"
              placeholderTextColor={colors.contentSubtle}
              returnKeyType="search"
              selectionColor={colors.splashAccent}
              style={styles.searchInput}
              value={query}
            />
            {query ? (
              <SmoothPressable
                accessibilityLabel="Clear search"
                accessibilityRole="button"
                containerStyle={styles.clearSearchContainer}
                hitSlop={8}
                onPress={() => setQuery('')}
                style={({ pressed }) => [
                  styles.clearSearch,
                  pressed && styles.clearSearchPressed,
                ]}
              >
                <X
                  color={colors.contentMuted}
                  size={18}
                  strokeWidth={2.2}
                />
              </SmoothPressable>
            ) : null}
          </View>

          <ScrollView
            accessibilityLabel="Place categories"
            contentContainerStyle={styles.categoryRail}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
          >
            {[
              { id: 'all' as const, pluralLabel: 'All' },
              ...categoryOptions,
            ].map((category) => {
              const selected = selectedCategory === category.id;

              return (
                <SmoothPressable
                  accessibilityLabel={category.pluralLabel}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  containerStyle={styles.categoryChipContainer}
                  key={category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  style={({ pressed }) => [
                    styles.categoryChip,
                    selected && styles.categoryChipSelected,
                    pressed && styles.categoryChipPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryChipLabel,
                      selected && styles.categoryChipLabelSelected,
                    ]}
                  >
                    {category.pluralLabel}
                  </Text>
                </SmoothPressable>
              );
            })}
          </ScrollView>

          <View style={styles.listHeadingRow}>
            <Text accessibilityRole="header" selectable style={styles.listTitle}>
              Places to explore
            </Text>
            <Text selectable style={styles.resultCount}>
              {filteredPlaces.length}
            </Text>
          </View>
        </View>
      }
      renderItem={({ item }) =>
        item.type === 'match' ? (
          <MatchBanner />
        ) : (
          <PlaceCard place={item.place} />
        )
      }
      showsVerticalScrollIndicator={false}
      style={styles.screen}
    />
  );
}

const styles = StyleSheet.create({
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 74,
    width: '100%',
  },
  categoryChip: {
    alignItems: 'center',
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderRadius: 999,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 42,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  categoryChipContainer: {
    alignSelf: 'center',
  },
  categoryChipLabel: {
    color: colors.contentMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  categoryChipLabelSelected: {
    color: colors.splashOnAccent,
  },
  categoryChipPressed: {
    opacity: 0.7,
  },
  categoryChipSelected: {
    backgroundColor: colors.splashAccent,
    borderColor: colors.splashAccent,
  },
  categoryRail: {
    gap: 8,
    paddingRight: 24,
  },
  categoryScroll: {
    maxWidth: '100%',
    width: '100%',
  },
  clearFilters: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 48,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  clearFiltersLabel: {
    color: colors.splashOnAccent,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  clearFiltersPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  clearSearch: {
    alignItems: 'center',
    borderRadius: 999,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  clearSearchContainer: {
    alignSelf: 'center',
    height: 36,
    width: 36,
  },
  clearSearchPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
  emptyBody: {
    color: colors.contentMuted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  emptyState: {
    gap: 10,
    paddingVertical: 44,
  },
  emptyTitle: {
    color: colors.contentForeground,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.35,
    lineHeight: 28,
  },
  header: {
    gap: 22,
    paddingBottom: 4,
    width: '100%',
  },
  intro: {
    gap: 8,
  },
  listContent: {
    alignSelf: 'center',
    gap: 12,
    maxWidth: 640,
    paddingHorizontal: 20,
    width: '100%',
  },
  listHeadingRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  listTitle: {
    color: colors.contentForeground,
    fontSize: 21,
    fontWeight: '800',
    letterSpacing: -0.35,
    lineHeight: 27,
  },
  logo: {
    height: 72,
    width: 89,
  },
  matchButton: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 7,
    justifyContent: 'center',
    minHeight: 46,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  matchButtonContainer: {
    alignSelf: 'center',
  },
  matchButtonLabel: {
    color: colors.splashOnAccent,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  matchButtonPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  resultCount: {
    color: colors.contentSubtle,
    fontSize: 13,
    fontVariant: ['tabular-nums'],
    fontWeight: '800',
    lineHeight: 18,
  },
  screen: {
    backgroundColor: colors.contentBackground,
    flex: 1,
    width: '100%',
  },
  searchField: {
    alignItems: 'center',
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    minHeight: 56,
    paddingHorizontal: 16,
  },
  searchInput: {
    color: colors.contentForeground,
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    minHeight: 54,
    paddingVertical: 0,
  },
  subtitle: {
    color: colors.contentMuted,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
    maxWidth: 420,
  },
  title: {
    color: colors.contentForeground,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.9,
    lineHeight: 37,
  },
});
