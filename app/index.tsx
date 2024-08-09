import { Dimensions, FlatList, SafeAreaView, StyleSheet } from "react-native";
import Card from "./components/CardColor";
import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { Store } from "./redux/Store";
import { NativeModules } from 'react-native';
import MyTabBar from "./components/MyTabBar";

export default function Palette() {
  const colors = useSelector((store: Store) => store.colorState.colors);
  const [boxHeight, setBoxHeight] = useState<number>();

  useEffect(() => {
    const { height } = Dimensions.get("window");
    const { StatusBarManager } = NativeModules;
    setBoxHeight((height - StatusBarManager.HEIGHT-50) / colors.length);
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
      />
      <MyTabBar/>
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
