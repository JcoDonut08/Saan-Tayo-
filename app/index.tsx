/*
THESIS: Turn the familiar barkada question into one bold, immediate invitation; refuse a generic app-logo-on-white launch.
OWN-WORLD: Near-black food-and-hangout doodles, warm white brush lettering, and one location-yellow accent carried by capsule actions.
STORY: Recognize Saan Tayo?, then choose to begin onboarding or continue into the existing app.
FIRST VIEWPORT: System status bar above a centered two-line mark; the actions reserve their bottom position and reveal only after the mark completes.
FORM: Exact user-pinned splash reference; seed key reference-splash-2026-08-10.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
*/
import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, {
  ClipPath,
  Defs,
  Image as SvgImage,
  Mask,
  Path,
} from 'react-native-svg';

import { colors } from '@/constants/colors';

const LOGO_ASPECT_RATIO = 873 / 704;
const LOGO_SOURCE = require('@/assets/images/saan-tayo-logo.png');
const PIN_MARK_PATH =
  'M 600 360 C 651 360 690 401 690 452 C 690 508 650 552 612 602 C 580 629 548 649 510 659 C 504 661 498 657 497 651 C 496 646 500 642 506 640 C 540 631 570 614 588 598 C 550 552 510 508 510 452 C 510 401 549 360 600 360 Z M 635 452 A 35 35 0 1 1 565 452 A 35 35 0 1 1 635 452 Z';
const ENTRANCE_START_DELAY = 200;
const BRAND_ANIMATION_DURATION = 3070;
const ACTION_REVEAL_DURATION = 240;

let hasPlayedWelcomeEntrance = false;

const AnimatedPath = Animated.createAnimatedComponent(Path);

type WritingStrokeProps = {
  d: string;
  end: number;
  length: number;
  progress: SharedValue<number>;
  start: number;
  strokeWidth: number;
};

function WritingStroke({
  d,
  end,
  length,
  progress,
  start,
  strokeWidth,
}: WritingStrokeProps) {
  const animatedProps = useAnimatedProps(() => {
    const localProgress = interpolate(
      progress.value,
      [start, end],
      [0, 1],
      'clamp',
    );

    return {
      opacity: interpolate(localProgress, [0, 0.015], [0, 1], 'clamp'),
      strokeDashoffset: length * (1 - localProgress),
    };
  });

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      d={d}
      fill="none"
      stroke="white"
      strokeDasharray={[length, length]}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  );
}

type LetterCompletionFillProps = {
  d: string;
  end: number;
  progress: SharedValue<number>;
  start: number;
};

function LetterCompletionFill({
  d,
  end,
  progress,
  start,
}: LetterCompletionFillProps) {
  const fillStart = end - (end - start) * 0.18;
  const animatedProps = useAnimatedProps(() => ({
    opacity: interpolate(progress.value, [fillStart, end], [0, 1], 'clamp'),
  }));

  return (
    <AnimatedPath
      animatedProps={animatedProps}
      d={d}
      fill="white"
    />
  );
}

type LetterStrokeSpec = {
  d: string;
  end: number;
  length: number;
  start: number;
  strokeWidth: number;
};

type LetterWritingLayerProps = {
  clipPathD: string;
  end: number;
  id: string;
  progress: SharedValue<number>;
  start: number;
  strokes: LetterStrokeSpec[];
};

function LetterWritingLayer({
  clipPathD,
  end,
  id,
  progress,
  start,
  strokes,
}: LetterWritingLayerProps) {
  const gateStyle = useAnimatedStyle(() => ({
    opacity: progress.value > start ? 1 : 0,
  }));
  const clipId = `${id}-clip`;
  const maskId = `${id}-mask`;

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, gateStyle]}
    >
      <Svg
        height="100%"
        preserveAspectRatio="none"
        viewBox="0 0 873 704"
        width="100%"
      >
        <Defs>
          <ClipPath id={clipId}>
            <Path d={clipPathD} />
          </ClipPath>
          <Mask
            height={704}
            id={maskId}
            maskContentUnits="userSpaceOnUse"
            maskType="alpha"
            maskUnits="userSpaceOnUse"
            width={873}
            x={0}
            y={0}
          >
            {strokes.map((stroke, index) => (
              <WritingStroke
                d={stroke.d}
                end={start + (end - start) * stroke.end}
                key={`${id}-stroke-${index}`}
                length={stroke.length}
                progress={progress}
                start={start + (end - start) * stroke.start}
                strokeWidth={stroke.strokeWidth}
              />
            ))}
            <LetterCompletionFill
              d={clipPathD}
              end={end}
              progress={progress}
              start={start}
            />
          </Mask>
        </Defs>

        <SvgImage
          clipPath={`url(#${clipId})`}
          height={704}
          href={LOGO_SOURCE}
          mask={`url(#${maskId})`}
          preserveAspectRatio="none"
          width={873}
        />
      </Svg>
    </Animated.View>
  );
}

