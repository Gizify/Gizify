import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import Button from "../components/form/Button";
import PopupModal from "../components/modals/PopupModal";
import { StackNavigationProp } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/authAction";


type RootStackParamList = {
  Profile: undefined;
  EditProfileScreen: undefined;
  DetailProfileScreen: undefined;
  AccountSettingsScreen: undefined;
  PrivacySettingsScreen: undefined;
  ManageAccountScreen: undefined;
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
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileHeader}>
        <Image source={require("../../assets/avatar/avatar1.png")} style={styles.avatar} />
        <Text style={styles.profileName}>{user.name}</Text>
        <Text style={styles.profileEmail}>{user.email}</Text>

        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate("EditProfileScreen")}>
          <Text style={styles.editProfileText}>Edit Foto</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DetailProfileScreen")}>
          <Text style={styles.sectionItemText}>Detail Profile</Text>
        </TouchableOpacity>
        <View style={styles.sectionDivider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AccountSettingsScreen")}>
          <Text style={styles.sectionItemText}>Pengaturan Akun</Text>
        </TouchableOpacity>
        <View style={styles.sectionDivider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PrivacySettingsScreen")}>
          <Text style={styles.sectionItemText}>Pengaturan Privasi</Text>
        </TouchableOpacity>
        <View style={styles.sectionDivider} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ManageAccountScreen")}>
          <Text style={styles.sectionItemText}>Kelola Akun</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>

      {/* popup modal */}
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
    color: "#333",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  editProfileButton: {
    backgroundColor: "#CCE6F1",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  editProfileText: {
    color: "#333",
    fontSize: 13,
    fontWeight: "600",
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
  sectionItemText: {
    fontSize: 16,
    color: "#333",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 5,
  },
  logoutContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;