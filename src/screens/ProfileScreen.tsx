import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Button from "../components/form/Button";
import PopupModal from "../components/modals/PopupModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";

// Definisikan tipe untuk Stack Navigator
type RootStackParamList = {
  Profile: undefined;
  EditProfileScreen: undefined;
  DetailProfileScreen: undefined;
  AddMemberScreen: undefined;
  MemberListScreen: undefined;
  DeleteAccountScreen: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const handleLogout = () => {
    setLogoutVisible(true);
  };

  const confirmLogout = () => {
    setLogoutVisible(false);
    dispatch(logoutUser() as any);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profil Saya</Text>

      <View style={styles.profileHeader}>
        {/* Ganti ke .png jika tidak menggunakan SVG transformer */}
        <Image source={require("../../assets/avatar/avatar1.png")} style={styles.avatar} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("EditProfileScreen")}>
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.sectionDivider} />
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DetailProfileScreen")}>
          <Text style={styles.sectionItemText}>Detail Profile</Text>
        </TouchableOpacity>
        <View style={styles.sectionDivider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddMemberScreen")}>
          <Text style={styles.sectionItemText}>Tambah Anggota</Text>
        </TouchableOpacity>
        <View style={styles.sectionDivider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MemberListScreen")}>
          <Text style={styles.sectionItemText}>Daftar Anggota</Text>
        </TouchableOpacity>
        <View style={styles.sectionDivider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DeleteAccountScreen")}>
          <Text style={styles.sectionItemText}>Hapus Akun</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <Button title="Keluar" variant="danger" onPress={handleLogout} />
      </View>

      <PopupModal
        visible={isLogoutVisible}
        onClose={() => setLogoutVisible(false)}
        onConfirm={confirmLogout}
        icon={require("../../assets/icons/logout-icon.png")}
        title="Keluar"
        message="Apakah Anda yakin ingin keluar dari aplikasi?"
        cancelText="Batal"
        confirmText="Keluar"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },

  profileHeader: {
    alignItems: "center",
    padding: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },

  profileName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "#666",
  },

  section: {
    backgroundColor: "white",
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
  },

  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  editProfileButton: {
    backgroundColor: "#CCE6F1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },

  editProfileText: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },

  sectionItemText: {
    fontSize: 16,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },

  logoutContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default ProfileScreen;
