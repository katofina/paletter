import { Pressable, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function Panel() {
  return (
    <View style={style.buttonPanel}>
      <Pressable>
        <AntDesign name="delete" size={24} color="black" />
      </Pressable>
      <Pressable>
        <AntDesign name="save" size={24} color="black" />
      </Pressable>
      <Pressable>
        <AntDesign name="save" size={24} color="black" />
      </Pressable>
      <Pressable>
        <AntDesign name="lock" size={24} color="black" />
      </Pressable>
      <Pressable>
        <AntDesign name="unlock" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  buttonPanel: {
    flexDirection: "row",
  },
});
