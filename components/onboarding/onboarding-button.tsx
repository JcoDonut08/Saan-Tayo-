import { StyleSheet, Text } from 'react-native';

import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { colors } from '@/constants/colors';

type OnboardingButtonProps = {
  disabled?: boolean;
  label: string;
  onPress: () => void;
};

export function OnboardingButton({
  disabled = false,
  label,
  onPress,
}: OnboardingButtonProps) {
  return (
    <SmoothPressable
      accessibilityHint={
        label === "Let's Go"
          ? 'Finishes the introduction and opens Discover'
          : 'Moves to the next onboarding page'
      }
      accessibilityLabel={label}
      accessibilityRole="button"
      android_ripple={{ color: colors.splashAccentPressed }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </SmoothPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 58,
    overflow: 'hidden',
    paddingHorizontal: 26,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  label: {
    color: colors.splashOnAccent,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.1,
    lineHeight: 22,
  },
});
