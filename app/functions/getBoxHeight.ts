import { Dimensions } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function getBoxHeight(number: number) {
  const headerHeight = useHeaderHeight();
  const windowHeight = Dimensions.get("window").height;
  return (windowHeight - 50 - headerHeight) / number;
}
