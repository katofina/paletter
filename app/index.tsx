import { Dimensions, ScrollView, StyleSheet } from "react-native";
import randomColor from "randomcolor";
import Card from "./components/CardColor";
import React, { useEffect, useRef, useState } from "react";

function getColor() {
  return randomColor({
    luminosity: "light",
    hue: "random",
  });
}

export default function Palette() {
  const [count, setCount] = useState(2);
  const box_height = useRef(0);

  useEffect(() => {
    let { height } = Dimensions.get("window");
    box_height.current = height / count;
  }, [count]);

  return (
    <ScrollView style={style.container}>
      <Card color={getColor()} box_height={box_height.current} />
      <Card color={getColor()} box_height={box_height.current} />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
  },
});
