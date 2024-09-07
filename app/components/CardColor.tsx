import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Panel from "./Panel";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch, useSelector } from "react-redux";
import colorState from "../redux/ColorSlice";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import DialogModule from "@/modules/dialog/src/DialogModule";
import { Store } from "../redux/Store";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useHeaderHeight } from "@react-navigation/elements";
import dragState from "../redux/DraggingSlice";
interface Prop {
  color: string;
  box_height: number;
  index: number;
  lock: boolean;
  drag?: () => void;
  id: string;
}

export default function Card({
  drag,
  color,
  box_height,
  index,
  lock,
  id,
}: Prop) {
  const dispatch = useDispatch();
  const dragY = useSelector((store: Store) => store.dragState.dragY);
  const draggingId = useSelector((store: Store) => store.dragState.id);

  const installDragging = () => {
    dispatch(dragState.actions.setId(id));
  };

  const headerHeight = useHeaderHeight();

  const marginTop = useSharedValue(0);
  useAnimatedReaction(
    () => dragY,
    (newDragY) => {
      if (dragY == undefined) {
        marginTop.value = 0;
      }

      const item = index * box_height - box_height;

      if (index === 0 && newDragY! < item + box_height) {
        marginTop.value = withTiming(box_height);
      }

      marginTop.value = withTiming(
        newDragY! >= item && newDragY! < item + box_height ? box_height : 0,
      );
    },
  );

  useEffect(() => {
    const item = index * box_height + headerHeight;
    if (draggingId) {
      marginTop.value =
        dragY! >= item && dragY! < item + box_height ? box_height : 0;
    } else {
      marginTop.value = 0;
    }
  }, [draggingId]);

  const styles = getStyles(color, box_height);

  if (draggingId === id) return <Animated.View style={{ marginTop }} />;

  return (
    <Animated.View style={{ marginTop }}>
      <Swipeable
        renderRightActions={() => (
          <View style={styles.container}>
            <AntDesign
              name="delete"
              size={24}
              color="black"
              style={styles.icon}
            />
          </View>
        )}
        onSwipeableRightOpen={() => {
          DialogModule.show(
            "Delete",
            "Are you sure you want to delete this color?",
            "Yes",
            "No",
          ).then((val: boolean) => {
            if (val === true) dispatch(colorState.actions.deleteColor(index));
          });
        }}
        renderLeftActions={() => (
          <Panel index={index} lock={lock} drag={drag} id={id} />
        )}
      >
        <View style={styles.card}>
          <Pressable onPressIn={installDragging}>
            <FontAwesome
              style={styles.changeButton}
              name="exchange"
              size={24}
              color="black"
            />
          </Pressable>
          <Text style={styles.colorText}>{color}</Text>
        </View>
      </Swipeable>
    </Animated.View>
  );
}

const getStyles = (color: string, box_height: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: "red",
      justifyContent: "center",
      width: "100%",
      alignItems: "flex-end",
    },
    card: {
      backgroundColor: color,
      justifyContent: "space-evenly",
      alignItems: "center",
      zIndex: 0,
      flexDirection: "row",
      height: box_height,
    },
    colorText: {
      fontSize: 20,
    },
    icon: { marginRight: 10 },
    changeButton: {
      transform: "rotate(90deg)",
    },
  });
