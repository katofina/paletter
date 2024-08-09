import { Dimensions, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import Card from "./components/CardColor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "./redux/Store";
import { NativeModules } from "react-native";
import MyTabBar from "./components/MyTabBar";
import DraggableFlatList, {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colorState from "./redux/ColorSlice";

export default function Palette() {
  const dispatch = useDispatch();
  const colors = useSelector((store: Store) => store.colorState.colors);
  const [boxHeight, setBoxHeight] = useState<number>();
  function onMoveEnd({ data }: any) {
    dispatch(colorState.actions.setArray(data));
  }

  useEffect(() => {
    const { height } = Dimensions.get("window");
    const { StatusBarManager } = NativeModules;
    setBoxHeight((height - StatusBarManager.HEIGHT - 50) / colors.length);
  }, [colors]);

  return (
    <GestureHandlerRootView>
      <NestableScrollContainer style={style.container}>
        <NestableDraggableFlatList
          data={colors}
          renderItem={({ item, drag }) => (
            <Card
              drag={drag}
              color={String(item.color)}
              box_height={boxHeight}
              index={colors.indexOf(item)}
              lock={item.locked}
            />
          )}
          keyExtractor={(item) => item.id}
          onDragEnd={onMoveEnd}
        />
      </NestableScrollContainer>
      <MyTabBar />
    </GestureHandlerRootView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 0,
  },
});
