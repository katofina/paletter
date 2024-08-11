import { useEffect, useState } from "react";

import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { Store } from "./redux/Store";
import { View, FlatList, ScrollView, Dimensions } from "react-native";
import { ObjectColor } from "./redux/ColorSlice";

export default function Profile() {
  const [arrColors, setArrColors] = useState<Array<Array<ObjectColor>>>([]);
  const email = useSelector((store: Store) => store.authState.email);
  let itemsRef = database().ref(email!);

  useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let data = snapshot.val();
      const items = Object.values(data);
      console.log(items);
      setArrColors(items as ObjectColor[][]);
    });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <FlatList
        data={arrColors}
        renderItem={({ item }) => (
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
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: item.color,
                    width: (Dimensions.get("window").width - 10) / 5,
                    height: "100%",
                  }}
                ></View>
              )}
            />
          </View>
        )}
      />
    </ScrollView>
  );
}
