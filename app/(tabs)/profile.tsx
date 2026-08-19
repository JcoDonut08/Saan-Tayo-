import { Redirect, useRouter } from 'expo-router';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SmoothPressable } from '@/components/motion/smooth-pressable';
import { colors } from '@/constants/colors';
import { useAppStore } from '@/stores/app-store';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const accessMode = useAppStore((state) => state.accessMode);
  const hasHydrated = useAppStore((state) => state.hasHydrated);
  const isGuest = accessMode === 'guest';

  if (!hasHydrated) {
    return <View style={styles.screen} />;
  }

  if (accessMode === 'none') return <Redirect href="/" />;

  return (
    <ScrollView
      alwaysBounceVertical={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        styles.content,
        {
          paddingBottom: Math.max(insets.bottom + 32, 48),
          paddingTop: Math.max(insets.top + 32, 56),
        },
      ]}
      style={styles.screen}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.profileContent}>
        <View style={styles.copy}>
          <Text accessibilityRole="header" style={styles.title}>
            {isGuest ? 'Exploring as a guest' : 'Your profile'}
          </Text>
          <Text style={styles.body}>
            {isGuest
              ? 'Keep exploring without an account. Log in when you want to use an existing profile or create a new one.'
              : 'You’re signed in for this prototype. Account syncing will be connected with the authentication backend.'}
          </Text>
        </View>

        {isGuest ? (
          <SmoothPressable
            accessibilityHint="Opens login, where account creation is also available"
            accessibilityLabel="Log in or create an account"
            accessibilityRole="button"
            android_ripple={{ color: colors.splashAccentPressed }}
            onPress={() => router.push('/auth/login')}
            style={({ pressed }) => [
              styles.action,
              pressed && styles.actionPressed,
            ]}
          >
            <Text style={styles.actionLabel}>Log in or create account</Text>
          </SmoothPressable>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  action: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 56,
    overflow: 'hidden',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  actionLabel: {
    color: colors.splashOnAccent,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    textAlign: 'center',
  },
  actionPressed: {
    backgroundColor: colors.splashAccentPressed,
  },
  body: {
    color: colors.onboardingMuted,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 25,
  },
  content: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  copy: {
    gap: 12,
  },
  profileContent: {
    gap: 32,
    maxWidth: 440,
    width: '100%',
  },
  screen: {
    backgroundColor: colors.splashBackground,
    flex: 1,
  },
  title: {
    color: colors.splashForeground,
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.85,
    lineHeight: 40,
  },
});
