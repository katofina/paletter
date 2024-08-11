import { Link } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import auth from '@react-native-firebase/auth';

export default function PanelSign() {
  const [isAuth, setIsAuth] = useState(false);

  auth().onAuthStateChanged((user) => {
    if(user) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  })

  if (!isAuth) {
    return (
      <View style={style.viewLinks}>
        <Pressable style={style.link}>
          <Link href="/SignUp">Sign Up</Link>
        </Pressable>
        <Pressable style={style.link}>
          <Link href="/SignIn">Sign In</Link>
        </Pressable>
      </View>
    );
  } else
    return (
      <View style={style.viewLinks}>
        <Pressable style={style.link}>
          <Link href="/Profile">Profile</Link>
        </Pressable>
        <Pressable style={style.link} onPress={() => auth().signOut()}>
          <Text>Sign Out</Text>
        </Pressable>
      </View>
    );
}

const style = StyleSheet.create({
  viewLinks: {
    flexDirection: "row",
    width: "60%",
    height: "100%",
  },
  link: {
    margin: 5,
    borderWidth: 1,
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "antiquewhite",
  },
});
