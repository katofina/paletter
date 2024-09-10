import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import Panel from "./Panel";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useDispatch } from "react-redux";
import colorState from "../redux/ColorSlice";
import { AntDesign } from "@expo/vector-icons";
import DialogModule from "@/modules/dialog/src/DialogModule";
interface Prop {
  color: string;
  box_height: number | undefined;
  index: number;
  lock: boolean;
  drag: () => void;
}

export default function Card({ drag, color, box_height, index, lock }: Prop) {
  const dispatch = useDispatch();

  return (
    <Swipeable
      renderRightActions={() => (
        <View
          style={{
            backgroundColor: "red",
            justifyContent: "center",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <AntDesign
            name="delete"
            size={24}
            color="black"
            style={{ marginRight: 10 }}
          />
        </View>
      )}
      onSwipeableRightOpen={() => {
        DialogModule.show(
          "Delete",
          "Are you sure you want to delete this color?",
          "Yes",
          "No",
        )
          .then((val: boolean) => {
            if (val === true) dispatch(colorState.actions.deleteColor(index));
          })
          .catch((error: Error) => {
            console.error(error);
            dispatch(colorState.actions.deleteColor(index));
          });
      }}
      renderLeftActions={() => (
        <Panel color={color} index={index} lock={lock} drag={drag} />
      )}
    >
      <View
        style={{
          backgroundColor: color,
          justifyContent: "space-around",
          alignItems: "center",
          zIndex: 0,
          flexDirection: "row",
          height: box_height,
        }}
      >
        <Text style={style.colorText}>{color}</Text>
      </View>
    </Swipeable>
  );
}

const style = StyleSheet.create({
  colorText: {
    fontSize: 20,
  },
});
