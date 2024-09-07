import { Pressable, View } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import colorState from "../redux/ColorSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Hint } from "./Hint";
import { useState } from "react";
interface Prop {
  index: number;
  lock: boolean;
  drag?: () => void;
  id: string;
}

export default function Panel({ index, lock }: Prop) {
  const dispatch = useDispatch();

  const [isCoppied, setIsCoppied] = useState(false);

  function copyColor() {
    setIsCoppied(true);
  }

  return (
    <>
    <Hint
        text="Copied to the clipboard"
        color="green"
        isActivate={isCoppied}
        setIsActivate={setIsCoppied}
        delay={2000}
      />
      <View style={style.buttonPanel}>
      <TouchableOpacity onPress={copyColor}>
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
    </>
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
