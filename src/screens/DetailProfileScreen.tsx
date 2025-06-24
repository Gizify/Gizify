import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { avatarList, AvatarType } from "../utils/avatars";

const DetailProfileScreen = () => {
  const navigation = useNavigation();
  const userProfile = useSelector((state: any) => state.auth.user);

  const avatar: AvatarType | undefined = avatarList.find(
    (item) => item.id === userProfile?.photoOption
  );

  const formatAge = (birthdate: string) => {
    try {
      const birth = new Date(birthdate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      return `${age} tahun`;
    } catch {
      return "-";
    }
  };

  const formatHealthHistory = (history: string[] | null | undefined) => {
    if (!history || history.length === 0) return "Tidak ada";
    return history.join(", ");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Detail Profile</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={
            avatar?.source
              ? avatar.source
              : require("../../assets/avatar/default-avatar.png")
          }
          style={styles.avatar}
        />
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <InfoItem label="Nama" value={userProfile?.name} />
        <InfoItem label="Email" value={userProfile?.email} />
        <InfoItem
          label="Usia"
          value={userProfile?.birthdate ? formatAge(userProfile.birthdate) : "-"}
        />
        <InfoItem
          label="Berat Badan"
          value={userProfile?.weight ? `${userProfile.weight}kg` : "-"}
        />
        <InfoItem
          label="Tinggi Badan"
          value={userProfile?.height ? `${userProfile.height}cm` : "-"}
        />
        <InfoItem
          label="Usia Kehamilan"
          value={
            userProfile?.gestational_age?.months != null &&
              userProfile?.gestational_age?.days != null
              ? `${userProfile.gestational_age.months} Bulan ${userProfile.gestational_age.days} Hari`
              : "-"
          }
        />
        <InfoItem
          label="Aktivitas"
          value={userProfile?.activity_level || "-"}
        />
        <InfoItem
          label="Riwayat Kesehatan"
          value={formatHealthHistory(userProfile?.medical_history)}
        />
      </View>
    </ScrollView>
  );
};

export default DetailProfileScreen;

const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label} :</Text>
    <View style={styles.valueBox}>
      <Text style={styles.value}>{value || "-"}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 12,
    color: "#222",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f1f1f1",
  },
  infoSection: {
    gap: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    width: 130,
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  valueBox: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  value: {
    fontSize: 15,
    color: "#222",
  },
});