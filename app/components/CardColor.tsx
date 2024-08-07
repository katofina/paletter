import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
          justifyContent: "center",
          alignItems: "center",
          zIndex: 0,
        }}
      >
        <Text>{color}</Text>
        <Panel/>
        <TouchableOpacity 
            style={style.buttonAdd}
            onPress={() => {
              const color = getColor();
              dispatch(colorState.actions.setColor({color: color, index: index}));
            }}
            >
              <Text style={style.buttonText}>
                +
              </Text>
        </TouchableOpacity>
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
    width: 25
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
  }
});
