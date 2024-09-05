import { Dimensions } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function getBoxHeight(number: number) {
  const headerHeight = useHeaderHeight();
  const windowHeight = Dimensions.get("window").height;
  const bottomBarHeight = 50;
  return (windowHeight - bottomBarHeight - headerHeight) / number;
}
