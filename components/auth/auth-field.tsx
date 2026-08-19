import { Eye, EyeOff, Mail, UserRound } from 'lucide-react-native';
import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { colors } from '@/constants/colors';

type AuthFieldProps = TextInputProps & {
  error?: string;
  hint?: string;
  icon?: 'email' | 'username';
  label: string;
  secure?: boolean;
};

export function AuthField({
  error,
  hint,
  icon,
  label,
  onBlur,
  onFocus,
  secure = false,
  ...inputProps
}: AuthFieldProps) {
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const iconColor = error
    ? colors.authError
    : focused
      ? colors.splashAccentPressed
      : colors.authMuted;

  return (
    <View style={styles.group}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputFrame,
          focused && styles.inputFrameFocused,
          error && styles.inputFrameError,
        ]}
      >
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          cursorColor={colors.splashAccentPressed}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          placeholderTextColor={colors.authFieldPlaceholder}
          secureTextEntry={secure && !revealed}
          selectionColor={colors.splashAccent}
          style={[styles.input, icon && styles.inputWithTrailingIcon]}
        />

        {icon ? (
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={styles.trailingIcon}
          >
            {icon === 'email' ? (
              <Mail color={iconColor} size={20} strokeWidth={2.1} />
            ) : (
              <UserRound color={iconColor} size={20} strokeWidth={2.1} />
            )}
          </View>
        ) : null}

        {secure ? (
          <Pressable
            accessibilityLabel={revealed ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setRevealed((current) => !current)}
            style={({ pressed }) => [
              styles.visibilityButton,
              pressed && styles.visibilityButtonPressed,
            ]}
          >
            {revealed ? (
              <EyeOff color={colors.authMuted} size={20} strokeWidth={2.1} />
            ) : (
              <Eye color={colors.authMuted} size={20} strokeWidth={2.1} />
            )}
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: colors.authError,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  group: {
    gap: 6,
  },
  hint: {
    color: colors.authMuted,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 18,
  },
  input: {
    color: colors.authText,
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    minHeight: 50,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  inputFrame: {
    alignItems: 'center',
    backgroundColor: colors.authField,
    borderColor: colors.authFieldBorder,
    borderCurve: 'continuous',
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 52,
    overflow: 'hidden',
  },
  inputFrameError: {
    borderColor: colors.authError,
  },
  inputFrameFocused: {
    borderColor: colors.splashAccentPressed,
    borderWidth: 2,
  },
  inputWithTrailingIcon: {
    paddingRight: 9,
  },
  label: {
    color: colors.authText,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
  },
  trailingIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 14,
  },
  visibilityButton: {
    alignItems: 'center',
    borderRadius: 999,
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
  },
  visibilityButtonPressed: {
    backgroundColor: 'rgba(23, 24, 22, 0.06)',
  },
});
