import { AntDesign, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import colorState from "../redux/ColorSlice";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MyTabBar() {
  const dispatch = useDispatch();

  return (
    <View style={style.bottomPanel}>
      <Pressable
        style={style.generate}
        onPress={() => {
          dispatch(colorState.actions.changeColors());
        }}
      >
        <Text>Generate</Text>
      </Pressable>
      <TouchableOpacity
        onPress={() => dispatch(colorState.actions.cancelColors())}
      >
        <Ionicons name="return-up-back-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(colorState.actions.forwardColors())}
      >
        <Ionicons name="return-up-forward-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="save" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  bottomPanel: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
  },
  generate: {
    borderWidth: 1,
    width: "30%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "antiquewhite",
  },
});
