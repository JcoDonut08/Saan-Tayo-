import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { OnboardingIllustration } from '@/components/onboarding/onboarding-illustration';
import { colors } from '@/constants/colors';
import type { OnboardingSlideData } from '@/constants/onboarding';

type OnboardingSlideProps = {
  illustrationHeight: number;
  isActive: boolean;
  item: OnboardingSlideData;
  width: number;
};

export function OnboardingSlide({
  illustrationHeight,
  isActive,
  item,
  width,
}: OnboardingSlideProps) {
  const reduceMotion = useReducedMotion();
  const entrance = useSharedValue(isActive || reduceMotion ? 1 : 0.86);
  const illustrationSize = Math.min(illustrationHeight, width - 24);

  useEffect(() => {
    entrance.value = reduceMotion
      ? 1
      : withTiming(isActive ? 1 : 0.86, {
          duration: 240,
          easing: Easing.out(Easing.cubic),
        });
  }, [entrance, isActive, reduceMotion]);

  const illustrationStyle = useAnimatedStyle(() => ({
    opacity: interpolate(entrance.value, [0.86, 1], [0.76, 1], 'clamp'),
    transform: [
      {
        translateY: interpolate(
          entrance.value,
          [0.86, 1],
          [14, 0],
          'clamp',
        ),
      },
      {
        scale: interpolate(
          entrance.value,
          [0.86, 1],
          [0.985, 1],
          'clamp',
        ),
      },
    ],
  }));

  const copyStyle = useAnimatedStyle(() => ({
    opacity: interpolate(entrance.value, [0.86, 1], [0.82, 1], 'clamp'),
  }));

  return (
    <View
      accessibilityLabel={`${item.headline} ${item.description}`}
      style={[styles.page, { width }]}
    >
      <Animated.View style={[styles.illustrationWrap, illustrationStyle]}>
        <OnboardingIllustration
          accessibilityLabel={item.accessibilityLabel}
          kind={item.illustration}
          size={illustrationSize}
        />
      </Animated.View>

      <Animated.View style={[styles.copy, copyStyle]}>
        <Text accessibilityRole="header" style={styles.headline}>
          {item.headline}
        </Text>
        <Text style={styles.description}>{item.description}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  copy: {
    alignItems: 'center',
    gap: 8,
    maxWidth: 350,
    paddingHorizontal: 6,
  },
  description: {
    color: colors.onboardingMuted,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 24,
    maxWidth: 332,
    textAlign: 'center',
  },
  headline: {
    color: colors.onboardingForeground,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.85,
    lineHeight: 40,
    textAlign: 'center',
  },
  illustrationWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  page: {
    alignItems: 'center',
    flexGrow: 0,
    flexShrink: 0,
    height: '100%',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    paddingHorizontal: 12,
  },
});
