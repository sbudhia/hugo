import React from "react";
import { HStack, IconButton, Icon, Text, Box, StatusBar } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

const AppBar = ({ title = "Home", handleBackClick, handleSubmitClick }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />

      <Box safeAreaTop backgroundColor="#6200ee" />

      <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack space="4" alignItems="center">
          <IconButton
            onPress={handleBackClick}
            icon={
              <Icon
                size="sm"
                as={
                  <MaterialIcons
                    name={handleBackClick ? "arrow-back" : "menu"}
                  />
                }
                color="white"
              />
            }
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <HStack space="2">
          {handleSubmitClick && (
            <IconButton
              icon={
                <Icon
                  as={<MaterialIcons name="check" />}
                  size="sm"
                  color="white"
                />
              }
              onPress={handleSubmitClick}
            />
          )}
        </HStack>
      </HStack>
    </View>
  );
};

export default AppBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});
