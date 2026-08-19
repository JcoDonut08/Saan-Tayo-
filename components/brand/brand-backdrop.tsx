import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export function BrandBackdrop() {
  return (
    <>
      <Image
        accessible={false}
        contentFit="cover"
        importantForAccessibility="no"
        pointerEvents="none"
        source={require('@/assets/images/splash-pattern.png')}
        style={styles.pattern}
        transition={0}
      />
      <View pointerEvents="none" style={styles.scrim} />
    </>
  );
}

const styles = StyleSheet.create({
  pattern: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
});
