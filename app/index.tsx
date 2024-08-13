import { StyleSheet, View } from "react-native";
import Card from "./components/CardColor";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "./redux/Store";
import MyTabBar from "./components/MyTabBar";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colorState from "./redux/ColorSlice";
import getBoxHeight from "./functions/getBoxHeight";

export default function Palette() {
  const dispatch = useDispatch();
  const colors = useSelector((store: Store) => store.colorState.colors);
  function onMoveEnd({ data }: any) {
    dispatch(colorState.actions.setArray(data));
  }

  useEffect(() => {
    dispatch(colorState.actions.pushColors());
  }, []);

  if (colors)
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 0.93}}>
          <DraggableFlatList
            data={colors}
            renderItem={({ item, drag }) => (
              <Card
                drag={drag}
                color={String(item.color)}
                box_height={getBoxHeight(colors.length)}
                index={colors.indexOf(item)}
                lock={item.locked}
              />
            )}
            keyExtractor={(item) => item.id}
            onDragEnd={onMoveEnd}
          />
        </View>
        <View style={{flex: 0.07}}>
          <MyTabBar colors={colors} />
        </View>
      </GestureHandlerRootView>
    );
}

const style = StyleSheet.create({});