type WritingLogoLayerProps = {
  wordProgress: SharedValue<number>;
};

function WritingLogoLayer({ wordProgress }: WritingLogoLayerProps) {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LetterWritingLayer
        clipPathD="M 0 0 H 230 V 320 H 170 L 110 360 H 0 Z"
        end={0.18}
        id="letter-s"
        progress={wordProgress}
        start={0}
        strokes={[
          {
            d: 'M 190 76 C 122 43 61 100 75 167 C 86 218 209 208 210 268 C 210 324 119 348 69 315',
            end: 1,
            length: 560,
            start: 0,
            strokeWidth: 98,
          },
        ]}
      />
      <LetterWritingLayer
        clipPathD="M 218 100 H 370 V 335 H 218 Z"
        end={0.31}
        id="letter-a-one"
        progress={wordProgress}
        start={0.18}
        strokes={[
          {
            d: 'M 318 170 C 262 153 226 213 239 267 C 250 313 310 281 332 219 C 337 204 334 249 353 286',
            end: 1,
            length: 390,
            start: 0,
            strokeWidth: 86,
          },
        ]}
      />
      <LetterWritingLayer
        clipPathD="M 370 100 H 515 V 335 H 370 Z"
        end={0.44}
        id="letter-a-two"
        progress={wordProgress}
        start={0.31}
        strokes={[
          {
            d: 'M 462 158 C 410 145 377 205 390 259 C 401 304 461 273 483 211 C 489 194 486 237 505 272',
            end: 1,
            length: 390,
            start: 0,
            strokeWidth: 84,
          },
        ]}
      />
      <LetterWritingLayer
        clipPathD="M 515 90 H 672 V 335 H 515 Z"
        end={0.6}
        id="letter-n"
        progress={wordProgress}
        start={0.44}
        strokes={[
          {
            d: 'M 517 267 C 531 213 538 169 557 151 C 574 135 558 245 569 276 C 584 226 603 157 632 140 C 661 123 640 225 647 270',
            end: 1,
            length: 470,
            start: 0,
            strokeWidth: 96,
          },
        ]}
      />
      <LetterWritingLayer
        clipPathD="M 0 330 H 300 V 425 H 205 V 704 H 0 Z"
        end={0.76}
        id="letter-t"
        progress={wordProgress}
        start={0.6}
        strokes={[
          {
            d: 'M 82 410 C 143 399 211 376 276 365',
            end: 0.46,
            length: 230,
            start: 0,
            strokeWidth: 90,
          },
          {
            d: 'M 183 382 C 174 462 164 554 159 622',
            end: 1,
            length: 250,
            start: 0.46,
            strokeWidth: 82,
          },
        ]}
      />
      <LetterWritingLayer
        clipPathD="M 205 425 H 363.5 V 615 H 205 Z"
        end={0.88}
        id="letter-a-three"
        progress={wordProgress}
        start={0.76}
        strokes={[
          {
            d: 'M 315 449 C 260 430 224 489 236 546 C 247 596 310 559 333 494 C 339 476 335 536 353 565',
            end: 1,
            length: 415,
            start: 0,
            strokeWidth: 86,
          },
        ]}
      />
      <LetterWritingLayer
        clipPathD="M 363 390 H 512 V 704 H 363 Z"
        end={1}
        id="letter-y"
        progress={wordProgress}
        start={0.88}
        strokes={[
          {
            d: 'M 387 443 C 376 494 374 551 395 570 C 424 585 462 506 483 443 C 469 514 455 596 412 641',
            end: 1,
            length: 500,
            start: 0,
            strokeWidth: 86,
          },
        ]}
      />
    </View>
  );
}

