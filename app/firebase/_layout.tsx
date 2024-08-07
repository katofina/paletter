import { Stack } from "expo-router";
import "react-native-reanimated";
import React from "react";

export default function SignLayout() {
  return (
    <Stack>
      <Stack.Screen name="SignUp" options={{ title: "Sign Up" }} />
      <Stack.Screen name="SignIn" options={{ title: "Sign In" }} />
    </Stack>
  );
}
