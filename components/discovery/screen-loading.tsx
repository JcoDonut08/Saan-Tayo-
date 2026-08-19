import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/colors';

export function ScreenLoading() {
  return <View style={styles.screen} />;
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.contentBackground,
    flex: 1,
  },
});
