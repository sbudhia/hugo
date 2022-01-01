import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider, Fab, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { _retrieveData } from "./Utils";
import { FormView, HomeView } from "./components";

export default function App() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [refuelingData, setRefuelingData] = useState([]);

  const fetchRefuelingData = async () => {
    const data = await _retrieveData();
    setRefuelingData([...data]);
  };

  useEffect(() => {
    fetchRefuelingData();
  }, []);

  useEffect(() => {
    fetchRefuelingData();
  }, [isFormOpen]);

  const renderFloatingButton = () => {
    return (
      <Fab
        position="absolute"
        size="sm"
        onPress={() => setFormOpen(true)}
        bg="#6200ee"
        icon={
          <Icon color="white" as={<MaterialIcons name="add" />} size="sm" />
        }
      />
    );
  };

  return (
    <PaperProvider>
      <NativeBaseProvider>
        <View style={styles.container}>
          {isFormOpen ? (
            <FormView
              refuelingData={refuelingData}
              setFormOpen={setFormOpen}
              updateRefuelingData={fetchRefuelingData}
            />
          ) : (
            <HomeView refuelingData={refuelingData} />
          )}
        </View>
        {!isFormOpen && renderFloatingButton()}
      </NativeBaseProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
  },
});
