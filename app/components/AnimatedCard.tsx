import { Text, Dimensions, View, Pressable } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import colorState, { ObjectColor } from "../redux/ColorSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "expo-router";

export const windowWidth = Dimensions.get("window").width;
export const widthStory = Dimensions.get("window").width * 0.8;
export const heightStory = (widthStory / 3) * 4;

interface Prop {
  arr: ObjectColor[];
  index: number;
  scrollOffset: SharedValue<number>;
}

export default function AnimatedCard({ arr, index, scrollOffset }: Prop) {
  const dispatch = useDispatch();
  const naviagtion = useNavigation();
  const reanimContStyle = useAnimatedStyle(() => {
    const activeIndex = scrollOffset.value / widthStory;
    const paddingLeft = (windowWidth - widthStory) / 4;

    const translateX = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [120, 60, 0, -widthStory - paddingLeft * 2],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      activeIndex,
      [index - 2, index - 1, index, index + 1],
      [0.8, 0.9, 1, 1],
      Extrapolation.CLAMP,
    );

    return {
      left: paddingLeft,
      transform: [
        {
          translateX: scrollOffset.value + translateX,
        },
        { scale },
      ],
    };
  });
  console.log(reanimContStyle);

  function goToPalette() {
    dispatch(colorState.actions.setArray(arr));
    naviagtion.navigate("index" as never);
    console.log("df");
  }

  return (
    <Animated.View style={[{ zIndex: -index }, reanimContStyle]}>
      <Pressable onPress={goToPalette}>
        <View
          style={{
            height: heightStory,
            width: widthStory,
            position: "absolute",
          }}
        >
          {arr.map((item, index) => {
            return (
              <View
                style={{
                  backgroundColor: item.color,
                  height: heightStory / arr.length,
                  width: widthStory,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                key={index}
              >
                <Text style={{ fontSize: 15 }}>{item.color}</Text>
              </View>
            );
          })}
        </View>
      </Pressable>
    </Animated.View>
  );
}
