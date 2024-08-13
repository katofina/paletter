import { Dimensions } from "react-native";

export default function getBoxHeight(number: number) {
  const windowHeight = Dimensions.get("window").height;
  return (windowHeight - 130) / number;
}
