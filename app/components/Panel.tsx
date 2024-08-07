import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function Panel() {
  return (
    <View style={style.buttonPanel}>
      <TouchableOpacity>
        <AntDesign name="delete" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="save" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="save" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="lock" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <AntDesign name="unlock" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  buttonPanel: {
    flexDirection: "row",
  },
});
