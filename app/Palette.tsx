import Card from "./components/CardColor";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "./redux/Store";
import MyTabBar from "./components/MyTabBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colorState from "./redux/ColorSlice";
import getBoxHeight from "./functions/getBoxHeight";
import { FlatList, View } from "react-native";
import { DragArea } from "./components/DragArea";
import { useHeaderHeight } from "@react-navigation/elements";

export default function Palette() {
  const dispatch = useDispatch();
  const colors = useSelector((store: Store) => store.colorState.colors);
  console.log(colors);

  const Height = getBoxHeight(colors.length);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    dispatch(colorState.actions.pushColors());
  }, []);

  const updateList = (id: string, y: number, index: number) => {
    const newIndex = Math.ceil((y - headerHeight) / Height);
    if (newIndex !== index && newIndex >= 0 && index >= 0) {
      const newArr = [...colors];
      const moveItem = colors[newIndex];
      newArr[index] = moveItem;
      newArr[newIndex] = colors.find((item) => item.id === id)!;
      dispatch(colorState.actions.setArray(newArr));
      console.log('dispatch');
    }
  };

  if (colors)
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DragArea box_height={Height} colors={colors} onUpdate={updateList}>
          <FlatList
            style={{ backgroundColor: "white" }}
            data={colors}
            renderItem={({ item }) => (
              <Card
                id={item.id}
                color={String(item.color)}
                box_height={Height}
                index={colors.indexOf(item)}
                lock={item.locked}
              />
            )}
            CellRendererComponent={({ children }) => <View>{children}</View>}
            keyExtractor={(item) => item.id}
          />
        </DragArea>
        <MyTabBar colors={colors} />
      </GestureHandlerRootView>
    );
}
