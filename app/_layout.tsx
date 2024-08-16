import { Stack } from "expo-router";
import "react-native-reanimated";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PanelSign from "./components/PanelSign";
import { Provider } from "react-redux";
import { store } from "./redux/Store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack initialRouteName="index">
          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
              headerTitle: "Palette",
              headerRight: () => <PanelSign />,
            }}
          />
          <Stack.Screen
            name="Palette"
            options={{
              headerShown: true,
              headerTitle: "Palette",
              headerRight: () => <PanelSign />,
            }}
          />
          <Stack.Screen
            name="PhotoPalette"
            options={{ headerTitle: "Palette" }}
          />
          <Stack.Screen name="SignIn" options={{ headerTitle: "Sign In" }} />
          <Stack.Screen name="SignUp" options={{ headerTitle: "Sign Up" }} />
          <Stack.Screen name="Profile" options={{ headerTitle: "Profile" }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
