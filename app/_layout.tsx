import { Link, Stack } from "expo-router";
import "react-native-reanimated";
import React from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./redux/Store";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack
          initialRouteName="index"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
              headerTitle: "Palette",
              headerRight: () => (
                <View style={style.viewLinks}>
                  <Link style={style.link} href="/firebase/SignUp">
                    Sign Up
                  </Link>
                  <Link style={style.link} href="/firebase/SignIn">
                    Sign In
                  </Link>
                </View>
              ),
            }}
          />
          <Stack.Screen name="firebase" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
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
