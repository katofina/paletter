import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { withRepeat } from "react-native-reanimated";
import {
  StyleProp,
  ViewStyle,
} from "react-native";
import { useEffect } from "react";

interface Props {
  style: StyleProp<ViewStyle>;
  index: number;
  isLoading: boolean;
}

const arr = [
  "#65e0cc",
  "#bbf2e9",
  "#63E2CD",
  "#B2F1E6",
  "#89E9D9",
  "#9CE9DC",
  "#75E6D3",
  "#C1F0E8",
];

export const AnimView = ({ style, index, isLoading }: Props) => {
  const arrBefore = arr.slice(0, index);
  const arrAfter = arr.slice(index);
  const needableArr = arrAfter.concat(arrBefore);
  const backgroundColor = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const interpolatedColor = interpolateColor(
      backgroundColor.value,
      [...Array(needableArr.length).keys()],
      needableArr,
    );

    return {
      backgroundColor: interpolatedColor,
    };
  });

  useEffect(() => {
    if (isLoading) {
      backgroundColor.value = withRepeat(withTiming(needableArr.length - 1, {
      duration: 3000, easing: Easing.linear
    }), -1, false);
    } else {
      backgroundColor.value = withTiming(0, {
        duration: 1000,
        easing: Easing.linear
      });
    }
  }, [isLoading]);

  return <Animated.View style={[style, animatedStyle]} />;
};
