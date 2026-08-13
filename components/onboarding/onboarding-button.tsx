import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';

type OnboardingButtonProps = {
  label: string;
  onPress: () => void;
};

export function OnboardingButton({
  label,
  onPress,
}: OnboardingButtonProps) {
  return (
    <Pressable
      accessibilityHint={
        label === "Let's Go"
          ? 'Finishes onboarding and opens Discover'
          : 'Moves to the next onboarding page'
      }
      accessibilityLabel={label}
      accessibilityRole="button"
      android_ripple={{ color: colors.splashAccentPressed }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
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
    transform: [{ scale: 0.985 }],
  },
  label: {
    color: colors.splashOnAccent,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.1,
    lineHeight: 22,
  },
});
