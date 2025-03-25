import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: "#ffcccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    fontSize: 16,
    color: "#cc0000",
    textAlign: "center",
  },
});

export default Error;
