import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ title: "Palette" }} />
    </Stack>
  );
}
