import { AntDesign, Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import colorState, { ObjectColor } from "../redux/ColorSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import database from "@react-native-firebase/database";
import { Store } from "../redux/Store";
import Toast from "react-native-toast-message";

interface Prop {
  colors: Array<ObjectColor>;
}

function showtoast() {
  Toast.show({
    type: "success",
    text1: "Successfully saved",
    visibilityTime: 1500,
  });
}

function showError() {
  Toast.show({
    type: "error",
    text1: "You should sign in!",
    visibilityTime: 1500,
  });
}

export default function MyTabBar({ colors }: Prop) {
  const dispatch = useDispatch();
  const email = useSelector((store: Store) => store.authState.email);

  function save() {
    if (email) {
      database().ref(email).push(colors);
      showtoast();
    } else showError();
  }

  return (
    <>
      <Toast></Toast>
      <View style={style.bottomPanel}>
        <Pressable
          style={style.generate}
          onPress={() => {
            dispatch(colorState.actions.changeColors());
          }}
        >
          <Text>Generate</Text>
        </Pressable>
        <Pressable
          style={style.add}
          onPress={() => {
            dispatch(colorState.actions.addColor());
          }}
        >
          <Text>Add</Text>
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
        <TouchableOpacity
          onPress={() => {
            save();
          }}
        >
          <AntDesign name="save" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  bottomPanel: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    position: 'absolute',
    zIndex: 15,
    bottom: 0,
    left: 0,
    width: '100%'
  },
  generate: {
    borderWidth: 1,
    width: "30%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "antiquewhite",
  },
  add: {
    borderWidth: 1,
    width: "10%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "antiquewhite",
  },
});
