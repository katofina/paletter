import { Dimensions, FlatList, SafeAreaView, StyleSheet } from "react-native";
import Card from "./components/CardColor";
import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "./redux/Store";

export default function Palette() {
  const { height } = Dimensions.get("window");
  const colors = useSelector((store: Store) => store.colorState.colors);
  const [boxHeight, setBoxHeight] = useState<number>();

  useEffect(() => {
    setBoxHeight(height / colors.length);
  }, [colors]);

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={colors}
        renderItem={(item) => (
          <Card
            color={String(item.item.color)}
            box_height={boxHeight}
            index={item.index}
          />
        )}
        key={useId()}
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
