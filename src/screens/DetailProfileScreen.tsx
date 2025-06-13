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
import { avatarList } from "../utils/avatars";
import { AvatarType } from "../utils/avatars";

const DetailProfileScreen = () => {
  const navigation = useNavigation();
  const userProfile = useSelector((state: any) => state.auth.userProfile);

  const avatar: AvatarType | undefined = avatarList.find(
    (item) => item.id === userProfile?.photoOption
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
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

      {/* Info Items */}
      <InfoItem label="Nama" value={userProfile?.name} />
      <InfoItem label="Email" value={userProfile?.email} />
      <InfoItem
        label="Usia"
        value={userProfile?.birthdate ? `${userProfile.birthdate} tahun` : "-"}
      />
      <InfoItem
        label="Berat badan"
        value={userProfile?.weight ? `${userProfile.weight} kg` : "-"}
      />
      <InfoItem
        label="Tinggi badan"
        value={userProfile?.height ? `${userProfile.height} cm` : "-"}
      />
      <InfoItem
        label="Usia Kehamilan"
        value={
          userProfile?.pregnancyMonth !== undefined &&
            userProfile?.pregnancyDay !== undefined
            ? `${userProfile.pregnancyMonth} Bulan ${userProfile.pregnancyDay} Hari`
            : "-"
        }
      />
      <InfoItem
        label="Riwayat Kesehatan"
        value={userProfile?.healthHistory}
      />
    </ScrollView>
  );
};

export default DetailProfileScreen;

// Reusable Info Row Component
const InfoItem = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label} numberOfLines={1}>
      {label}
    </Text>
    <Text style={styles.value} numberOfLines={1}>
      {value || "-"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 24,
    paddingBottom: 80,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3F3F3",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F3F3",
  },
  label: {
    fontWeight: "bold",
    color: "#555",
    flex: 1,
  },
  value: {
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
});