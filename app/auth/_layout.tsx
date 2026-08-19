import { useRouter } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useReducedMotion } from 'react-native-reanimated';

import { AppBackButton } from '@/components/navigation/app-back-button';
import { colors } from '@/constants/colors';

export default function AuthLayout() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  };

  return (
    <Stack
      screenOptions={{
        animation: reduceMotion ? 'none' : 'fade',
        animationDuration: reduceMotion ? 0 : 160,
        contentStyle: { backgroundColor: colors.splashBackground },
        gestureEnabled: true,
        headerBackVisible: false,
        headerLeft: () => (
          <AppBackButton
            accessibilityHint="Returns to the previous screen"
            onPress={handleBack}
          />
        ),
        headerShadowVisible: false,
        headerStyle: { backgroundColor: 'transparent' },
        headerTintColor: colors.splashForeground,
        headerTitle: '',
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Log in' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Create account' }} />
      <Stack.Screen
        name="forgot-password"
        options={{ title: 'Reset password' }}
      />
    </Stack>
  );
}
