import { Bookmark } from 'lucide-react-native';
import { StyleSheet, Text } from 'react-native';

import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { colors } from '@/constants/colors';
import { useDiscoveryStore } from '@/stores/discovery-store';

type SavePlaceButtonProps = {
  placeId: string;
  variant?: 'icon' | 'wide';
};

export function SavePlaceButton({
  placeId,
  variant = 'icon',
}: SavePlaceButtonProps) {
  const isSaved = useDiscoveryStore((state) =>
    state.savedPlaceIds.includes(placeId),
  );
  const toggleSavedPlace = useDiscoveryStore(
    (state) => state.toggleSavedPlace,
  );

  return (
    <SmoothPressable
      accessibilityHint={
        isSaved ? 'Removes this place from Saved' : 'Adds this place to Saved'
      }
      accessibilityLabel={isSaved ? 'Remove from Saved' : 'Save place'}
      accessibilityRole="button"
      accessibilityState={{ selected: isSaved }}
      android_ripple={{ color: colors.contentYellowWashStrong }}
      containerStyle={
        variant === 'icon' ? styles.iconContainer : styles.wideContainer
      }
      hitSlop={variant === 'icon' ? 8 : undefined}
      onPress={() => toggleSavedPlace(placeId)}
      style={({ pressed }) => [
        variant === 'icon' ? styles.iconButton : styles.wideButton,
        isSaved && styles.savedButton,
        pressed && styles.pressed,
      ]}
    >
      <Bookmark
        color={isSaved ? colors.splashOnAccent : colors.contentForeground}
        fill={isSaved ? colors.splashOnAccent : 'transparent'}
        size={variant === 'icon' ? 20 : 22}
        strokeWidth={2.2}
      />
      {variant === 'wide' ? (
        <Text
          style={[
            styles.wideLabel,
            isSaved && styles.wideLabelSaved,
          ]}
        >
          {isSaved ? 'Saved' : 'Save'}
        </Text>
      ) : null}
    </SmoothPressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(12, 16, 15, 0.82)',
    borderColor: colors.contentBorderStrong,
    borderRadius: 999,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 44,
  },
  iconContainer: {
    alignSelf: 'auto',
    height: 44,
    width: 44,
  },
  pressed: {
    opacity: 0.7,
  },
  savedButton: {
    backgroundColor: colors.splashAccent,
    borderColor: colors.splashAccent,
  },
  wideButton: {
    alignItems: 'center',
    backgroundColor: colors.contentSurfaceStrong,
    borderColor: colors.contentBorderStrong,
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    height: 56,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 16,
    width: '100%',
  },
  wideContainer: {
    alignSelf: 'center',
    width: 108,
  },
  wideLabel: {
    color: colors.contentForeground,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  wideLabelSaved: {
    color: colors.splashOnAccent,
  },
});
