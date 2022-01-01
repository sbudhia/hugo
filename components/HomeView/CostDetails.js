import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const DEFAULT_VALUE = {
  gasCosts: 0,
  otherCosts: 0,
};

const CostDetails = ({ data }) => {
  const [currentMonthData, setCurrentMonthData] = useState(DEFAULT_VALUE);
  const [previousMonthData, setPreviousMonthData] = useState(DEFAULT_VALUE);

  useEffect(() => {
    if (data.length) {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const currentMonthRefuelData = [];
      const previousMonthRefuelData = [];

      data.forEach((refuelData) => {
        const refuelMonth = new Date(refuelData.date).getMonth() + 1;
        const refuelYear = new Date(refuelData.date).getFullYear();

        if (refuelMonth === currentMonth && refuelYear === currentYear) {
          currentMonthRefuelData.push(refuelData);
        } else if (
          (refuelMonth === currentMonth - 1 && refuelYear === currentYear) ||
          (refuelMonth === 12 && refuelYear === currentYear - 1)
        ) {
          previousMonthRefuelData.push(refuelData);
        }
      });

      const computeCost = (data) => {
        let totalGasCosts = 0;
        let totalOtherCosts = 0;

        data.forEach((refuelData) => {
          const gasCost = refuelData.gas * refuelData.price;
          totalGasCosts += gasCost;
          totalOtherCosts += refuelData.totalCost - gasCost;
        });

        return {
          gasCosts: totalGasCosts,
          otherCosts: totalOtherCosts,
        };
      };

      setCurrentMonthData(computeCost(currentMonthRefuelData));
      setPreviousMonthData(computeCost(previousMonthRefuelData));
    }
  }, [data]);

  const renderData = (icon, text, title) => {
    return (
      <View style={styles.wrapper}>
        <View style={styles.dataWrapper}>
          <MaterialIcons
            style={styles.icons}
            name={icon}
            size={24}
            color={"lightblue"}
          />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  const renderMonthData = (title, monthData) => {
    return (
      <View>
        <Text style={styles.blockTitle}>{title}</Text>
        {renderData("local-gas-station", monthData.gasCosts, "Gas")}
        {renderData("attach-money", monthData.otherCosts, "Other Costs")}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderMonthData("This month", currentMonthData)}
      {renderMonthData("Previous Month", previousMonthData)}
    </View>
  );
};

export default CostDetails;

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
  blockTitle: {
    color: "#8c8c8c",
    marginLeft: 12,
    marginBottom: 4,
  },
});
