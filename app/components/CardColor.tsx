import React from "react";
import { View, Text, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Panel from "./Panel";
import { useDispatch } from "react-redux";
import colorState from "../redux/ColorSlice";
import getColor from "../functions/getColor";

interface Prop {
  color: string;
  box_height: number;
  index: number;
}

export default function Card({ color, box_height, index }: Prop) {
  const dispatch = useDispatch();

  return (
    <View
      style={{
        backgroundColor: color,
        height: box_height,
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 0,
        flexDirection: "row",
      }}
    >
      <Text>{color}</Text>
      <Panel />
      <Pressable
        style={style.buttonAdd}
        onPress={() => {
          const color = getColor();
          dispatch(colorState.actions.setColor({ color: color, index: index }));
        }}
      >
        <Text style={style.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  buttonAdd: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    width: 25,
  },
  buttonText: {
    textAlign: "center",
    verticalAlign: "middle",
  },
});
