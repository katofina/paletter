import React, { Children } from "react";
import { ListRenderItemInfo, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

interface Prop {
  color: string;
  box_height: number;
  children: React.JSX.Element
}

export default function Card({ color, box_height, children }: Prop) {
  console.log(color);
  return (
    <>
      <View
        style={{
          backgroundColor: color,
          height: box_height,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 0,
        }}
      >
        {children}
      </View>
    </>
  );
}

const style = StyleSheet.create({
});
