import { Dimensions } from "react-native";

export default function getBoxHeight() {
  const windowHeight = Dimensions.get("window").height;
  const screenHeight = Dimensions.get("screen").height;
  const navbarHeight = screenHeight - windowHeight;
  return (windowHeight - navbarHeight - 50) / 5; //5 - constant value length of array, 50 - constant value height of bottom panel
}