function QuestionLogoLayer({
  questionProgress,
}: {
  questionProgress: SharedValue<number>;
}) {
  return (
    <Svg
      height="100%"
      pointerEvents="none"
      preserveAspectRatio="none"
      viewBox="0 0 873 704"
      width="100%"
    >
      <Defs>
        <Mask
          height={704}
          id="question-writing-mask"
          maskContentUnits="userSpaceOnUse"
          maskType="alpha"
          maskUnits="userSpaceOnUse"
          width={873}
          x={0}
          y={0}
        >
          <WritingStroke
            d="M 721 352 C 740 290 828 299 825 370 C 823 421 774 427 760 478"
            end={0.82}
            length={330}
            progress={questionProgress}
            start={0}
            strokeWidth={80}
          />
          <WritingStroke
            d="M 749 552 L 749 558"
            end={1}
            length={18}
            progress={questionProgress}
            start={0.8}
            strokeWidth={76}
          />
        </Mask>
      </Defs>

      <SvgImage
        height={704}
        href={LOGO_SOURCE}
        mask="url(#question-writing-mask)"
        preserveAspectRatio="none"
        width={873}
      />
    </Svg>
  );
}

function PinLogoLayer() {
  return (
    <Svg
      height="100%"
      pointerEvents="none"
      preserveAspectRatio="none"
      viewBox="489 338 192 338"
      width="100%"
    >
      <Path
        d={PIN_MARK_PATH}
        fill={colors.splashAccent}
        fillRule="evenodd"
      />
    </Svg>
  );
}

function FinalLogoLayer() {
  return (
    <Svg
      height="100%"
      pointerEvents="none"
      preserveAspectRatio="none"
      viewBox="0 0 873 704"
      width="100%"
    >
      <Defs>
        <ClipPath id="final-word-clip">
          <Path d="M 0 0 H 672 V 332 H 503 V 704 H 0 Z" />
        </ClipPath>
        <ClipPath id="final-question-clip">
          <Path d="M 680 280 H 873 V 610 H 680 Z" />
        </ClipPath>
      </Defs>

      <SvgImage
        clipPath="url(#final-word-clip)"
        height={704}
        href={LOGO_SOURCE}
        preserveAspectRatio="none"
        width={873}
      />
      <Path
        d={PIN_MARK_PATH}
        fill={colors.splashAccent}
        fillRule="evenodd"
      />
      <SvgImage
        clipPath="url(#final-question-clip)"
        height={704}
        href={LOGO_SOURCE}
        preserveAspectRatio="none"
        width={873}
      />
    </Svg>
  );
}

type AnimatedBrandMarkProps = {
  onReadyChange: (ready: boolean) => void;
};

