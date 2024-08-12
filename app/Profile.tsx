import { useEffect, useState } from "react";

import database from "@react-native-firebase/database";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "./redux/Store";
import {
  View,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import colorState, { ObjectColor } from "./redux/ColorSlice";
import { useNavigation } from "expo-router";

export default function Profile() {
  const [arrColors, setArrColors] = useState<Array<Array<ObjectColor>>>([]);
  const email = useSelector((store: Store) => store.authState.email);
  let itemsRef = database().ref(email!);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      setArrColors(items as ObjectColor[][]);
    });
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <FlatList
        data={arrColors}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback
            onPress={() => {
              dispatch(colorState.actions.setArray(item));
              navigate.navigate("index" as never);
            }}
          >
            <View
              style={{
                width: Dimensions.get("window").width - 10,
                height: 100,
                borderWidth: 1,
                margin: 5,
              }}
            >
              <FlatList
                horizontal={true}
                data={item}
                renderItem={(thing) => (
                  <View
                    style={{
                      backgroundColor: thing.item.color,
                      width:
                        (Dimensions.get("window").width - 10) / item.length,
                      height: "100%",
                    }}
                  ></View>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </SafeAreaView>
  );
}
