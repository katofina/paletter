import { View, StyleSheet } from "react-native";
import { AnimView } from "./AnimView";

interface Prop {
  isLoading: boolean;
  height: number;
  width: number;
};

export const Loader = ({ isLoading, height, width }: Prop) => {
  
  const styles = getStyles(height, width);

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <View>
        <AnimView style={styles.animView} isLoading={isLoading} index={0}/>
      </View>
      <View style={[styles.viewRow, styles.transformHalfHeight]}>
        <AnimView isLoading={isLoading} index={1} style={[styles.transformMinus45, styles.animView]} />
        <AnimView isLoading={isLoading} index={2} style={[styles.transform45, styles.animView]} />
      </View>
      <View style={[styles.gapView, styles.transformHalfHeight]}>
        <AnimView isLoading={isLoading} index={3} style={[styles.transform90, styles.animView]} />
        <AnimView isLoading={isLoading} index={4} style={[styles.transform90, styles.animView]} />
      </View>
      <View style={[styles.viewRow, styles.transformHalfHeight]}>
        <AnimView isLoading={isLoading} index={5} style={[styles.transform45, styles.animView]} />
        <AnimView isLoading={isLoading} index={6} style={[styles.transformMinus45, styles.animView]} />
      </View>
      <View>
        <AnimView isLoading={isLoading} index={7} style={[styles.transformAllHeight, styles.animView]} />
      </View>
    </View>
  );
};

const getStyles = (height: number, width: number) => StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
      animView: {
      borderRadius: 20,
      height: height,
      marginLeft: 5,
        width: width,
    },
  viewRow: {
    flexDirection: "row",
    gap: height,
  },
  gapView: {
    flexDirection: "row",
    gap: height * 2,
  },
  transformHalfHeight: {
    transform: [{ translateY: -height / 2 }],
  },
      transformMinus45: {
      transform: [{ rotate: "-45deg" }],
    },
    transform45: {
      transform: [{ rotate: "45deg" }],
    },
    transform90: {
      transform: [{ rotate: "90deg" }],
    },
    transformAllHeight: {
      transform: [{ translateY: -height }],
    },
});