function AnimatedBrandMark({ onReadyChange }: AnimatedBrandMarkProps) {
  const reduceMotion = useReducedMotion();
  const baseOpacity = useSharedValue(0);
  const layersOpacity = useSharedValue(reduceMotion ? 0 : 1);
  const wordProgress = useSharedValue(0);
  const pinOpacity = useSharedValue(0);
  const pinScale = useSharedValue(0.84);
  const pinY = useSharedValue(-10);
  const firstSignal = useSharedValue(0);
  const secondSignal = useSharedValue(0);
  const lockSignal = useSharedValue(0);
  const questionProgress = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      const animatedValues = [
        baseOpacity,
        layersOpacity,
        wordProgress,
        pinOpacity,
        pinScale,
        pinY,
        firstSignal,
        secondSignal,
        lockSignal,
        questionProgress,
      ];

      animatedValues.forEach(cancelAnimation);

      if (hasPlayedWelcomeEntrance) {
        baseOpacity.value = 1;
        layersOpacity.value = 0;
        wordProgress.value = 1;
        pinOpacity.value = 1;
        pinScale.value = 1;
        pinY.value = 0;
        firstSignal.value = 1;
        secondSignal.value = 1;
        lockSignal.value = 1;
        questionProgress.value = 1;
        onReadyChange(true);

        return () => animatedValues.forEach(cancelAnimation);
      }

      baseOpacity.value = 0;
      layersOpacity.value = reduceMotion ? 0 : 1;
      wordProgress.value = 0;
      pinOpacity.value = 0;
      pinScale.value = 0.84;
      pinY.value = -10;
      firstSignal.value = 0;
      secondSignal.value = 0;
      lockSignal.value = 0;
      questionProgress.value = 0;
      onReadyChange(false);

      const startTimer = setTimeout(() => {
        hasPlayedWelcomeEntrance = true;

        if (reduceMotion) {
          baseOpacity.value = withTiming(
            1,
            {
              duration: 180,
              easing: Easing.out(Easing.cubic),
            },
            (finished) => {
              if (finished) runOnJS(onReadyChange)(true);
            },
          );
          return;
        }

        wordProgress.value = withTiming(1, {
          duration: 1500,
          easing: Easing.inOut(Easing.cubic),
        });

        pinOpacity.value = withDelay(
          1600,
          withTiming(1, {
            duration: 140,
            easing: Easing.out(Easing.cubic),
          }),
        );
        pinScale.value = withDelay(
          1600,
          withSequence(
            withSpring(1, {
              damping: 12,
              mass: 0.62,
              stiffness: 225,
            }),
            withTiming(1.055, {
              duration: 110,
              easing: Easing.out(Easing.cubic),
            }),
            withTiming(1, {
              duration: 150,
              easing: Easing.out(Easing.cubic),
            }),
          ),
        );
        pinY.value = withDelay(
          1600,
          withSpring(0, {
            damping: 12,
            mass: 0.62,
            stiffness: 225,
          }),
        );

        firstSignal.value = withDelay(
          1750,
          withTiming(1, {
            duration: 520,
            easing: Easing.out(Easing.exp),
          }),
        );
        secondSignal.value = withDelay(
          1880,
          withTiming(1, {
            duration: 560,
            easing: Easing.out(Easing.exp),
          }),
        );

        lockSignal.value = withDelay(
          2160,
          withTiming(1, {
            duration: 360,
            easing: Easing.out(Easing.cubic),
          }),
        );

        questionProgress.value = withDelay(
          2570,
          withTiming(1, {
            duration: 440,
            easing: Easing.inOut(Easing.cubic),
          }),
        );

        baseOpacity.value = withDelay(
          BRAND_ANIMATION_DURATION,
          withTiming(1, { duration: 1 }, (finished) => {
            if (finished) runOnJS(onReadyChange)(true);
          }),
        );
        layersOpacity.value = withDelay(
          BRAND_ANIMATION_DURATION,
          withTiming(0, { duration: 1 }),
        );
      }, reduceMotion ? 0 : ENTRANCE_START_DELAY);

      const fallbackTimer = setTimeout(
        () => onReadyChange(true),
        reduceMotion
          ? 500
          : ENTRANCE_START_DELAY + BRAND_ANIMATION_DURATION + 450,
      );

      return () => {
        clearTimeout(startTimer);
        clearTimeout(fallbackTimer);
        animatedValues.forEach(cancelAnimation);
      };
    }, [
      baseOpacity,
      firstSignal,
      layersOpacity,
      lockSignal,
      onReadyChange,
      pinOpacity,
      pinScale,
      pinY,
      questionProgress,
      reduceMotion,
      secondSignal,
      wordProgress,
    ]),
  );

  const baseStyle = useAnimatedStyle(() => ({
    opacity: baseOpacity.value,
  }));
  const layersStyle = useAnimatedStyle(() => ({
    opacity: layersOpacity.value,
  }));
  const pinStyle = useAnimatedStyle(() => ({
    opacity: pinOpacity.value,
    transform: [
      { translateY: pinY.value },
      {
        scale:
          pinScale.value *
          interpolate(lockSignal.value, [0, 0.48, 1], [1, 1.07, 1]),
      },
    ],
  }));
  const firstSignalStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      firstSignal.value,
      [0, 0.08, 0.65, 1],
      [0, 0.9, 0.34, 0],
    ),
    transform: [
      {
        scale: interpolate(firstSignal.value, [0, 1], [1.7, 3]),
      },
    ],
  }));
  const secondSignalStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      secondSignal.value,
      [0, 0.08, 0.65, 1],
      [0, 0.72, 0.26, 0],
    ),
    transform: [
      {
        scale: interpolate(secondSignal.value, [0, 1], [1.7, 3.7]),
      },
    ],
  }));
  const lockSignalStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      lockSignal.value,
      [0, 0.12, 0.72, 1],
      [0, 0.88, 0.5, 0],
    ),
    transform: [
      {
        scale: interpolate(lockSignal.value, [0, 1], [2.9, 1.55]),
      },
    ],
  }));
  const questionLayerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      questionProgress.value,
      [0, 0.025],
      [0, 1],
      'clamp',
    ),
  }));
  return (
    <View
      accessibilityLabel="Saan Tayo?"
      accessibilityRole="image"
      accessible
      style={styles.logo}
    >
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, baseStyle]}
      >
        <FinalLogoLayer />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, layersStyle]}
      >
        <WritingLogoLayer wordProgress={wordProgress} />
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, questionLayerStyle]}
        >
          <QuestionLogoLayer questionProgress={questionProgress} />
        </Animated.View>

        <Animated.View
          accessible={false}
          importantForAccessibility="no"
          style={[styles.signalRing, firstSignalStyle]}
        />
        <Animated.View
          accessible={false}
          importantForAccessibility="no"
          style={[styles.signalRing, secondSignalStyle]}
        />
        <Animated.View
          accessible={false}
          importantForAccessibility="no"
          style={[styles.signalRing, lockSignalStyle]}
        />

        <Animated.View style={[styles.pinCrop, pinStyle]}>
          <PinLogoLayer />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [actionsReady, setActionsReady] = useState(false);
  const actionsProgress = useSharedValue(0);

  useEffect(() => {
    cancelAnimation(actionsProgress);
    actionsProgress.value = actionsReady
      ? withTiming(1, {
          duration: ACTION_REVEAL_DURATION,
          easing: Easing.out(Easing.cubic),
        })
      : 0;

    return () => cancelAnimation(actionsProgress);
  }, [actionsProgress, actionsReady]);

  const actionsStyle = useAnimatedStyle(() => ({
    opacity: actionsProgress.value,
    transform: [
      {
        translateY: interpolate(actionsProgress.value, [0, 1], [12, 0]),
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

      <Image
        accessible={false}
        contentFit="cover"
        importantForAccessibility="no"
        source={require('@/assets/images/splash-pattern.png')}
        style={styles.backgroundPattern}
        transition={0}
      />
      <View pointerEvents="none" style={styles.backgroundScrim} />

      <ScrollView
        alwaysBounceVertical={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View
          style={[
            styles.content,
            {
              paddingBottom: Math.max(insets.bottom + 72, 88),
              paddingHorizontal: 38,
              paddingTop: Math.max(insets.top, 20),
            },
          ]}
        >
          <View style={styles.logoRegion}>
            <AnimatedBrandMark onReadyChange={setActionsReady} />
          </View>

          <Animated.View
            accessibilityElementsHidden={!actionsReady}
            importantForAccessibility={
              actionsReady ? 'auto' : 'no-hide-descendants'
            }
            pointerEvents={actionsReady ? 'auto' : 'none'}
            style={[styles.actions, actionsStyle]}
          >
            <Pressable
              accessibilityHint="Opens the onboarding flow"
              accessibilityLabel="Get Started"
              accessibilityRole="button"
              android_ripple={{ color: colors.splashAccentPressed }}
              disabled={!actionsReady}
              onPress={() => router.push('/onboarding')}
              style={({ pressed }) => [
                styles.button,
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <Text style={styles.primaryButtonText}>
                Get Started
              </Text>
            </Pressable>

            <Pressable
              accessibilityHint="Continues to the current app"
              accessibilityLabel="Log In"
              accessibilityRole="button"
              android_ripple={{ color: 'rgba(255, 194, 28, 0.12)' }}
              disabled={!actionsReady}
              onPress={() => router.push('/discover')}
              style={({ pressed }) => [
                styles.button,
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
            >
              <Text style={styles.secondaryButtonText}>
                Log In
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.splashBackground,
    overflow: 'hidden',
  },
  backgroundPattern: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  backgroundScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: 560,
    width: '100%',
  },
  logoRegion: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    aspectRatio: LOGO_ASPECT_RATIO,
    maxWidth: 304,
    position: 'relative',
    transform: [{ translateY: -24 }],
    width: '80%',
  },
  pinCrop: {
    height: '48%',
    left: '56%',
    overflow: 'hidden',
    position: 'absolute',
    top: '48%',
    width: '22%',
  },
  signalRing: {
    aspectRatio: 1,
    borderColor: colors.splashAccent,
    borderRadius: 999,
    borderWidth: 2,
    left: '63.1%',
    position: 'absolute',
    top: '56.3%',
    width: '12%',
  },
  actions: {
    gap: 14,
    maxWidth: 360,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    borderCurve: 'continuous',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 52,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 14,
    width: '100%',
  },
  primaryButton: {
    backgroundColor: colors.splashAccent,
  },
  primaryButtonPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  secondaryButton: {
    backgroundColor: 'rgba(8, 11, 12, 0.64)',
    borderColor: colors.splashOutline,
    borderWidth: 1.5,
  },
  secondaryButtonPressed: {
    backgroundColor: 'rgba(255, 194, 28, 0.08)',
    borderColor: colors.splashOutlinePressed,
  },
  primaryButtonText: {
    color: colors.splashOnAccent,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  secondaryButtonText: {
    color: colors.splashForeground,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
});
