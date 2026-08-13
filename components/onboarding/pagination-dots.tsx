import { StyleSheet, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  type SharedValue,
} from 'react-native-reanimated';

import { colors } from '@/constants/colors';

const ACTIVE_DOT_SIZE = 10;
const DOT_SIZE = 8;
const SLOT_WIDTH = 30;
const TRACK_HEIGHT = 14;

type PaginationDotsProps = {
  currentIndex: number;
  pageProgress: SharedValue<number>;
  total: number;
};

export function PaginationDots({
  currentIndex,
  pageProgress,
  total,
}: PaginationDotsProps) {
  const reduceMotion = useReducedMotion();
  const activeDotStyle = useAnimatedStyle(() => {
    const rawProgress = reduceMotion ? currentIndex : pageProgress.value;
    const progress = Math.max(0, Math.min(total - 1, rawProgress));
    const travelPhase = Math.abs(progress - Math.round(progress));

    return {
      opacity: reduceMotion
        ? 1
        : interpolate(travelPhase, [0, 0.5], [1, 0.86], 'clamp'),
      transform: [
        { translateX: progress * SLOT_WIDTH },
        {
          scale: reduceMotion
            ? 1
            : interpolate(travelPhase, [0, 0.5], [1, 0.84], 'clamp'),
        },
      ],
    };
  }, [currentIndex, reduceMotion, total]);

  return (
    <View
      accessibilityLabel={`Onboarding page ${currentIndex + 1} of ${total}`}
      accessibilityRole="adjustable"
      accessibilityValue={{
        max: total,
        min: 1,
        now: currentIndex + 1,
        text: `Page ${currentIndex + 1} of ${total}`,
      }}
      style={[styles.container, { width: total * SLOT_WIDTH }]}
    >
      {Array.from({ length: total }, (_, index) => (
        <View key={`onboarding-dot-${index}`} style={styles.slot}>
          <View style={styles.inactiveDot} />
        </View>
      ))}
      <Animated.View style={[styles.activeDot, activeDotStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: colors.splashAccent,
    borderRadius: ACTIVE_DOT_SIZE / 2,
    height: ACTIVE_DOT_SIZE,
    left: (SLOT_WIDTH - ACTIVE_DOT_SIZE) / 2,
    position: 'absolute',
    top: (TRACK_HEIGHT - ACTIVE_DOT_SIZE) / 2,
    width: ACTIVE_DOT_SIZE,
  },
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    height: TRACK_HEIGHT,
    position: 'relative',
  },
  inactiveDot: {
    backgroundColor: colors.onboardingDot,
    borderRadius: DOT_SIZE / 2,
    height: DOT_SIZE,
    opacity: 0.82,
    width: DOT_SIZE,
  },
  slot: {
    alignItems: 'center',
    height: TRACK_HEIGHT,
    justifyContent: 'center',
    width: SLOT_WIDTH,
  },
});
