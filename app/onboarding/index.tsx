import { useCallback, useEffect, useRef, useState } from 'react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OnboardingButton } from '@/components/onboarding/onboarding-button';
import { OnboardingSlide } from '@/components/onboarding/onboarding-slide';
import { PaginationDots } from '@/components/onboarding/pagination-dots';
import { colors } from '@/constants/colors';
import {
  onboardingSlides,
  type OnboardingSlideData,
} from '@/constants/onboarding';

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<OnboardingSlideData>,
);

export default function OnboardingScreen() {
  const router = useRouter();
  const { height, width: windowWidth } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlideData>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const [measuredHeight, setMeasuredHeight] = useState(0);
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const pageProgress = useSharedValue(0);
  const pageHeight = measuredHeight || height || 640;
  const pageWidth = measuredWidth || windowWidth || 360;
  const illustrationHeight = Math.min(
    Math.max(pageHeight * 0.48, 286),
    420,
  );

  const finishOnboarding = useCallback(() => {
    router.replace('/discover');
  }, [router]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }, [router]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      pageProgress.value = event.contentOffset.x / pageWidth;
    },
  });

  const handleScreenLayout = useCallback((event: LayoutChangeEvent) => {
    const { height: nextHeight, width: nextWidth } = event.nativeEvent.layout;
    setMeasuredHeight((currentHeight) =>
      Math.abs(currentHeight - nextHeight) > 0.5 ? nextHeight : currentHeight,
    );
    setMeasuredWidth((currentWidth) =>
      Math.abs(currentWidth - nextWidth) > 0.5 ? nextWidth : currentWidth,
    );
  }, []);

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const nextIndex = Math.max(
        0,
        Math.min(
          onboardingSlides.length - 1,
          Math.round(event.nativeEvent.contentOffset.x / pageWidth),
        ),
      );
      setCurrentIndex(nextIndex);
    },
    [pageWidth],
  );

  const handleNext = useCallback(() => {
    if (currentIndex === onboardingSlides.length - 1) {
      finishOnboarding();
      return;
    }

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    listRef.current?.scrollToIndex({
      animated: true,
      index: nextIndex,
    });
  }, [currentIndex, finishOnboarding]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const stableIndex = currentIndexRef.current;
      listRef.current?.scrollToOffset({
        animated: false,
        offset: stableIndex * pageWidth,
      });
      pageProgress.value = stableIndex;
    });

    return () => cancelAnimationFrame(frame);
  }, [pageProgress, pageWidth]);

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      onLayout={handleScreenLayout}
      style={styles.screen}
    >
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
        pointerEvents="none"
        source={require('@/assets/images/splash-pattern.png')}
        style={styles.backgroundPattern}
        transition={0}
      />
      <View pointerEvents="none" style={styles.backgroundScrim} />

      <View style={styles.topBar}>
        <Pressable
          accessibilityHint="Returns to the welcome screen"
          accessibilityLabel="Go back"
          accessibilityRole="button"
          hitSlop={8}
          onPress={handleBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.topButtonPressed,
          ]}
        >
          <ArrowLeft
            color={colors.onboardingForeground}
            size={24}
            strokeWidth={2.4}
          />
        </Pressable>
        <Pressable
          accessibilityHint="Skips onboarding and opens Discover"
          accessibilityLabel="Skip onboarding"
          accessibilityRole="button"
          hitSlop={8}
          onPress={finishOnboarding}
          style={({ pressed }) => [
            styles.skipButton,
            pressed && styles.topButtonPressed,
          ]}
        >
          <Text style={styles.skipLabel}>Skip</Text>
        </Pressable>
      </View>

      <AnimatedFlatList
        bounces={false}
        data={onboardingSlides}
        decelerationRate="fast"
        disableIntervalMomentum
        extraData={currentIndex}
        getItemLayout={(_, index) => ({
          index,
          length: pageWidth,
          offset: pageWidth * index,
        })}
        horizontal
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={scrollHandler}
        overScrollMode="never"
        pagingEnabled
        ref={listRef}
        removeClippedSubviews={false}
        renderItem={({ index, item }) => (
          <OnboardingSlide
            illustrationHeight={illustrationHeight}
            isActive={index === currentIndex}
            item={item}
            width={pageWidth}
          />
        )}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={pageWidth}
        style={styles.list}
      />

      <View style={styles.footer}>
        <PaginationDots
          currentIndex={currentIndex}
          pageProgress={pageProgress}
          total={onboardingSlides.length}
        />
        <OnboardingButton
          label={
            currentIndex === onboardingSlides.length - 1
              ? "Let's Go"
              : 'Next'
          }
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
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
  footer: {
    alignSelf: 'center',
    gap: 18,
    maxWidth: 420,
    paddingBottom: 12,
    paddingHorizontal: 24,
    paddingTop: 12,
    width: '100%',
  },
  list: {
    flex: 1,
  },
  screen: {
    backgroundColor: colors.onboardingBackground,
    flex: 1,
  },
  skipButton: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 64,
    paddingHorizontal: 12,
  },
  skipLabel: {
    color: colors.onboardingForeground,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 56,
    paddingHorizontal: 18,
  },
  topButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
});
