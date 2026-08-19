import { Stack } from 'expo-router/stack';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useReducedMotion } from 'react-native-reanimated';

import { colors } from '@/constants/colors';
import { useAppStore } from '@/stores/app-store';
import { useDiscoveryStore } from '@/stores/discovery-store';

export default function RootLayout() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    void useAppStore.getState().hydrate();
    void useDiscoveryStore.getState().hydrate();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          animation: reduceMotion ? 'none' : 'fade',
          animationDuration: reduceMotion ? 0 : 180,
          contentStyle: { backgroundColor: colors.splashBackground },
          gestureEnabled: true,
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen
          name="preferences/index"
          options={{
            headerBackTitle: 'Discover',
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.contentBackground },
            headerTintColor: colors.contentForeground,
            title: 'Smart Match',
          }}
        />
        <Stack.Screen
          name="results/index"
          options={{
            headerBackTitle: 'Preferences',
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.contentBackground },
            headerTintColor: colors.contentForeground,
            title: 'Matches',
          }}
        />
        <Stack.Screen
          name="place/[id]"
          options={{
            headerBackTitle: 'Back',
            headerShown: true,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: colors.contentBackground },
            headerTintColor: colors.contentForeground,
            title: 'Place details',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
