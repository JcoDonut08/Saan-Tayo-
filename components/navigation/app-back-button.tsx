import { ArrowLeft } from 'lucide-react-native';
import { StyleSheet } from 'react-native';

import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { colors } from '@/constants/colors';

type AppBackButtonProps = {
  accessibilityHint?: string;
  onPress: () => void;
};

export function AppBackButton({
  accessibilityHint = 'Returns to the previous screen',
  onPress,
}: AppBackButtonProps) {
  return (
    <SmoothPressable
      accessibilityHint={accessibilityHint}
      accessibilityLabel="Go back"
      accessibilityRole="button"
      android_ripple={{ color: 'rgba(255, 255, 255, 0.1)' }}
      containerStyle={styles.motionContainer}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <ArrowLeft
        color={colors.splashForeground}
        size={24}
        strokeWidth={2.4}
      />
    </SmoothPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 999,
    height: 48,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 48,
  },
  buttonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  motionContainer: {
    alignSelf: 'center',
    height: 48,
    width: 48,
  },
});
