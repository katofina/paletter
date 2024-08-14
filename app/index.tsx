import { useNavigation } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";

export default function Home() {
  const navigation = useNavigation();
  return (
    <View style={style.mainView}>
      <Text style={style.text}>Create your own palettes</Text>

      <View style={style.buttonsView}>
        <Pressable style={style.button}>
          <Text style={{ fontSize: 15 }}>Extract palette from image</Text>
        </Pressable>

        <Pressable
          style={style.button}
          onPress={() => navigation.navigate("Palette" as never)}
        >
          <Text style={{ fontSize: 15 }}>Get random color palettes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainView: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
    backgroundColor: "white",
  },
  buttonsView: {
    height: "20%",
    width: "100%",
    alignItems: "center",
  },
  button: {
    height: "50%",
    width: "60%",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    backgroundColor: "honeydew",
    borderRadius: 15,
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    margin: 10,
  },
});
