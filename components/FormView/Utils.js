import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    margin: 16,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 64
  },
  formControl: {
    flex: 1,
  },
  input: {
    flex: 1,
    margin: 8,
    color: "white",
  },
  button: {
    flex: 1,
    margin: 8,
    backgroundColor: "#202020",
    borderWidth: 1,
    borderColor: "white",
  },
  buttonText: {
    color: "white",
  },
});
