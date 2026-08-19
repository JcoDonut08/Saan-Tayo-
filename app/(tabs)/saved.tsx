import { Redirect, useRouter } from 'expo-router';
import { Bookmark, Compass } from 'lucide-react-native';
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
import { colors } from '@/constants/colors';
import { placeById } from '@/data/places';
import { useAppStore } from '@/stores/app-store';
import { useDiscoveryStore } from '@/stores/discovery-store';

export default function SavedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const accessMode = useAppStore((state) => state.accessMode);
  const hasSessionHydrated = useAppStore((state) => state.hasHydrated);
  const hasDiscoveryHydrated = useDiscoveryStore(
    (state) => state.hasHydrated,
  );
  const savedPlaceIds = useDiscoveryStore((state) => state.savedPlaceIds);
  const savedPlaces = useMemo(
    () =>
      savedPlaceIds
        .map((placeId) => placeById.get(placeId))
        .filter((place) => place !== undefined),
    [savedPlaceIds],
  );

  if (!hasSessionHydrated || !hasDiscoveryHydrated) {
    return <ScreenLoading />;
  }

  if (accessMode === 'none') return <Redirect href="/" />;

  return (
    <FlatList
      alwaysBounceVertical={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.content,
        {
          flexGrow: savedPlaces.length === 0 ? 1 : undefined,
          paddingBottom: Math.max(insets.bottom + 104, 120),
          paddingTop: Math.max(insets.top + 28, 44),
        },
      ]}
      data={savedPlaces}
      keyExtractor={(place) => place.id}
      ListEmptyComponent={
        <View style={styles.empty}>
          <View style={styles.emptyIcon}>
            <Bookmark
              color={colors.splashAccent}
              size={32}
              strokeWidth={2}
            />
          </View>
          <View style={styles.emptyCopy}>
            <Text accessibilityRole="header" selectable style={styles.emptyTitle}>
              Keep the maybes here.
            </Text>
            <Text selectable style={styles.emptyBody}>
              Save places while browsing or comparing matches. They will stay on
              this device for your next decision.
            </Text>
          </View>
          <SmoothPressable
            accessibilityLabel="Explore places"
            accessibilityRole="button"
            onPress={() => router.push('/discover')}
            style={({ pressed }) => [
              styles.exploreAction,
              pressed && styles.exploreActionPressed,
            ]}
          >
            <Compass
              color={colors.splashOnAccent}
              size={19}
              strokeWidth={2.3}
            />
            <Text style={styles.exploreActionLabel}>Explore places</Text>
          </SmoothPressable>
        </View>
      }
      ListHeaderComponent={
        savedPlaces.length > 0 ? (
          <View style={styles.header}>
            <StatusBar
              backgroundColor={colors.contentBackground}
              barStyle="light-content"
            />
            <Text accessibilityRole="header" selectable style={styles.title}>
              Saved places
            </Text>
            <Text selectable style={styles.subtitle}>
              {savedPlaces.length} {savedPlaces.length === 1 ? 'place' : 'places'}
              {' '}kept on this device.
            </Text>
          </View>
        ) : (
          <StatusBar
            backgroundColor={colors.contentBackground}
            barStyle="light-content"
          />
        )
      }
      renderItem={({ item }) => <PlaceCard place={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.screen}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    gap: 12,
    maxWidth: 640,
    paddingHorizontal: 20,
    width: '100%',
  },
  empty: {
    flex: 1,
    gap: 24,
    justifyContent: 'center',
    paddingBottom: 64,
  },
  emptyBody: {
    color: colors.contentMuted,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    maxWidth: 430,
  },
  emptyCopy: {
    gap: 9,
  },
  emptyIcon: {
    alignItems: 'center',
    backgroundColor: colors.contentYellowWash,
    borderColor: 'rgba(255, 194, 28, 0.24)',
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  emptyTitle: {
    color: colors.contentForeground,
    fontSize: 31,
    fontWeight: '900',
    letterSpacing: -0.8,
    lineHeight: 37,
  },
  exploreAction: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 52,
    overflow: 'hidden',
    paddingHorizontal: 19,
    paddingVertical: 13,
  },
  exploreActionLabel: {
    color: colors.splashOnAccent,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  exploreActionPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  header: {
    gap: 7,
    paddingBottom: 13,
  },
  screen: {
    backgroundColor: colors.contentBackground,
    flex: 1,
    width: '100%',
  },
  subtitle: {
    color: colors.contentMuted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  title: {
    color: colors.contentForeground,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.9,
    lineHeight: 38,
  },
});
