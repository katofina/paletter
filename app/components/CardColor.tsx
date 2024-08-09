import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import Panel from "./Panel";
import { useDispatch } from "react-redux";

interface Prop {
  color: string;
  box_height: number | undefined;
  index: number;
  lock: boolean;
}

export default function Card({ color, box_height, index, lock }: Prop) {
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
      <Text style={style.colorText}>{color}</Text>
      <Panel color={color} index={index} lock={lock} />
    </View>
  );
}

const style = StyleSheet.create({
  colorText: {
    fontSize: 20,
  },
});
