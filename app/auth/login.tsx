import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthField } from '@/components/auth/auth-field';
import { AuthPrimaryButton } from '@/components/auth/auth-primary-button';
import { AuthShell } from '@/components/auth/auth-shell';
import { SocialAuthOptions } from '@/components/auth/social-auth-options';
import { colors } from '@/constants/colors';
import { useAppStore } from '@/stores/app-store';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const signInReturningUser = useAppStore(
    (state) => state.signInReturningUser,
  );
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(
    () => () => {
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
    },
    [],
  );

  const handleLogin = () => {
    const nextErrors: LoginErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextErrors.email = 'Enter your email address.';
    } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
      nextErrors.email = 'Enter an email address in the correct format.';
    }

    if (!password) nextErrors.password = 'Enter your password.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    navigationTimer.current = setTimeout(() => {
      signInReturningUser();
      router.replace('/discover');
    }, 650);
  };

  return (
    <AuthShell
      footer={
        <View style={styles.accountPrompt}>
          <Text style={styles.accountPromptText}>New to Saan Tayo?</Text>
          <Pressable
            accessibilityLabel="Create an account"
            accessibilityRole="link"
            hitSlop={8}
            onPress={() => router.replace('/auth/sign-up')}
          >
            <Text style={styles.accountPromptLink}>Create account</Text>
          </Pressable>
        </View>
      }
      subtitle="Pick up where your barkada left off."
      title="Welcome back"
    >
      <View style={styles.fields}>
        <AuthField
          autoCapitalize="none"
          autoComplete="email"
          error={errors.email}
          icon="email"
          keyboardType="email-address"
          label="Email"
          onChangeText={(value) => {
            setEmail(value);
            if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
          }}
          placeholder="you@example.com"
          returnKeyType="next"
          textContentType="emailAddress"
          value={email}
        />
        <AuthField
          autoCapitalize="none"
          autoComplete="current-password"
          error={errors.password}
          label="Password"
          onChangeText={(value) => {
            setPassword(value);
            if (errors.password) {
              setErrors((current) => ({ ...current, password: undefined }));
            }
          }}
          onSubmitEditing={handleLogin}
          placeholder="Enter your password"
          returnKeyType="done"
          secure
          textContentType="password"
          value={password}
        />
        <Pressable
          accessibilityRole="link"
          hitSlop={8}
          onPress={() => router.push('/auth/forgot-password')}
          style={({ pressed }) => [
            styles.forgotPassword,
            pressed && styles.linkPressed,
          ]}
        >
          <Text style={styles.forgotPasswordLabel}>Forgot password?</Text>
        </Pressable>
      </View>

      <AuthPrimaryButton
        label="Log in"
        loading={submitting}
        onPress={handleLogin}
      />
      <SocialAuthOptions />
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  accountPrompt: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  accountPromptLink: {
    color: colors.authText,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 21,
    textDecorationColor: colors.splashAccentPressed,
    textDecorationLine: 'underline',
  },
  accountPromptText: {
    color: colors.authMuted,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 21,
  },
  fields: {
    gap: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  forgotPasswordLabel: {
    color: colors.authText,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  linkPressed: {
    opacity: 0.58,
  },
});
