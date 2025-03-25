import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PermissionDeniedProps {
  requestPermission: () => void;
}

const PermissionDenied: React.FC<PermissionDeniedProps> = ({ requestPermission }) => (
  <View style={styles.permissionContainer}>
    <Text style={styles.permissionText}>Akses kamera tidak diizinkan</Text>
    <TouchableOpacity style={styles.button} onPress={requestPermission}>
      <Text style={styles.buttonText}>Izinkan Kamera</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  permissionText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PermissionDenied;
