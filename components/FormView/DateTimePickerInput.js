import React, { useState, useEffect } from "react";
import { styles } from "./Utils";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Text } from "native-base";

const DateTimePickerInput = ({ refuelingDetails, setRefuelingDetails }) => {
  const [inputMode, setInputMode] = useState("date");
  const [isShowTimePickerOpen, setShowTimePickerOpen] = useState(false);

  const getTime = (timestamp) => {
    var dateWithoutSecond = new Date(timestamp);
    return dateWithoutSecond.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDate = (timestamp) => {
    const date = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth() + 1;
    const year = new Date(timestamp).getFullYear();
    return date + "-" + month + "-" + year;
  };

  const handleDateTimeInput = (event, selectedDate) => {
    setShowTimePickerOpen(false);
    if (selectedDate) {
      const updateData = { ...refuelingDetails };
      if (inputMode === "date") {
        updateData.date = selectedDate;
      } else {
        updateData.time = selectedDate;
      }
      setRefuelingDetails(updateData);
    }
  };

  const showDateTimePicker = (currentMode) => {
    setShowTimePickerOpen(true);
    setInputMode(currentMode);
  };

  const showDatepicker = () => {
    showDateTimePicker("date");
  };

  const showTimePicker = () => {
    showDateTimePicker("time");
  };

  return (
    <View>
      <View style={styles.container}>
        <MaterialIcons name="date-range" size={24} color="lightblue" />
        <Button bordered dark onPress={showDatepicker} style={styles.button}>
          <Text style={styles.buttonText}>
            {getDate(refuelingDetails.date)}
          </Text>
        </Button>
        <Button bordered dark onPress={showTimePicker} style={styles.button}>
          <Text style={styles.buttonText}>
            {getTime(refuelingDetails.time)}
          </Text>
        </Button>
      </View>
      {isShowTimePickerOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={refuelingDetails[inputMode]}
          mode={inputMode}
          is24Hour={true}
          display="default"
          onChange={handleDateTimeInput}
        />
      )}
    </View>
  );
};

export default DateTimePickerInput;
