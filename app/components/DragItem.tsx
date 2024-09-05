import { FontAwesome } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  box_height: number;
  color: string;
}

export const DragItem = ({ color, box_height }: Props) => {
  const styles = getStyles(color, box_height);

  return (
    <View style={styles.container}>
      <FontAwesome
        style={styles.changeButton}
        name="exchange"
        size={24}
        color="#403d39"
      />
      <Text style={styles.colorText}>{color}</Text>
    </View>
  );
};

const getStyles = (color: string, box_height: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: color,
      justifyContent: "space-evenly",
      alignItems: "center",
      zIndex: 0,
      flexDirection: "row",
      height: box_height,
    },
    colorText: {
      fontSize: 20,
    },
    changeButton: {
      transform: "rotate(90deg)",
    },
  });
