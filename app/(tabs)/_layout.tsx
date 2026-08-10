import { Tabs } from 'expo-router';

export default function TabLayout() {
  return <Tabs initialRouteName="discover" screenOptions={{ headerShown: false }} />;
}
