import { MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { SavePlaceButton } from '@/components/discovery/save-place-button';
import { VenueArtwork } from '@/components/discovery/venue-artwork';
import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { categoryLabelById } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { moodLabelById } from '@/constants/moods';
import type { Place } from '@/types/place';

type PlaceCardProps = {
  place: Place;
  reasons?: string[];
};

export function PlaceCard({ place, reasons }: PlaceCardProps) {
  const router = useRouter();
  const displayedTags = reasons ??
    place.moods.slice(0, 2).map((mood) => moodLabelById[mood]);

  return (
    <View style={styles.card}>
      <SmoothPressable
        accessibilityHint="Opens details and official source information"
        accessibilityLabel={`${place.name}, ${categoryLabelById[place.primaryCategory]} in ${place.city}. ${place.cost.label}`}
        accessibilityRole="button"
        android_ripple={{ color: 'rgba(255, 255, 255, 0.06)' }}
        onPress={() =>
          router.push({ pathname: '/place/[id]', params: { id: place.id } })
        }
        style={({ pressed }) => [
          styles.cardLink,
          pressed && styles.cardLinkPressed,
        ]}
      >
        <VenueArtwork compact place={place} />

        <View style={styles.content}>
          <View style={styles.copy}>
            <Text numberOfLines={2} selectable style={styles.name}>
              {place.name}
            </Text>
            <View style={styles.locationRow}>
              <MapPin
                color={colors.contentSubtle}
                size={14}
                strokeWidth={2}
              />
              <Text numberOfLines={1} selectable style={styles.location}>
                {place.city}
              </Text>
            </View>
            <Text numberOfLines={2} selectable style={styles.cost}>
              {place.cost.label}
            </Text>
          </View>

          <View style={styles.tags}>
            {displayedTags.slice(0, 2).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text numberOfLines={1} style={styles.tagLabel}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </SmoothPressable>

      <View style={styles.saveButton}>
        <SavePlaceButton placeId={place.id} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 164,
    overflow: 'hidden',
    position: 'relative',
  },
  cardLink: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingRight: 54,
  },
  cardLinkPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.035)',
  },
  content: {
    flex: 1,
    gap: 12,
    justifyContent: 'space-between',
    paddingBottom: 14,
    paddingLeft: 16,
    paddingTop: 16,
  },
  copy: {
    gap: 5,
  },
  cost: {
    color: colors.contentMuted,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  location: {
    color: colors.contentSubtle,
    flexShrink: 1,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
    textTransform: 'uppercase',
  },
  locationRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  name: {
    color: colors.contentForeground,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  saveButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
  },
  tag: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.contentYellowWash,
    borderRadius: 999,
    justifyContent: 'center',
    maxWidth: '100%',
    minHeight: 28,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagLabel: {
    color: colors.splashAccent,
    fontSize: 11,
    fontWeight: '800',
    lineHeight: 15,
  },
  tags: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
});
