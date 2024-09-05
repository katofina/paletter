import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import { DragItem } from "./DragItem";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useSharedValue } from "react-native-reanimated";
import { ObjectColor } from "../redux/ColorSlice";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../redux/Store";
import dragState from "../redux/DraggingSlice";
import { PropsWithChildren, useEffect } from "react";

const windowHeight = Dimensions.get("window").height;
const bottomBarHeight = 50;

interface Props extends PropsWithChildren {
  box_height: number;
  colors: ObjectColor[];
  onUpdate: (id: string, y: number, index: number) => void;
}

export const DragArea = ({ box_height, colors, onUpdate, children }: Props) => {
  const id = useSelector((store: Store) => store.dragState.id);
  const dispatch = useDispatch();

  const dragY = useSharedValue(0);

  const headerHeight = useHeaderHeight();
  const heightContainer = windowHeight - headerHeight - bottomBarHeight;
  const str = id ? colors.find((item) => item.id === id)!.color : "";

  const index = colors.map((item) => item.id).indexOf(id!);
  const position = index * box_height + headerHeight - box_height / 2;

  useEffect(() => {
    if (id) {
      dragY.value = position;
      dispatch(dragState.actions.setDragY(dragY.value));
    }
  }, [id]);

  const changeDargY = () => {
    dispatch(dragState.actions.setDragY(dragY.value));
  };

  const setNullId = () => {
    dispatch(dragState.actions.setId(null));
    dispatch(dragState.actions.setDragY(undefined));
  };

  const pan = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((event, stateManager) => {
      stateManager.activate();
    })
    .onChange((event) => {
      if (id) {
        dragY.value = dragY.value + event.changeY;
        runOnJS(changeDargY)();
      }
    })
    .onFinalize(() => {
      runOnJS(setNullId)();
      runOnJS(onUpdate)(id!, dragY.value, index);
    });

  const styles = getStyles(heightContainer, dragY);
  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        {children}
        <Animated.View style={styles.animated}>
          {id && <DragItem color={str} box_height={box_height} />}
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

const getStyles = (heightContainer: number, dragY) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      zIndex: 10,
      top: 0,
      left: 0,
      backgroundColor: "rgba(100,100,100, 0)",
      height: heightContainer,
    },
    animated: {
      position: "absolute",
      top: dragY,
      left: 0,
      width: "100%",
    },
  });
