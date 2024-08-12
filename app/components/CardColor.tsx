import React, { useState } from "react";
import { View, Text, ViewStyle, StyleProp, ViewProps, Button, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import Panel from "./Panel";
import GestureRecognizer from 'react-native-swipe-gestures';
import { AntDesign } from "@expo/vector-icons";
interface Prop {
  color: string;
  box_height: number | undefined;
  index: number;
  lock: boolean;
  drag: () => void;
}

export default function Card({ drag, color, box_height, index, lock }: Prop) {
  const [display, setDisplay] = useState<any>("none");
  const [justify, setJustify] = useState<any>("center");

  return (
    <GestureRecognizer 
      onSwipeLeft={() => {
        setDisplay("block"); 
        setJustify("space-between");
      }}
      onSwipeRight={() => {
        setDisplay("none");
        setJustify("space-around");
      }}
      config={{
        velocityThreshold: 0.1,
        directionalOffsetThreshold: 30,
      }}
    >
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
        <Pressable>
          {(display === "none") ? (
              <AntDesign name="left" size={24} color="black" />
            ) : (
              <AntDesign name="right" size={24} color="black" />
            )
          }
        </Pressable>
        <View style={{
          display: display,
          width: "60%",
          backgroundColor: "antiquewhite",
          height: "90%",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Panel color={color} index={index} lock={lock} drag={drag} />
        </View>
      </View>
    </GestureRecognizer>
  );
}

const style = StyleSheet.create({
  colorText: {
    fontSize: 20,
  },
});
