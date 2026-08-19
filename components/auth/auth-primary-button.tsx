import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '@/constants/colors';

type AuthPrimaryButtonProps = {
  label: string;
  loading?: boolean;
  onPress: () => void;
};

export function AuthPrimaryButton({
  label,
  loading = false,
  onPress,
}: AuthPrimaryButtonProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled: loading }}
      android_ripple={{ color: colors.splashAccentPressed }}
      disabled={loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && !loading && styles.buttonPressed,
        loading && styles.buttonLoading,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.splashOnAccent} size="small" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderCurve: 'continuous',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 52,
    overflow: 'hidden',
    paddingHorizontal: 24,
  },
  buttonLoading: {
    opacity: 0.72,
  },
  buttonPressed: {
    backgroundColor: colors.splashAccentPressed,
    transform: [{ scale: 0.988 }],
  },
  label: {
    color: colors.splashOnAccent,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.1,
    lineHeight: 22,
  },
});
