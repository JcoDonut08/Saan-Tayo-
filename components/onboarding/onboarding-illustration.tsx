import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import type { OnboardingIllustrationKind } from '@/constants/onboarding';

const onboardingConfused = require('../../assets/images/onboarding-confused-v4.png');
const onboardingScenes = require('../../assets/images/onboarding-scenes-transparent-v3.png');
const onboardingDiscover = require('../../assets/images/onboarding-discover-transparent-v3.png');

const cropByKind: Record<
  Exclude<OnboardingIllustrationKind, 'confused'>,
  { left: number; scale: number; top: number }
> = {
  idea: { left: -1, scale: 2, top: 0 },
  ready: { left: 0, scale: 2, top: -1 },
  discover: { left: 0, scale: 1, top: 0 },
};

type OnboardingIllustrationProps = {
  accessibilityLabel: string;
  kind: OnboardingIllustrationKind;
  size: number;
};

export function OnboardingIllustration({
  accessibilityLabel,
  kind,
  size,
}: OnboardingIllustrationProps) {
  const crop = kind === 'confused' ? null : cropByKind[kind];

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      style={[
        styles.frame,
        {
          height: size,
          transform: kind === 'idea' ? [{ scale: 0.95 }] : undefined,
          width: size,
        },
      ]}
    >
      <Image
        accessibilityIgnoresInvertColors
        contentFit={kind === 'confused' ? 'cover' : 'fill'}
        source={
          kind === 'confused'
            ? onboardingConfused
            : kind === 'discover'
              ? onboardingDiscover
              : onboardingScenes
        }
        style={
          crop
            ? [
                styles.sprite,
                {
                  height: size * crop.scale,
                  left: size * crop.left,
                  top: size * crop.top,
                  width: size * crop.scale,
                },
              ]
            : [
                styles.sprite,
                {
                  height: size * 0.915,
                  left: 0,
                  top: size * 0.0425,
                  width: size,
                },
              ]
        }
        transition={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    overflow: 'hidden',
    position: 'relative',
  },
  sprite: {
    position: 'absolute',
  },
});
