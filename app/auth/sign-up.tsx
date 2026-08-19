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

type SignUpErrors = {
  email?: string;
  password?: string;
  username?: string;
};

export default function SignUpScreen() {
  const router = useRouter();
  const beginNewAccountIntroduction = useAppStore(
    (state) => state.beginNewAccountIntroduction,
  );
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<SignUpErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(
    () => () => {
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
    },
    [],
  );

  const handleSignUp = () => {
    const nextErrors: SignUpErrors = {};
    const normalizedEmail = email.trim();
    const normalizedUsername = username.trim();

    if (normalizedUsername.length < 2) {
      nextErrors.username = 'Choose a username with at least 2 characters.';
    }

    if (!normalizedEmail) {
      nextErrors.email = 'Enter your email address.';
    } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
      nextErrors.email = 'Enter an email address in the correct format.';
    }

    if (password.length < 8) {
      nextErrors.password = 'Use at least 8 characters for your password.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    navigationTimer.current = setTimeout(() => {
      beginNewAccountIntroduction();
      router.replace('/onboarding');
    }, 650);
  };

  return (
    <AuthShell
      footer={
        <View style={styles.accountPrompt}>
          <Text style={styles.accountPromptText}>Already have an account?</Text>
          <Pressable
            accessibilityLabel="Log in to an existing account"
            accessibilityRole="link"
            hitSlop={8}
            onPress={() => router.replace('/auth/login')}
          >
            <Text style={styles.accountPromptLink}>Log in</Text>
          </Pressable>
        </View>
      }
      subtitle="Save places, compare picks, and plan together."
      title="Create your account"
    >
      <View style={styles.fields}>
        <AuthField
          autoCapitalize="none"
          autoComplete="username"
          error={errors.username}
          icon="username"
          label="Username"
          onChangeText={(value) => {
            setUsername(value);
            if (errors.username) {
              setErrors((current) => ({ ...current, username: undefined }));
            }
          }}
          placeholder="Choose a username"
          returnKeyType="next"
          textContentType="username"
          value={username}
        />
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
          autoComplete="new-password"
          error={errors.password}
          hint="Use 8 or more characters."
          label="Password"
          onChangeText={(value) => {
            setPassword(value);
            if (errors.password) {
              setErrors((current) => ({ ...current, password: undefined }));
            }
          }}
          onSubmitEditing={handleSignUp}
          placeholder="Create a password"
          returnKeyType="done"
          secure
          textContentType="newPassword"
          value={password}
        />
      </View>

      <AuthPrimaryButton
        label="Create account"
        loading={submitting}
        onPress={handleSignUp}
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
});
