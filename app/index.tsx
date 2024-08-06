import { Dimensions, FlatList, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import randomColor from "randomcolor";
import Card from "./components/CardColor";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Text } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

function getColor() {
  return randomColor({
    luminosity: "light",
    hue: "random",
  });
}

const { height } = Dimensions.get("window");

export default function Palette() {
  const [colors, setColors] = useState([getColor(), getColor()]);
  const box_height = useRef(height / colors.length);

  function addColor(index: number) {
    const color = getColor();
    const arrBefore = [];
    const arrAfter = [];
    const pivot = getColor();
    for (let i = 0; i < index + 1; i++) {
      arrBefore.push(colors[i]);
    };
    for (let i = index + 1; i < colors.length; i++) {
      arrAfter.push(colors[i]);
    };
    setColors(arrBefore.concat(pivot, arrAfter));
  };

  useLayoutEffect(() => {
    box_height.current = height / colors.length;
  }, [colors]);
//редакс сохранять цвет и оттуда делать лист который будет рендерить кард с цветом в редаксе
  if(box_height)
  return (
    <ScrollView style={style.container}>
      <FlatList 
        data={colors}
        renderItem={(item) =>       
        <Card 
          color={String(item.item)}
          box_height={box_height.current}
          children={
            <TouchableOpacity 
            style={style.buttonAdd}
            onPress={() => {addColor(item.index)}}
            >
              <Text style={style.buttonText}>
                +
              </Text>
            </TouchableOpacity>
          }
        />}
      />
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
  },
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
