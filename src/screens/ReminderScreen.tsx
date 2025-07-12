// @ts-nocheck
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { differenceInDays, format } from "date-fns";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ReminderScreen = () => {
  const user = useSelector((state: any) => state.auth.user);
  const shouldShowReminder = user.hasReminder;
  const [calculatedTrimester, setCalculatedTrimester] = useState<number | null>(null);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {shouldShowReminder ? (
          <TouchableOpacity style={styles.reminderBox} onPress={() => navigation.navigate("Update")} activeOpacity={0.85}>
            <View style={styles.reminderHeader}>
              <MaterialIcons name="warning" size={24} color="#856404" />
              <Text style={styles.reminderTitle}>Trimester Tidak Sesuai</Text>
            </View>
            <Text style={styles.reminderText}>
              Saat ini terdeteksi Anda berada di trimester {calculatedTrimester}, namun data masih tercatat di trimester {user.trimester}.
            </Text>
            <View style={styles.updateButton}>
              <Text style={styles.updateButtonText}>Perbarui Sekarang</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>✅ Tidak ada notifikasi saat ini</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ReminderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 16,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyBox: {
    backgroundColor: "#e2e3e5",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  emptyText: {
    color: "#6c757d",
    fontSize: 14,
  },
  reminderBox: {
    backgroundColor: "#fff3cd",
    borderColor: "#ffeeba",
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 8,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#856404",
  },
  reminderText: {
    color: "#856404",
    fontSize: 15,
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: "#ffc107",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 15,
  },
});
