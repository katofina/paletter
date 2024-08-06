import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

interface Prop {
  color: string;
  box_height: number;
}

export default function Card({ color, box_height }: Prop) {
  return (
    <>
      <View
        style={{
          backgroundColor: color,
          height: box_height,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 0,
        }}
      >
        <TouchableOpacity style={style.buttonAdd}>+</TouchableOpacity>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  buttonAdd: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 50,
    fontSize: 40,
    position: "absolute",
    bottom: 0,
  },
});
