import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
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

import { BrandBackdrop } from '@/components/brand/brand-backdrop';
import { AppBackButton } from '@/components/navigation/app-back-button';
import { OnboardingButton } from '@/components/onboarding/onboarding-button';
import { OnboardingSlide } from '@/components/onboarding/onboarding-slide';
import { PaginationDots } from '@/components/onboarding/pagination-dots';
import { colors } from '@/constants/colors';
import {
  onboardingSlides,
  type OnboardingSlideData,
} from '@/constants/onboarding';
import { useAppStore } from '@/stores/app-store';

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<OnboardingSlideData>,
);

export default function OnboardingScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const cancelPendingEntry = useAppStore(
    (state) => state.cancelPendingEntry,
  );
  const completeIntroduction = useAppStore(
    (state) => state.completeIntroduction,
  );
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
    completeIntroduction();
    router.replace('/discover');
  }, [completeIntroduction, router]);

  const handleBack = useCallback(() => {
    cancelPendingEntry();
    router.replace('/');
  }, [cancelPendingEntry, router]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (event) => {
        const entryState = useAppStore.getState();
        if (entryState.introStatus !== 'pending') return;

        event.preventDefault();
        entryState.cancelPendingEntry();
        router.replace('/');
      }),
    [navigation, router],
  );

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

      <BrandBackdrop />

      <View style={styles.topBar}>
        <AppBackButton
          accessibilityHint="Returns to the welcome screen"
          onPress={handleBack}
        />
        <Pressable
          accessibilityHint="Skips the introduction and opens Discover"
          accessibilityLabel="Skip introduction"
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
  },
  topButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
  },
});
