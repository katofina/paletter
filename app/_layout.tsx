import { Stack } from "expo-router";
import "react-native-reanimated";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./redux/Store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="index" options={{ title: "Palette" }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
