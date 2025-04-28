import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const DetailProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: any) => state.auth.user);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Profile</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/avatar/avatar1.png")} // Ganti SVG ke PNG/JPG jika perlu
          style={styles.avatar}
          resizeMode="contain"
        />
      </View>

      {/* Fields */}
      <View style={styles.fields}>
        <ProfileField label="Nama" value={user.name} />
        <ProfileField label="Email" value={user.email} />
        <ProfileField label="Tujuan" value={user.goal} />
        <ProfileField label="Berat badan" value={`${user.weight} kg`} />
        <ProfileField label="Tinggi badan" value={`${user.height} cm`} />
        <ProfileField label="Level Aktivitas" value={user.activity_level} />
        <ProfileField label="Tanggal Lahir" value={user.birthdate} />
      </View>
    </ScrollView>
  );
};

// Komponen Reusable Field
const ProfileField = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.fieldContainer}>
    <View style={styles.fieldRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.separator}>:</Text>
      <TextInput style={styles.input} value={value} editable={false} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
    gap: 10,
    paddingVertical: 22,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  fields: {
    gap: 16,
  },
  fieldContainer: {
    flexDirection: "row",
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  label: {
    width: 110,
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
  },
  separator: {
    marginRight: 4,
    color: "#444",
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fdfdfd",
    fontSize: 16,
    color: "#888",
  },
});

export default DetailProfileScreen;
