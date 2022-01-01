import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Select } from "native-base";
import AppBar from "../AppBar/AppBar";
// import { nanoid } from "nanoid";
import { _storeData } from "../../Utils";
import { styles } from "./Utils";
import DateTimePickerInput from "./DateTimePickerInput";
import FormInput from "./FormInput";

export const DEFAULT_REFUELING_DATA = {
  odometer: "",
  gas: "",
  gasType: "regular",
  price: "",
  totalCost: "",
  date: new Date(),
  time: new Date(),
};

export const DEFAULT_ERROR_VALUE = {
  odometer: false,
  gas: false,
  price: false,
  totalCost: false,
};

const RefuelingForm = ({ setFormOpen, refuelingData }) => {
  const [refuelingDetails, setRefuelingDetails] = useState(
    DEFAULT_REFUELING_DATA
  );
  const [error, setError] = useState(DEFAULT_ERROR_VALUE);

  useEffect(() => {
    setRefuelingDetails({ ...DEFAULT_REFUELING_DATA });
    setError({
      ...DEFAULT_ERROR_VALUE,
    });
  }, []);

  const handleBackClick = () => {
    setFormOpen(false);
  };

  const validateInput = () => {
    const inputError = { ...DEFAULT_ERROR_VALUE };
    let isValid = true;
    Object.keys(inputError).forEach((key) => {
      if (isNaN(refuelingDetails[key]) || refuelingDetails[key] === "") {
        inputError[key] = true;
        isValid = false;
      }
    });
    if (
      refuelingDetails.totalCost <
      refuelingDetails.gas * refuelingDetails.price
    ) {
      inputError.totalCost = true;
      isValid = false;
    }
    // if (
    //   refuelingData?.length &&
    //   refuelingDetails.odometer < refuelingData[0].odometer
    // ) {
    //   inputError.odometer = true;
    //   isValid = false;
    // }
    setError({ ...inputError });
    return isValid;
  };

  const handleOnSubmit = () => {
    const isValid = validateInput();
    if (isValid) {
      _storeData(refuelingDetails);
      setFormOpen(false);
    }
  };

  const renderFormInput = (value, placeholder, onChangeText) => {
    return (
      <FormInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        error={error}
      />
    );
  };

  return (
    <View>
      <AppBar
        title={"Refueling"}
        handleBackClick={handleBackClick}
        handleSubmitClick={handleOnSubmit}
      />

      <View style={styles.formContainer}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="speedometer"
            size={24}
            color="lightblue"
          />
          {renderFormInput(refuelingDetails.odometer, "Odometer (mi)", (text) =>
            setRefuelingDetails({
              ...refuelingDetails,
              odometer: text,
            })
          )}
        </View>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="gas-station"
            size={24}
            color="lightblue"
          />
          {renderFormInput(refuelingDetails.gas, "Gas (l)", (text) =>
            setRefuelingDetails({
              ...refuelingDetails,
              gas: text,
              totalCost: text * (refuelingDetails.price || 1),
            })
          )}
          <View style={styles.input}>
            <Select
              value={refuelingDetails.gasType}
              color="white"
              placeholder="Gas Type"
            >
              <Select.Item label="Regular" value="Regular" />
            </Select>
          </View>
        </View>
        <View style={styles.container}>
          <MaterialIcons name="attach-money" size={24} color="lightblue" />
          {renderFormInput(refuelingDetails.price, "Price/L", (text) =>
            setRefuelingDetails({
              ...refuelingDetails,
              price: text,
              totalCost: text * (refuelingDetails.gas || 1),
            })
          )}
          {renderFormInput(
            refuelingDetails.totalCost.toString(),
            "Total cost",
            (text) =>
              setRefuelingDetails({
                ...refuelingDetails,
                totalCost: text,
              })
          )}
        </View>
        <DateTimePickerInput
          refuelingDetails={refuelingDetails}
          setRefuelingDetails={setRefuelingDetails}
        />
      </View>
    </View>
  );
};

export default RefuelingForm;
