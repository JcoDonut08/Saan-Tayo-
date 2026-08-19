/*
THESIS: Authentication should feel like the next chapter of the barkada story, not a generic white form dropped after onboarding.
OWN-WORLD: Night Black carries the compact Saan Tayo? mark; a warm-white rounded sheet carries quiet fields and one Location Yellow action.
STORY: Reconnect with the brand, understand the account task, complete it without distraction, and move toward discovery.
FIRST VIEWPORT: A restrained dark brand stage occupies the top; the warm-white form sheet rises from the bottom and owns the primary action.
FORM: User-pinned rising login sheet, extended through the established Saan Tayo? night-and-yellow world.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandBackdrop } from '@/components/brand/brand-backdrop';
import {
  SAAN_TAYO_LOGO,
  SAAN_TAYO_LOGO_ASPECT_RATIO,
} from '@/constants/branding';
import { colors } from '@/constants/colors';

const AUTH_BRAND_STAGE_HEIGHT = 244;

type AuthShellProps = {
  children: ReactNode;
  footer?: ReactNode;
  subtitle: string;
  title: string;
};

export function AuthShell({
  children,
  footer,
  subtitle,
  title,
}: AuthShellProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const reduceMotion = useReducedMotion();
  const { entrance } = useLocalSearchParams<{ entrance?: string }>();
  const scrollRef = useRef<ScrollView>(null);
  const shouldAnimateEntrance = entrance === 'brand' && !reduceMotion;
  const entranceProgress = useSharedValue(shouldAnimateEntrance ? 0 : 1);
  const sheetDragY = useSharedValue(0);
  const dragRange = Math.max(height * 0.5, 320);

  const dismissToSplash = useCallback(() => {
    router.replace('/');
  }, [router]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ animated: false, y: 0 });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    cancelAnimation(entranceProgress);
    entranceProgress.value = shouldAnimateEntrance ? 0 : 1;

    if (shouldAnimateEntrance) {
      entranceProgress.value = withTiming(1, {
        duration: 680,
        easing: Easing.bezier(0.16, 1, 0.3, 1),
      });
    }

    return () => cancelAnimation(entranceProgress);
  }, [entranceProgress, shouldAnimateEntrance]);

  const sheetDragGesture = Gesture.Pan()
    .activeOffsetY(8)
    .failOffsetX([-24, 24])
    .onBegin(() => {
      cancelAnimation(sheetDragY);
    })
    .onUpdate((event) => {
      sheetDragY.value = Math.max(0, event.translationY);
    })
    .onEnd((event) => {
      const dismissThreshold = Math.min(
        Math.max(height * 0.16, 110),
        160,
      );
      const shouldDismiss =
        sheetDragY.value >= dismissThreshold || event.velocityY > 900;

      if (shouldDismiss) {
        if (reduceMotion) {
          runOnJS(dismissToSplash)();
          return;
        }

        sheetDragY.value = withTiming(
          Math.max(height + 80, 720),
          {
            duration: 260,
            easing: Easing.bezier(0.4, 0, 1, 1),
          },
          (finished) => {
            if (finished) runOnJS(dismissToSplash)();
          },
        );
        return;
      }

      sheetDragY.value = withSpring(0, {
        damping: 24,
        mass: 0.8,
        overshootClamping: true,
        stiffness: 260,
      });
    });

  const brandMarkEntranceStyle = useAnimatedStyle(() => {
    const dragProgress = interpolate(
      sheetDragY.value,
      [0, dragRange],
      [0, 1],
      'clamp',
    );
    const entranceScale = interpolate(
      entranceProgress.value,
      [0, 1],
      [1.55, 1],
    );

    return {
      transform: [
        {
          translateY:
            interpolate(entranceProgress.value, [0, 1], [84, 0]) +
            interpolate(dragProgress, [0, 1], [0, 130]),
        },
        {
          scale:
            entranceScale *
            interpolate(dragProgress, [0, 1], [1, 2.15]),
        },
      ],
    };
  });

  const sheetEntranceStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      entranceProgress.value,
      [0, 0.24, 1],
      [0.96, 1, 1],
    ),
    transform: [
      {
        translateY: interpolate(
          entranceProgress.value,
          [0, 1],
          [190, 0],
        ) + sheetDragY.value,
      },
    ],
  }));

  return (
    <View style={styles.screen}>
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />

      <BrandBackdrop />

      <ScrollView
        alwaysBounceVertical={false}
        automaticallyAdjustKeyboardInsets
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={[
          styles.scrollContent,
          { minHeight: Math.max(height, 640) },
        ]}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.brandStage,
            { paddingTop: Math.max(insets.top + 32, 68) },
          ]}
        >
          <Animated.View style={brandMarkEntranceStyle}>
            <Image
              accessibilityLabel="Saan Tayo?"
              contentFit="contain"
              source={SAAN_TAYO_LOGO}
              style={styles.logo}
              transition={0}
            />
          </Animated.View>
        </View>

        <Animated.View
          style={[
            styles.sheet,
            {
              minHeight: Math.max(
                height - AUTH_BRAND_STAGE_HEIGHT,
                398,
              ),
              paddingBottom: Math.max(insets.bottom + 20, 28),
            },
            sheetEntranceStyle,
          ]}
        >
          <View style={styles.sheetHeader}>
            <GestureDetector gesture={sheetDragGesture}>
              <View
                accessible={false}
                importantForAccessibility="no-hide-descendants"
                style={styles.grabberTouchArea}
              >
                <View style={styles.grabber} />
              </View>
            </GestureDetector>

            <View style={styles.headingGroup}>
              <Text accessibilityRole="header" style={styles.title}>
                {title}
              </Text>
              <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
          </View>

          <View style={styles.formContent}>{children}</View>
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  brandStage: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'transparent',
    flexShrink: 0,
    height: AUTH_BRAND_STAGE_HEIGHT,
    justifyContent: 'center',
    paddingBottom: 24,
    paddingHorizontal: 32,
  },
  footer: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  formContent: {
    alignSelf: 'stretch',
    gap: 16,
  },
  grabber: {
    alignSelf: 'center',
    backgroundColor: colors.authGrabber,
    borderRadius: 999,
    height: 5,
    width: 42,
  },
  grabberTouchArea: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
  },
  headingGroup: {
    alignSelf: 'stretch',
    gap: 6,
  },
  logo: {
    aspectRatio: SAAN_TAYO_LOGO_ASPECT_RATIO,
    height: 102,
  },
  screen: {
    backgroundColor: colors.splashBackground,
    flex: 1,
    overflow: 'hidden',
  },
  scrollContent: {
    alignItems: 'stretch',
    flexGrow: 1,
  },
  sheet: {
    alignSelf: 'stretch',
    backgroundColor: colors.authSurface,
    borderCurve: 'continuous',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    gap: 20,
    paddingHorizontal: 22,
    paddingTop: 0,
  },
  sheetHeader: {
    alignSelf: 'stretch',
    gap: 4,
  },
  subtitle: {
    color: colors.authMuted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
  },
  title: {
    color: colors.authText,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.6,
    lineHeight: 34,
  },
});
