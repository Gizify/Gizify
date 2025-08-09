import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import BottomSheet from "../components/modals/BottomSheet";
import AvatarModal from "../components/modals/AvatarModal";
import PopupModal from "../components/modals/PopupModal";
import { completeUserProfile } from "../redux/actions/authAction";
import { AvatarType, avatarList } from "../utils/avatars";
import { Icons } from "../utils/icons";

const VerifyDataScreen: React.FC = () => {
  // Navigation and Redux setup
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.auth);

  // User input states
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [pregnancyMonth, setPregnancyMonth] = useState("");
  const [hpht, setHpht] = useState("");
  const [hphtError, setHphtError] = useState("");
  const [pregnancyDay, setPregnancyDay] = useState("");
  // const [activity, setActivity] = useState<string | null>(null);
  const [healthHistory, setHealthHistory] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateError, setBirthdateError] = useState("");

  // Avatar and modal states
  const [photoOption, setPhotoOption] = useState<AvatarType | null>({ id: "avatar1", source: 29 });
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<AvatarType | null>(null);

  // const [showActivityModal, setShowActivityModal] = useState(false);
  const [showHealthHistoryModal, setShowHealthHistoryModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPregnancyModal, setShowPregnancyModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // const [tempActivity, setTempActivity] = useState<string | null>(null);
  const [tempHealthHistory, setTempHealthHistory] = useState<string | null>(null);
  const [tempPhotoOption, setTempPhotoOption] = useState<string | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  // Helper function to validate date format
  const isValidDate = (dateStr: string) => {
    const regex = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateStr);
  };

  // Automatically format date input as DD/MM/YYYY
  const formatDateInput = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    const parts = [];
    if (cleaned.length > 0) parts.push(cleaned.substring(0, 2));
    if (cleaned.length > 2) parts.push(cleaned.substring(2, 4));
    if (cleaned.length > 4) parts.push(cleaned.substring(4, 8));
    return parts.join("/");
  };

  // Avatar selection handler
  const handleSelectAvatar = (avatar: AvatarType) => setSelectedAvatar(avatar);
  const handleCloseModal = () => setModalVisible(false);
  const handleConfirmAvatar = () => {
    if (selectedAvatar) {
      setCurrentAvatar(selectedAvatar);
      setPhotoOption(selectedAvatar);
    }
    setModalVisible(false);
  };

  // Avatar/photo option handler
  const handleSelectPhotoOption = (value: string) => {
    if (value === "avatar") {
      setModalVisible(true);
    } else if (value === "hapus") {
      setPhotoOption(null);
      setCurrentAvatar(null);
      setSelectedAvatar(null);
    }
  };

  // Submit user profile data
  const handleSubmit = async () => {
    try {
      if (!token) {
        Alert.alert("Error", "Autentikasi gagal. Silakan login ulang.");
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "LoginRegisterScreen" }] }));
        return;
      }

      // Convert date from DD/MM/YYYY to ISO format
      const parseBirthdateToISO = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };

      // Construct payload
      const profileData = {
        height: parseFloat(height),
        weight: parseFloat(weight),
        last_menstrual_period: parseBirthdateToISO(hpht),
        // activity: activity!,
        photoOption: photoOption?.id || null,
        birthdate: parseBirthdateToISO(birthdate!),
        medical_history: healthHistory === "Tidak ada" ? [] : [healthHistory!],
      };

      await dispatch(completeUserProfile(profileData) as any);

      Alert.alert("Sukses", "Profil berhasil disimpan!");
      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "MainTabs" }] }));
    } catch (err) {
      console.error("Error submit profile:", err);
      Alert.alert("Gagal", "Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  // Determine if the form is valid before allowing submit
  const isButtonDisabled = !height || !weight || !hpht || !healthHistory || !birthdate; // Delete !activity

  return (
    // Full screen scrollable view for form inputs and modals
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with back button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Isi Data Diri</Text>
      </View>

      {/* Profile avatar section */}
      <View style={styles.profileImage}>
        <Image source={photoOption?.source || require("../../assets/avatar/default-avatar.png")} style={styles.image} />
        <TouchableOpacity onPress={() => setShowPhotoModal(true)}>
          <Text style={styles.imageText}>Tambahkan foto profile</Text>
        </TouchableOpacity>
      </View>

      {/* Input for height and weight */}
      <View style={styles.row}>
        <TextInput placeholderTextColor="#888" placeholder="Tinggi Badan (cm) *" style={styles.inputHalf} keyboardType="numeric" value={height} onChangeText={setHeight} />
        <TextInput placeholderTextColor="#888" placeholder="Berat Badan (kg) *" style={styles.inputHalf} keyboardType="numeric" value={weight} onChangeText={setWeight} />
      </View>

      {/* Birthdate input */}
      <TextInput
        placeholder="Tanggal Lahir (DD/MM/YYYY) *"
        placeholderTextColor="#888"
        style={styles.inputFull}
        keyboardType="numeric"
        maxLength={10}
        value={birthdate || ""}
        onChangeText={(text) => {
          const formatted = formatDateInput(text);
          setBirthdate(formatted);
          setBirthdateError("");
        }}
      />
      {birthdateError ? <Text style={{ color: "red", marginBottom: 12 }}>{birthdateError}</Text> : null}

      {/* Activity selection */}
      {/* <TouchableOpacity style={styles.select} onPress={() => setShowActivityModal(true)}>
        <Text style={[styles.selectText, { color: activity ? "#333" : "#777" }]}>{activity || "Aktivitas*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity> */}

      {/* Last menstrual period input */}
      <TextInput
        placeholder="Hari Pertama Haid Terakhir (DD/MM/YYYY) *"
        placeholderTextColor="#888"
        style={styles.inputFull}
        keyboardType="numeric"
        maxLength={10}
        value={hpht || ""}
        onChangeText={(text) => {
          const formatted = formatDateInput(text);
          setHpht(formatted);
          setHphtError("");
        }}
      />
      {hphtError ? <Text style={{ color: "red", marginBottom: 12 }}>{hphtError}</Text> : null}

      {/* Health history selection */}
      <TouchableOpacity style={styles.select} onPress={() => setShowHealthHistoryModal(true)}>
        <Text style={[styles.selectText, { color: healthHistory ? "#333" : "#777" }]}>{healthHistory || "Riwayat Kesehatan*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      {/* Submit button with validation */}
      <TouchableOpacity
        style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]}
        onPress={() => {
          if (!isValidDate(birthdate || "")) {
            setBirthdateError("Format tanggal lahir tidak valid.");
            return;
          }
          if (!isValidDate(hpht || "")) {
            setHphtError("Format tanggal HPHT tidak valid.");
            return;
          }
          setShowConfirmationModal(true);
        }}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>

      {/* Modal components */}
      <PopupModal
        visible={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={() => {
          setShowConfirmationModal(false);
          handleSubmit();
        }}
        icon={Icons.warning}
        title="Konfirmasi"
        message="Apakah data yang Anda masukkan sudah benar?"
        cancelText="Periksa lagi"
        confirmText="Ya, benar"
      />

      <AvatarModal visible={modalVisible} selectedAvatar={selectedAvatar} onSelect={handleSelectAvatar} onClose={handleCloseModal} onConfirm={handleConfirmAvatar} avatarList={avatarList} currentAvatar={currentAvatar} />

      <BottomSheet
        visible={showPhotoModal}
        title="Foto profile"
        options={[
          { id: "avatar", label: "Pilih dari avatar yang tersedia" },
          // { id: "gallery", label: "Pilih dari galeri" },
          // { id: "camera", label: "Ambil foto" },
          { id: "hapus", label: "Hapus gambar saat ini" },
        ]}
        selectedOption={tempPhotoOption}
        onSelect={setTempPhotoOption}
        onClose={() => setShowPhotoModal(false)}
        type="option"
        showContinueButton
        onContinue={() => {
          if (tempPhotoOption) handleSelectPhotoOption(tempPhotoOption);
          setShowPhotoModal(false);
        }}
      />

      {/* Activity selection modal */}
      {/* <BottomSheet
        visible={showActivityModal}
        title="Aktivitas"
        options={[
          { id: "Ringan", label: "Ringan" },
          { id: "Sedang", label: "Sedang" },
          { id: "Berat", label: "Berat" },
        ]}
        selectedOption={tempActivity || activity}
        onSelect={setTempActivity}
        onClose={() => setShowActivityModal(false)}
        type="option"
        showContinueButton
        onContinue={() => {
          if (tempActivity) setActivity(tempActivity);
          setShowActivityModal(false);
        }}
      /> */}

      {/* Pregnancy custom input modal */}
      <BottomSheet
        visible={showPregnancyModal}
        title="Usia Kehamilan"
        type="custom"
        options={[]}
        selectedOption={null}
        onSelect={() => {}}
        onClose={() => setShowPregnancyModal(false)}
        showContinueButton
        onContinue={() => setShowPregnancyModal(false)}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={{ marginBottom: 8 }}>Masukkan Bulan</Text>
          <TextInput placeholder="Misalnya: 1 - 9" keyboardType="numeric" style={styles.inputHalf} value={pregnancyMonth} onChangeText={setPregnancyMonth} />
          <Text style={{ marginVertical: 8 }}>Masukkan Hari</Text>
          <TextInput placeholder="Misalnya: 1 - 30" keyboardType="numeric" style={styles.inputHalf} value={pregnancyDay} onChangeText={setPregnancyDay} />
        </View>
      </BottomSheet>

      {/* Health history selection modal */}
      <BottomSheet
        visible={showHealthHistoryModal}
        title="Riwayat Kesehatan"
        options={[
          { id: "Diabetes", label: "Diabetes" },
          { id: "Hipertensi", label: "Hipertensi" },
          { id: "Tidak ada", label: "Tidak ada" },
        ]}
        selectedOption={tempHealthHistory || healthHistory}
        onSelect={setTempHealthHistory}
        onClose={() => setShowHealthHistoryModal(false)}
        type="option"
        showContinueButton
        onContinue={() => {
          if (tempHealthHistory) setHealthHistory(tempHealthHistory);
          setShowHealthHistoryModal(false);
        }}
      />
    </ScrollView>
  );
};

export default VerifyDataScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 16,
    color: "#333333",
  },
  profileImage: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F3F3F3",
  },
  imageText: {
    marginTop: 8,
    fontSize: 13,
    color: "#777777",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    backgroundColor: "#FAFAFA",
    fontSize: 14,
    color: "#333333",
  },
  inputFull: {
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    backgroundColor: "#FAFAFA",
    fontSize: 14,
    color: "#333333",
    marginBottom: 16,
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    backgroundColor: "#FAFAFA",
    marginBottom: 16,
  },
  selectText: {
    fontSize: 14,
    color: "#999999",
  },
  button: {
    backgroundColor: "#297872",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
