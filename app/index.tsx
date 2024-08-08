import { Dimensions, FlatList, SafeAreaView, StyleSheet } from "react-native";
import Card from "./components/CardColor";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Store } from "./redux/Store";

const { height } = Dimensions.get("window");

export default function Palette() {
  const colors = useSelector((store: Store) => store.colorState.colors);
  const box_height = useRef(height / colors.length);

  useEffect(() => {
    box_height.current = height / colors.length;
  }, [colors]);

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={colors}
        renderItem={(item) => (
          <Card
            color={String(item.item)}
            box_height={box_height.current}
            index={item.index}
          />
        )}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
  },
});
