import { Tabs } from 'expo-router';
import { Bookmark, Compass, UserRound } from 'lucide-react-native';
import { useReducedMotion } from 'react-native-reanimated';

import { colors } from '@/constants/colors';

export default function TabLayout() {
  const reduceMotion = useReducedMotion();

  return (
    <Tabs
      initialRouteName="discover"
      screenOptions={{
        animation: reduceMotion ? 'none' : 'fade',
        headerShown: false,
        sceneStyle: { backgroundColor: colors.contentBackground },
        tabBarActiveTintColor: colors.splashAccent,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: colors.contentSubtle,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          lineHeight: 14,
        },
        tabBarStyle: {
          backgroundColor: colors.contentSurface,
          borderTopColor: colors.contentBorder,
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          tabBarAccessibilityLabel: 'Discover places',
          tabBarIcon: ({ color, size }) => (
            <Compass color={color} size={size} strokeWidth={2.2} />
          ),
          title: 'Discover',
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarAccessibilityLabel: 'Saved places',
          tabBarIcon: ({ color, size }) => (
            <Bookmark color={color} size={size} strokeWidth={2.2} />
          ),
          title: 'Saved',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarAccessibilityLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <UserRound color={color} size={size} strokeWidth={2.2} />
          ),
          title: 'Profile',
        }}
      />
      <Tabs.Screen name="groups" options={{ href: null }} />
    </Tabs>
  );
}
