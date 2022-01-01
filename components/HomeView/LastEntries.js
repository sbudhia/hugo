import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const LAST_ENTRIES_COUNT = 2;

const LastEntries = ({ data }) => {
  const [lastEntriesData, setLastEntriesData] = useState([0, 0]);

  useEffect(() => {
    if (data.length) {
      const lastEntries = [0, 0];
      const entryCount = Math.min(LAST_ENTRIES_COUNT, data.length);
      for (let i = 0; i < entryCount; i++) {
        lastEntries[i] = data[i].totalCost;
      }
      setLastEntriesData(lastEntries);
    }
  }, [data]);

  const renderData = (icon, iconColor, text, title) => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.dataWrapper}>
          <MaterialIcons
            style={styles.icons}
            name={icon}
            size={24}
            color={iconColor}
          />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {lastEntriesData.map((entry, index) => {
        return (
          <View key={index}>
            {renderData(
              "local-gas-station",
              "lightblue",
              "$ " + entry || "0",
              "Refueling"
            )}
          </View>
        );
      })}
    </View>
  );
};

export default LastEntries;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3d3d3d",
    borderRadius: 10,
    margin: 8,
    padding: 8,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 8,
    marginRight: 16,
  },
  dataWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    marginRight: 16,
  },
  text: {
    color: "white",
  },
  title: {
    color: "#8c8c8c",
  },
});
