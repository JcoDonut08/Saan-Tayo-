import { Redirect, useRouter } from 'expo-router';
import { Check, RotateCcw } from 'lucide-react-native';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryIcon } from '@/components/discovery/category-icon';
import { ScreenLoading } from '@/components/discovery/screen-loading';
import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { categoryOptions } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { moodOptions } from '@/constants/moods';
import { useAppStore } from '@/stores/app-store';
import { useDiscoveryStore } from '@/stores/discovery-store';
import type { BudgetCeiling } from '@/types/preferences';
import { budgetLabels } from '@/utils/matching';

const budgetOptions: BudgetCeiling[] = [
  'free',
  'up-to-300',
  'up-to-600',
  'any',
];

export default function PreferencesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const accessMode = useAppStore((state) => state.accessMode);
  const hasSessionHydrated = useAppStore((state) => state.hasHydrated);
  const hasDiscoveryHydrated = useDiscoveryStore(
    (state) => state.hasHydrated,
  );
  const preferences = useDiscoveryStore((state) => state.preferences);
  const resetPreferences = useDiscoveryStore(
    (state) => state.resetPreferences,
  );
  const setBudget = useDiscoveryStore((state) => state.setBudget);
  const toggleCategory = useDiscoveryStore((state) => state.toggleCategory);
  const toggleMood = useDiscoveryStore((state) => state.toggleMood);
  const canShowMatches = preferences.moods.length > 0;

  if (!hasSessionHydrated || !hasDiscoveryHydrated) {
    return <ScreenLoading />;
  }

  if (accessMode === 'none') return <Redirect href="/" />;

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom + 32, 48) },
      ]}
      showsVerticalScrollIndicator={false}
      style={styles.screen}
    >
      <StatusBar
        backgroundColor={colors.contentBackground}
        barStyle="light-content"
      />

      <View style={styles.intro}>
        <Text accessibilityRole="header" selectable style={styles.title}>
          What fits today?
        </Text>
        <Text selectable style={styles.subtitle}>
          Choose a vibe first. Budget and place type help Smart Match narrow the
          list without pretending there is one perfect answer.
        </Text>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Your vibe
          </Text>
          <Text selectable style={styles.selectionCount}>
            {preferences.moods.length}/3
          </Text>
        </View>

        <View style={styles.optionGroup}>
          {moodOptions.map((mood, index) => {
            const selected = preferences.moods.includes(mood.id);
            const disabled = !selected && preferences.moods.length >= 3;

            return (
              <SmoothPressable
                accessibilityLabel={mood.label}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected, disabled }}
                disabled={disabled}
                key={mood.id}
                onPress={() => toggleMood(mood.id)}
                style={({ pressed }) => [
                  styles.optionRow,
                  index < moodOptions.length - 1 && styles.optionDivider,
                  selected && styles.optionRowSelected,
                  disabled && styles.optionDisabled,
                  pressed && styles.optionPressed,
                ]}
              >
                <View style={styles.optionCopy}>
                  <Text
                    style={[
                      styles.optionLabel,
                      selected && styles.optionLabelSelected,
                    ]}
                  >
                    {mood.label}
                  </Text>
                  <Text style={styles.optionDescription}>
                    {mood.description}
                  </Text>
                </View>
                <View
                  style={[
                    styles.selectionMark,
                    selected && styles.selectionMarkSelected,
                  ]}
                >
                  {selected ? (
                    <Check
                      color={colors.splashOnAccent}
                      size={17}
                      strokeWidth={3}
                    />
                  ) : null}
                </View>
              </SmoothPressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Budget per person
          </Text>
          <Text style={styles.optionalLabel}>Choose one</Text>
        </View>

        <View style={styles.budgetGrid}>
          {budgetOptions.map((budget) => {
            const selected = preferences.budget === budget;

            return (
              <SmoothPressable
                accessibilityLabel={budgetLabels[budget]}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                containerStyle={styles.budgetOptionContainer}
                key={budget}
                onPress={() => setBudget(budget)}
                style={({ pressed }) => [
                  styles.budgetOption,
                  selected && styles.budgetOptionSelected,
                  pressed && styles.optionPressed,
                ]}
              >
                <Text
                  style={[
                    styles.budgetLabel,
                    selected && styles.budgetLabelSelected,
                  ]}
                >
                  {budgetLabels[budget]}
                </Text>
              </SmoothPressable>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeading}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Place type
          </Text>
          <Text selectable style={styles.selectionCount}>
            {preferences.categories.length}/3
          </Text>
        </View>
        <Text selectable style={styles.sectionHelp}>
          Optional. Leave everything clear to consider every kind of place.
        </Text>

        <View style={styles.categoryGrid}>
          {categoryOptions.map((category) => {
            const selected = preferences.categories.includes(category.id);
            const disabled =
              !selected && preferences.categories.length >= 3;

            return (
              <SmoothPressable
                accessibilityLabel={category.pluralLabel}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected, disabled }}
                containerStyle={styles.categoryOptionContainer}
                disabled={disabled}
                key={category.id}
                onPress={() => toggleCategory(category.id)}
                style={({ pressed }) => [
                  styles.categoryOption,
                  selected && styles.categoryOptionSelected,
                  disabled && styles.optionDisabled,
                  pressed && styles.optionPressed,
                ]}
              >
                <CategoryIcon
                  category={category.id}
                  color={
                    selected
                      ? colors.splashOnAccent
                      : colors.contentForeground
                  }
                  size={21}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.categoryLabel,
                    selected && styles.categoryLabelSelected,
                  ]}
                >
                  {category.pluralLabel}
                </Text>
              </SmoothPressable>
            );
          })}
        </View>
      </View>

      <View style={styles.actions}>
        {!canShowMatches ? (
          <Text accessibilityLiveRegion="polite" style={styles.requirement}>
            Choose at least one vibe to see matches.
          </Text>
        ) : null}

        <SmoothPressable
          accessibilityHint="Ranks places using your selected preferences"
          accessibilityLabel="Show smart matches"
          accessibilityRole="button"
          accessibilityState={{ disabled: !canShowMatches }}
          disabled={!canShowMatches}
          onPress={() => router.push('/results')}
          style={({ pressed }) => [
            styles.primaryAction,
            !canShowMatches && styles.primaryActionDisabled,
            pressed && canShowMatches && styles.primaryActionPressed,
          ]}
        >
          <Text
            style={[
              styles.primaryActionLabel,
              !canShowMatches && styles.primaryActionLabelDisabled,
            ]}
          >
            Show smart matches
          </Text>
        </SmoothPressable>

        <SmoothPressable
          accessibilityLabel="Reset preferences"
          accessibilityRole="button"
          onPress={resetPreferences}
          style={({ pressed }) => [
            styles.resetAction,
            pressed && styles.resetActionPressed,
          ]}
        >
          <RotateCcw
            color={colors.contentMuted}
            size={17}
            strokeWidth={2.1}
          />
          <Text style={styles.resetActionLabel}>Reset preferences</Text>
        </SmoothPressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: 12,
    paddingTop: 8,
  },
  budgetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  budgetLabel: {
    color: colors.contentMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    textAlign: 'center',
  },
  budgetLabelSelected: {
    color: colors.splashOnAccent,
  },
  budgetOption: {
    alignItems: 'center',
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderCurve: 'continuous',
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 54,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  budgetOptionContainer: {
    alignSelf: 'auto',
    width: '48%',
  },
  budgetOptionSelected: {
    backgroundColor: colors.splashAccent,
    borderColor: colors.splashAccent,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryLabel: {
    color: colors.contentForeground,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  categoryLabelSelected: {
    color: colors.splashOnAccent,
  },
  categoryOption: {
    alignItems: 'center',
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderCurve: 'continuous',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 9,
    minHeight: 54,
    overflow: 'hidden',
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
  categoryOptionContainer: {
    alignSelf: 'auto',
  },
  categoryOptionSelected: {
    backgroundColor: colors.splashAccent,
    borderColor: colors.splashAccent,
  },
  content: {
    alignSelf: 'center',
    gap: 34,
    maxWidth: 640,
    paddingHorizontal: 20,
    paddingTop: 28,
    width: '100%',
  },
  intro: {
    gap: 9,
  },
  optionCopy: {
    flex: 1,
    gap: 3,
  },
  optionDescription: {
    color: colors.contentMuted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  optionDisabled: {
    opacity: 0.42,
  },
  optionDivider: {
    borderBottomColor: colors.contentBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionGroup: {
    backgroundColor: colors.contentSurface,
    borderColor: colors.contentBorder,
    borderCurve: 'continuous',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  optionLabel: {
    color: colors.contentForeground,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 21,
  },
  optionLabelSelected: {
    color: colors.splashAccent,
  },
  optionPressed: {
    opacity: 0.7,
  },
  optionRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 14,
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  optionRowSelected: {
    backgroundColor: colors.contentYellowWash,
  },
  optionalLabel: {
    color: colors.contentSubtle,
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  primaryAction: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 58,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  primaryActionDisabled: {
    backgroundColor: colors.contentSurfaceStrong,
  },
  primaryActionLabel: {
    color: colors.splashOnAccent,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
  },
  primaryActionLabelDisabled: {
    color: colors.contentSubtle,
  },
  primaryActionPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  requirement: {
    color: colors.contentMuted,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
  },
  resetAction: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  resetActionLabel: {
    color: colors.contentMuted,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  resetActionPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  screen: {
    backgroundColor: colors.contentBackground,
    flex: 1,
    width: '100%',
  },
  section: {
    gap: 12,
  },
  sectionHeading: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionHelp: {
    color: colors.contentMuted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },
  sectionTitle: {
    color: colors.contentForeground,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  selectionCount: {
    color: colors.contentSubtle,
    fontSize: 12,
    fontVariant: ['tabular-nums'],
    fontWeight: '800',
    lineHeight: 17,
  },
  selectionMark: {
    borderColor: colors.contentBorderStrong,
    borderRadius: 999,
    borderWidth: 1.5,
    height: 28,
    width: 28,
  },
  selectionMarkSelected: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderColor: colors.splashAccent,
    justifyContent: 'center',
  },
  subtitle: {
    color: colors.contentMuted,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    maxWidth: 500,
  },
  title: {
    color: colors.contentForeground,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.9,
    lineHeight: 38,
  },
});
