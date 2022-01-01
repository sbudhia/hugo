import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, FormControl } from "native-base";
import { styles } from "./Utils";

const FormInput = ({ value, placeholder, onChangeText, error }) => {
  return (
    <FormControl style={styles.formControl} isRequired isInvalid={error.price}>
      <Input
        style={styles.input}
        isRequired={true}
        value={value}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text)}
      />
      <FormControl.ErrorMessage
        leftIcon={<MaterialIcons name="error" size="xs" color="orange" />}
      >
        {"Error"}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default FormInput;
