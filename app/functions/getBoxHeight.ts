import { Dimensions, NativeModules } from "react-native";

export default function getBoxHeight() {
  const { height } = Dimensions.get("window");
  const { StatusBarManager } = NativeModules;
  return (height - StatusBarManager.HEIGHT - 50) / 5; //5 - constant value length of array, 50 - constant value height of bottom panel
}
