import { useEffect } from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { withTiming } from "react-native-reanimated";

interface Props {
  text: string;
  color: string;
  isActivate: boolean;
  setIsActivate: (isActivate: boolean) => void;
  delay: number;
}

export const Hint = ({ text, color, isActivate, setIsActivate, delay }: Props) => {
  const width = useWindowDimensions().width;

  const anim = useSharedValue(width);

  useEffect(() => {
    if (isActivate) {
      anim.value = withSpring(20);
      setTimeout(() => setIsActivate(false), delay)
    } else {
      anim.value = withTiming(width);
    }
  }, [isActivate]);

  const styles = getStyles(color);

  return (
    <Animated.View style={[styles.container, { right: anim }]}>
      <View style={styles.subContainer}>
        <View style={styles.color} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </Animated.View>
  );
};

const getStyles = (color: string) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: "7%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 20,
      maxHeight: 100,
      minHeight: 50,
    },
    subContainer: {
      height: "100%",
      width: "80%",
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
    },
    color: {
      width: 10,
      backgroundColor: color,
      height: "100%",
    },
    text: {
      marginLeft: 20,
    },
  });
