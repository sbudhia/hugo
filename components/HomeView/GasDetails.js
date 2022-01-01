import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GasDetails = ({ data }) => {
  const [gasComputedData, setGasComputedData] = useState({
    averageGasConsumption: "0 mi/L",
    lastGasConsumption: "0 mi/L",
    lastGasPrice: "$ 0",
  });

  useEffect(() => {
    if (data.length >= 2) {
      const gasConsumption = [];
      for (let i = 0; i < data.length - 1; i++) {
        gasConsumption.push(
          (data[i].odometer - data[i + 1].odometer) / data[i + 1].gas
        );
      }
      const gasConsumptionSum = gasConsumption.reduce((a, b) => a + b, 0);
      const averageGasConsumption = gasConsumptionSum / data.length - 1;

      setGasComputedData({
        averageGasConsumption: averageGasConsumption.toFixed(3) + "mi/L",
        lastGasConsumption: gasConsumption[0] + "mi/L",
        lastGasPrice: "$ " + data[0].price,
      });
    } else if (data.length === 1) {
      setGasComputedData({
        ...gasComputedData,
        lastGasPrice: "$ " + data[0].price,
      });
    }
  }, [data]);

  const renderData = (icon, iconColor, text, title) => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.dataWrapper}>
          <Ionicons
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
      {renderData(
        "water-outline",
        "lightblue",
        gasComputedData.averageGasConsumption,
        "Average Fuel Consumption"
      )}
      {renderData(
        "trending-up",
        "lightgreen",
        gasComputedData.lastGasConsumption,
        "Last Fuel Consumption"
      )}
      {renderData(
        "trending-down",
        "red",
        gasComputedData.lastGasPrice,
        "Last Fuel price"
      )}
    </View>
  );
};

export default GasDetails;

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
