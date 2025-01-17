import { useNavigation } from "expo-router";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import authState from "../redux/AuthSlice";
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function PanelSign() {
  const [isAuth, setIsAuth] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  auth().onAuthStateChanged((user) => {
    if (user) {
      const email = user.email;
      const index = email!.indexOf("@");
      const name = email!.substring(0, index);
      dispatch(authState.actions.setEmail(name));
      setIsAuth(true);
    } else {
      dispatch(authState.actions.setEmail(null));
      setIsAuth(false);
    }
  });

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const styles = getStyles(headerHeight - insets.top);

  if (!isAuth) {
    return (
      <View style={styles.viewLinks}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("SignUp" as never)}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("SignIn" as never)}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  } else
    return (
      <View style={styles.viewLinks}>
        <TouchableOpacity
          style={styles.link}
          onPress={() => navigation.navigate("Profile" as never)}
        >
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => auth().signOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity>
      </View>
    );
}

const getStyles = (headerHeight: number) => StyleSheet.create({
  viewLinks: {
    flexDirection: "row",
    width: "60%",
    height: headerHeight,
  },
  link: {
    borderWidth: 1,
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "honeydew",
    borderRadius: 5
  },
});
