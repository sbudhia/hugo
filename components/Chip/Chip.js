import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Chip = ({ icon, text }) => {
  return (
    <View style={styles.chip}>
      <MaterialIcons
        style={styles.icons}
        name={icon}
        size={24}
        color="lightblue"
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chip: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3d3d3d",
    borderRadius: 50,
    height: 40,
    alignSelf: "center",
    margin: 8,
  },
  icons: {
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    color: "white",
    marginRight: 16,
  },
});
