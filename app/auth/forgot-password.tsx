import { Check } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthField } from '@/components/auth/auth-field';
import { AuthPrimaryButton } from '@/components/auth/auth-primary-button';
import { AuthShell } from '@/components/auth/auth-shell';
import { colors } from '@/constants/colors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleReset = () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError('Enter the email connected to your account.');
      return;
    }

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError('Enter an email address in the correct format.');
      return;
    }

    setError(undefined);
    setSending(true);
    resetTimer.current = setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 650);
  };

  return (
    <AuthShell
      subtitle={
        sent
          ? 'The interaction works; email delivery comes with the backend.'
          : "Enter your email and we'll prepare the reset step."
      }
      title={sent ? 'Check your inbox' : 'Reset your password'}
    >
      {sent ? (
        <View style={styles.successState}>
          <View style={styles.successIcon}>
            <Check color={colors.authText} size={28} strokeWidth={2.8} />
          </View>
          <Text selectable style={styles.successMessage}>
            Prototype reset prepared for {email.trim()}.
          </Text>
          <AuthPrimaryButton
            label="Back to log in"
            onPress={() => router.replace('/auth/login')}
          />
        </View>
      ) : (
        <View style={styles.form}>
          <AuthField
            autoCapitalize="none"
            autoComplete="email"
            error={error}
            icon="email"
            keyboardType="email-address"
            label="Email"
            onChangeText={(value) => {
              setEmail(value);
              if (error) setError(undefined);
            }}
            onSubmitEditing={handleReset}
            placeholder="you@example.com"
            returnKeyType="send"
            textContentType="emailAddress"
            value={email}
          />
          <AuthPrimaryButton
            label="Send reset link"
            loading={sending}
            onPress={handleReset}
          />
          <Pressable
            accessibilityRole="link"
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backLink,
              pressed && styles.backLinkPressed,
            ]}
          >
            <Text style={styles.backLinkLabel}>Return to log in</Text>
          </Pressable>
        </View>
      )}
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  backLink: {
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  backLinkLabel: {
    color: colors.authText,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    textDecorationColor: colors.splashAccentPressed,
    textDecorationLine: 'underline',
  },
  backLinkPressed: {
    opacity: 0.58,
  },
  form: {
    gap: 20,
  },
  successIcon: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.splashAccent,
    borderRadius: 999,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  successMessage: {
    color: colors.authMuted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
  },
  successState: {
    gap: 22,
    paddingTop: 8,
  },
});
