import { Pressable, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as Clipboard from "expo-clipboard";
import colorState from "../redux/ColorSlice";
interface Prop {
  color: string;
  index: number;
  lock: boolean;
}

export default function Panel({ color, index, lock }: Prop) {
  const dispatch = useDispatch();

  async function copyColor() {
    await Clipboard.setStringAsync(color);
  }

  return (
    <View style={style.buttonPanel}>
      <Pressable>
        <FontAwesome
          style={style.changeButton}
          name="exchange"
          size={24}
          color="black"
        />
      </Pressable>
      <Pressable onPress={copyColor}>
        <FontAwesome name="copy" size={24} color="black" />
      </Pressable>
      {lock ? (
        <Pressable
          onPress={() =>
            dispatch(colorState.actions.setLock({ index, lock: false }))
          }
        >
          <AntDesign name="lock" size={24} color="black" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() =>
            dispatch(colorState.actions.setLock({ index, lock: true }))
          }
        >
          <AntDesign name="unlock" size={24} color="black" />
        </Pressable>
      )}
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
