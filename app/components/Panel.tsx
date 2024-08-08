import { Pressable, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import colorState from "../redux/ColorSlice";

interface Prop {
  index: number;
}

export default function Panel({ index }: Prop) {
  const dispatch = useDispatch();

  return (
    <View style={style.buttonPanel}>
      <Pressable
        onPress={() => dispatch(colorState.actions.deleteColor(index))}
      >
        <AntDesign name="delete" size={24} color="black" />
      </Pressable>
      <Pressable>
        <AntDesign name="heart" size={24} color="black" />
      </Pressable>
      <Pressable>
        <AntDesign name="hearto" size={24} color="black" />
      </Pressable>
      <Pressable>
        <FontAwesome
          style={style.changeButton}
          name="exchange"
          size={24}
          color="black"
        />
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
    justifyContent: "space-between",
    width: "30%",
  },
  changeButton: {
    transform: "rotate(90deg)",
  },
});
