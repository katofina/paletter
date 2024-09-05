import { Pressable, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as Clipboard from "expo-clipboard";
import colorState from "../redux/ColorSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
interface Prop {
  color: string;
  index: number;
  lock: boolean;
  drag?: () => void;
  id: string;
}

function showtoast() {
  Toast.show({
    type: "success",
    text1: "Copied to the clipboard",
    visibilityTime: 1500,
  });
}

export default function Panel({ color, index, lock }: Prop) {
  const dispatch = useDispatch();

  async function copyColor() {
    await Clipboard.setStringAsync(color);
  }

  return (
    <View style={style.buttonPanel}>
      <TouchableOpacity
        onPress={() => {
          copyColor();
          showtoast();
        }}
      >
        <FontAwesome name="copy" size={24} color="black" />
      </TouchableOpacity>
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
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "50%",
    backgroundColor: "white",
  },
});
