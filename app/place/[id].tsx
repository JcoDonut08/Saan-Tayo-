import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { ArrowLeft, ExternalLink, MapPin, ShieldCheck } from 'lucide-react-native';
import { Alert, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SavePlaceButton } from '@/components/discovery/save-place-button';
import { ScreenLoading } from '@/components/discovery/screen-loading';
import { VenueArtwork } from '@/components/discovery/venue-artwork';
import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { categoryLabelById } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { moodLabelById } from '@/constants/moods';
import { placeById } from '@/data/places';
import { useAppStore } from '@/stores/app-store';
import { useDiscoveryStore } from '@/stores/discovery-store';

const formatVerificationDate = (date: string) =>
  new Intl.DateTimeFormat('en-PH', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));

export default function PlaceScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ id: string | string[] }>();
  const placeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const place = placeId ? placeById.get(placeId) : undefined;
  const accessMode = useAppStore((state) => state.accessMode);
  const hasSessionHydrated = useAppStore((state) => state.hasHydrated);
  const hasDiscoveryHydrated = useDiscoveryStore(
    (state) => state.hasHydrated,
  );

  if (!hasSessionHydrated || !hasDiscoveryHydrated) {
    return <ScreenLoading />;
  }

  if (accessMode === 'none') return <Redirect href="/" />;

  if (!place) {
    return (
      <View style={[styles.notFound, { paddingBottom: insets.bottom + 24 }]}>
        <Text accessibilityRole="header" selectable style={styles.notFoundTitle}>
          We couldn\u2019t find that place.
        </Text>
        <Text selectable style={styles.notFoundBody}>
          It may have been removed from this local catalog.
        </Text>
        <SmoothPressable
          accessibilityLabel="Return to Discover"
          accessibilityRole="button"
          onPress={() => router.replace('/discover')}
          style={({ pressed }) => [
            styles.notFoundAction,
            pressed && styles.primaryPressed,
          ]}
        >
          <ArrowLeft
            color={colors.splashOnAccent}
            size={19}
            strokeWidth={2.3}
          />
          <Text style={styles.notFoundActionLabel}>Back to Discover</Text>
        </SmoothPressable>
      </View>
    );
  }

  const handleOpenOfficialSource = async () => {
    try {
      const canOpen = await Linking.canOpenURL(place.officialUrl);
      if (!canOpen) throw new Error('Unsupported URL');
      await Linking.openURL(place.officialUrl);
    } catch {
      Alert.alert(
        'Couldn\u2019t open the official page',
        'Please try again when your device can open web links.',
      );
    }
  };

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom + 34, 50) },
      ]}
      showsVerticalScrollIndicator={false}
      style={styles.screen}
    >
      <StatusBar
        backgroundColor={colors.contentBackground}
        barStyle="light-content"
      />

      <VenueArtwork place={place} />

      <View style={styles.heading}>
        <View style={styles.categoryRow}>
          <Text style={styles.category}>
            {categoryLabelById[place.primaryCategory]}
          </Text>
          <Text style={styles.separator}>•</Text>
          <Text selectable style={styles.city}>
            {place.city}
          </Text>
        </View>
        <Text accessibilityRole="header" selectable style={styles.title}>
          {place.name}
        </Text>
        <View style={styles.addressRow}>
          <MapPin
            color={colors.contentSubtle}
            size={18}
            strokeWidth={2.1}
          />
          <Text selectable style={styles.address}>
            {place.address}
          </Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <SavePlaceButton placeId={place.id} variant="wide" />
        <SmoothPressable
          accessibilityHint={`Opens ${place.sourceLabel} in your browser`}
          accessibilityLabel="View official information"
          accessibilityRole="link"
          onPress={handleOpenOfficialSource}
          style={({ pressed }) => [
            styles.officialAction,
            pressed && styles.primaryPressed,
          ]}
        >
          <Text style={styles.officialActionLabel}>Official information</Text>
          <ExternalLink
            color={colors.splashOnAccent}
            size={19}
            strokeWidth={2.2}
          />
        </SmoothPressable>
      </View>

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          What to expect
        </Text>
        <Text selectable style={styles.summary}>
          {place.summary}
        </Text>
      </View>

      <View style={styles.factGroup}>
        <View style={styles.factRow}>
          <Text style={styles.factLabel}>Budget</Text>
          <Text selectable style={styles.factValue}>
            {place.cost.label}
          </Text>
        </View>
        <View style={[styles.factRow, styles.factDivider]}>
          <Text style={styles.factLabel}>Place types</Text>
          <Text selectable style={styles.factValue}>
            {place.categories
              .map((category) => categoryLabelById[category])
              .join(', ')}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Saan Tayo? fit tags
        </Text>
        <Text selectable style={styles.editorialNote}>
          These are our editorial suggestions, not claims from the venue.
        </Text>
        <View style={styles.tags}>
          {place.moods.map((mood) => (
            <View key={mood} style={styles.tag}>
              <Text style={styles.tagLabel}>{moodLabelById[mood]}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.sourceNote}>
        <ShieldCheck
          color={colors.splashAccent}
          size={21}
          strokeWidth={2.1}
        />
        <View style={styles.sourceCopy}>
          <Text selectable style={styles.sourceTitle}>
            Details checked {formatVerificationDate(place.lastVerifiedAt)}
          </Text>
          <Text selectable style={styles.sourceBody}>
            Source: {place.sourceLabel}. Hours, admission, and venue details can
            change, so check the official page before going.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  address: {
    color: colors.contentMuted,
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
  },
  addressRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
  },
  category: {
    color: colors.splashAccent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.7,
    lineHeight: 17,
    textTransform: 'uppercase',
  },
  categoryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  city: {
    color: colors.contentSubtle,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.7,
    lineHeight: 17,
    textTransform: 'uppercase',
  },
  content: {
    alignSelf: 'center',
    gap: 28,
    maxWidth: 640,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
  },
  editorialNote: {
    color: colors.contentMuted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },
  factDivider: {
    borderTopColor: colors.contentBorder,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  factGroup: {
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  factLabel: {
    color: colors.contentSubtle,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.6,
    lineHeight: 17,
    textTransform: 'uppercase',
  },
  factRow: {
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  factValue: {
    color: colors.contentForeground,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  heading: {
    gap: 9,
  },
  notFound: {
    alignItems: 'flex-start',
    backgroundColor: colors.contentBackground,
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  notFoundAction: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
    minHeight: 52,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  notFoundActionLabel: {
    color: colors.splashOnAccent,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  notFoundBody: {
    color: colors.contentMuted,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
  },
  notFoundTitle: {
    color: colors.contentForeground,
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.7,
    lineHeight: 36,
  },
  officialAction: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderRadius: 16,
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    minHeight: 56,
    overflow: 'hidden',
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  officialActionLabel: {
    color: colors.splashOnAccent,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  primaryPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  screen: {
    backgroundColor: colors.contentBackground,
    flex: 1,
    width: '100%',
  },
  section: {
    gap: 9,
  },
  sectionTitle: {
    color: colors.contentForeground,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  separator: {
    color: colors.contentBorderStrong,
    fontSize: 12,
    lineHeight: 17,
  },
  sourceBody: {
    color: colors.contentMuted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },
  sourceCopy: {
    flex: 1,
    gap: 4,
  },
  sourceNote: {
    alignItems: 'flex-start',
    backgroundColor: colors.contentYellowWash,
    borderColor: 'rgba(255, 194, 28, 0.22)',
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  sourceTitle: {
    color: colors.contentForeground,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  summary: {
    color: colors.contentMuted,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 25,
  },
  tag: {
    backgroundColor: colors.contentSurfaceStrong,
    borderColor: colors.contentBorder,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tagLabel: {
    color: colors.contentForeground,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 16,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 2,
  },
  title: {
    color: colors.contentForeground,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.85,
    lineHeight: 38,
  },
});
