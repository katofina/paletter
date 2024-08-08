import { Link } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "../redux/Store";
import authState from "../redux/AuthSlice";
import { useEffect, useRef } from "react";
import { endSession, isLoggedIn } from "../firebase/session";

export default function PanelSign() {
  const token = useSelector((store: Store) => store.authState.token);
  const dispatch = useDispatch();
  const currToken: React.MutableRefObject<null | string> = useRef(null);

  async function getToken() {
    const val = await isLoggedIn();
    dispatch(authState.actions.setToken(currToken.current));
    currToken.current = val;
  }

  useEffect(() => {
    getToken();
  }, [token]);

  function logOut() {
    dispatch(authState.actions.setToken(null));
    endSession();
  }

  if (!currToken.current) {
    return (
      <View style={style.viewLinks}>
        <Link style={style.link} href="/SignUp">
          Sign Up
        </Link>
        <Link style={style.link} href="/SignIn">
          Sign In
        </Link>
      </View>
    );
  } else
    return (
      <View style={style.viewLinks}>
        <Link style={style.link} href="/Profile">
          Profile
        </Link>
        <Pressable style={style.link} onPress={logOut}>
          <Text>Sign Out</Text>
        </Pressable>
      </View>
    );
}

const style = StyleSheet.create({
  viewLinks: {
    flexDirection: "row",
  },
  link: {
    margin: 10,
    borderWidth: 2,
    height: 25,
    backgroundColor: "antiquewhite",
  },
});
