import { ArrowRight, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { colors } from '@/constants/colors';

export function MatchBanner() {
  const router = useRouter();

  return (
    <View style={styles.banner}>
      <View style={styles.iconWell}>
        <Sparkles
          color={colors.splashOnAccent}
          size={24}
          strokeWidth={2.2}
        />
      </View>

      <View style={styles.copy}>
        <Text selectable style={styles.title}>
          Can\u2019t decide?
        </Text>
        <Text selectable style={styles.body}>
          Pick a vibe and budget. Smart Match will narrow the list.
        </Text>
      </View>

      <SmoothPressable
        accessibilityHint="Opens preference choices for Smart Match"
        accessibilityLabel="Help me choose"
        accessibilityRole="button"
        android_ripple={{ color: 'rgba(255, 255, 255, 0.12)' }}
        containerStyle={styles.actionContainer}
        onPress={() => router.push('/preferences')}
        style={({ pressed }) => [
          styles.action,
          pressed && styles.actionPressed,
        ]}
      >
        <ArrowRight
          color={colors.contentForeground}
          size={21}
          strokeWidth={2.4}
        />
      </SmoothPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    backgroundColor: colors.splashOnAccent,
    borderRadius: 999,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 46,
  },
  actionContainer: {
    alignSelf: 'center',
    height: 46,
    width: 46,
  },
  actionPressed: {
    opacity: 0.72,
  },
  banner: {
    alignItems: 'center',
    backgroundColor: colors.splashAccent,
    borderCurve: 'continuous',
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    minHeight: 112,
    padding: 16,
  },
  body: {
    color: 'rgba(16, 18, 19, 0.72)',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  copy: {
    flex: 1,
    gap: 3,
  },
  iconWell: {
    alignItems: 'center',
    borderColor: 'rgba(16, 18, 19, 0.18)',
    borderRadius: 999,
    borderWidth: 1,
    height: 46,
    justifyContent: 'center',
    width: 46,
  },
  title: {
    color: colors.splashOnAccent,
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: -0.25,
    lineHeight: 21,
  },
});
