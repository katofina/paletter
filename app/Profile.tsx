import { useEffect, useState } from "react";

import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "./redux/Store";
import { View, Text } from "react-native";
import { ObjectColor } from "./redux/ColorSlice";
import Animated, {
  AnimatedRef,
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import AnimatedCard, {
  heightStory,
  widthStory,
  windowWidth,
} from "./components/AnimatedCard";

export default function Profile() {
  const [arrColors, setArrColors] = useState<Array<Array<ObjectColor>>>([]);
  const [text, setText] = useState("Loading");
  const email = useSelector((store: Store) => store.authState.email);
  let itemsRef = database().ref(email!);
  const animRef: AnimatedRef<Animated.ScrollView> = useAnimatedRef(); //runOnUI
  const scrollOffset = useScrollViewOffset(animRef);
  const padding = windowWidth - widthStory;

  useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      if (data) {
        const items = Object.values(data);
        setArrColors(items as ObjectColor[][]);
      } else setText("There are no saved palettes yet.");
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {arrColors.length ? null : <Text>{text}</Text>}
      <View
        style={{
          height: heightStory,
          width: widthStory,
        }}
      >
        <Animated.ScrollView
          horizontal
          ref={animRef}
          snapToInterval={widthStory}
          decelerationRate={"fast"}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          disableIntervalMomentum
          contentContainerStyle={{
            width: widthStory * arrColors.length + padding,
          }}
        >
          {arrColors.map((arr, index) => {
            return (
              <AnimatedCard
                key={index}
                arr={arr}
                index={index}
                scrollOffset={scrollOffset}
              />
            );
          })}
        </Animated.ScrollView>
      </View>
    </View>
  );
}
