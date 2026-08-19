import {
  Pressable,
  StyleSheet,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type SmoothPressableProps = PressableProps & {
  containerStyle?: StyleProp<ViewStyle>;
};

export function SmoothPressable({
  containerStyle,
  disabled,
  onPressIn,
  onPressOut,
  ...pressableProps
}: SmoothPressableProps) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[styles.container, containerStyle, animatedStyle]}
    >
      <Pressable
        {...pressableProps}
        disabled={disabled}
        onPressIn={(event) => {
          cancelAnimation(scale);
          scale.value = reduceMotion
            ? 1
            : withTiming(0.975, {
                duration: 100,
                easing: Easing.out(Easing.cubic),
              });
          onPressIn?.(event);
        }}
        onPressOut={(event) => {
          cancelAnimation(scale);
          scale.value = reduceMotion
            ? 1
            : withTiming(1, {
                duration: 180,
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              });
          onPressOut?.(event);
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
});
