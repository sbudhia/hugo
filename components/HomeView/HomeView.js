import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import GasDetails from "./GasDetails";
import CostDetails from "./CostDetails";
import LastEntries from "./LastEntries";
import AppBar from "../AppBar/AppBar";
import Chip from "../Chip/Chip";
import { _retrieveData } from "../../Utils";

const HomeView = ({ refuelingData }) => {
  return (
    <View>
      <AppBar title={"Home"} />
      <Chip icon={"local-gas-station"} text={"Gas"} />
      <GasDetails data={refuelingData} />
      <Chip icon={"attach-money"} text={"Costs"} />
      <CostDetails data={refuelingData} />
      <Chip icon={"timeline"} text={"Last Entries"} />
      <LastEntries data={refuelingData} />
    </View>
  );
};

export default HomeView;

const styles = StyleSheet.create({});
