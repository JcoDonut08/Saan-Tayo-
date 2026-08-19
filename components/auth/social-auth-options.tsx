import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/constants/colors';
import {
  FacebookBrandIcon,
  GoogleBrandIcon,
} from '@/components/auth/social-brand-icons';

type SocialProvider = 'Facebook' | 'Google';

export function SocialAuthOptions() {
  const [notice, setNotice] = useState<string | null>(null);

  const showPrototypeNotice = (provider: SocialProvider) => {
    setNotice(
      `${provider} sign-in will be connected during the backend phase.`,
    );
  };

  return (
    <View style={styles.group}>
      <View accessibilityElementsHidden style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerLabel}>or continue with</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialRow}>
        <Pressable
          accessibilityHint="Shows prototype availability information"
          accessibilityLabel="Continue with Google"
          accessibilityRole="button"
          onPress={() => showPrototypeNotice('Google')}
          style={({ pressed }) => [
            styles.socialButton,
            pressed && styles.socialButtonPressed,
          ]}
        >
          <View style={styles.socialButtonContent}>
            <GoogleBrandIcon size={20} />
            <Text style={styles.socialLabel}>Google</Text>
          </View>
        </Pressable>
        <Pressable
          accessibilityHint="Shows prototype availability information"
          accessibilityLabel="Continue with Facebook"
          accessibilityRole="button"
          onPress={() => showPrototypeNotice('Facebook')}
          style={({ pressed }) => [
            styles.socialButton,
            pressed && styles.socialButtonPressed,
          ]}
        >
          <View style={styles.socialButtonContent}>
            <FacebookBrandIcon size={20} />
            <Text style={styles.socialLabel}>Facebook</Text>
          </View>
        </Pressable>
      </View>

      {notice ? (
        <Text accessibilityLiveRegion="polite" style={styles.notice}>
          {notice}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.authFieldBorder,
    flex: 1,
    height: 1,
  },
  dividerLabel: {
    color: colors.authMuted,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  dividerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  group: {
    gap: 12,
  },
  notice: {
    color: colors.authMuted,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    textAlign: 'center',
  },
  socialButton: {
    alignItems: 'center',
    backgroundColor: colors.authSocialSurface,
    borderColor: colors.authSocialBorder,
    borderCurve: 'continuous',
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 14,
  },
  socialButtonContent: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  socialButtonPressed: {
    backgroundColor: colors.authField,
  },
  socialLabel: {
    color: colors.authText,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 10,
  },
});
