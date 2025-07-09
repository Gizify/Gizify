import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import BottomSheet from "../components/modals/BottomSheet";
import AvatarModal from "../components/modals/AvatarModal";
import { completeUserProfile } from "../redux/actions/authAction";
import { AvatarType, avatarList } from "../utils/avatars";

interface VerifyDataScreenProps {}

const VerifyDataScreen: React.FC<VerifyDataScreenProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.auth);

  // Input states
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [pregnancyMonth, setPregnancyMonth] = useState("");
  const [hpht, setHpht] = useState("");
  const [hphtError, setHphtError] = useState("");
  const [pregnancyDay, setPregnancyDay] = useState("");
  const [activity, setActivity] = useState<string | null>(null);
  const [healthHistory, setHealthHistory] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [birthdateError, setBirthdateError] = useState("");

  // Avatar/photo option
  const [photoOption, setPhotoOption] = useState<AvatarType | null>({ id: "avatar1", source: 29 });
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<AvatarType | null>(null);

  // Modal visibility states
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showHealthHistoryModal, setShowHealthHistoryModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPregnancyModal, setShowPregnancyModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Temporary selections for modals
  const [tempActivity, setTempActivity] = useState<string | null>(null);
  const [tempHealthHistory, setTempHealthHistory] = useState<string | null>(null);
  const [tempPhotoOption, setTempPhotoOption] = useState<string | null>(null);

  // Validasi format tanggal (DD/MM/YYYY)
  const isValidDate = (dateStr: string) => {
    const regex = /^([0-2][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateStr);
  };

  // Format otomatis input tanggal ke DD/MM/YYYY
  const formatDateInput = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    const parts = [];
    if (cleaned.length > 0) parts.push(cleaned.substring(0, 2));
    if (cleaned.length > 2) parts.push(cleaned.substring(2, 4));
    if (cleaned.length > 4) parts.push(cleaned.substring(4, 8));
    return parts.join("/");
  };

  // Fungsi untuk memilih avatar
  const handleSelectAvatar = (avatar: AvatarType) => {
    setSelectedAvatar(avatar);
  };

  const handleCloseModal = () => setModalVisible(false);

  const handleConfirmAvatar = () => {
    if (selectedAvatar) {
      setCurrentAvatar(selectedAvatar);
      setPhotoOption(selectedAvatar);
    }
    setModalVisible(false);
  };

  // Menangani aksi dari opsi gambar profil
  const handleSelectPhotoOption = (value: string) => {
    if (value === "avatar") {
      setModalVisible(true);
    } else if (value === "hapus") {
      setPhotoOption(null);
      setCurrentAvatar(null);
      setSelectedAvatar(null);
    }
  };

  // Submit data ke backend
  const handleSubmit = async () => {
    if (!height || !weight || !hpht || !activity || !healthHistory || !birthdate) {
      Alert.alert("Error", "Mohon lengkapi semua data terlebih dahulu");
      return;
    }

    if (!isValidDate(birthdate)) {
      Alert.alert("Error", "Format tanggal lahir tidak valid. Gunakan DD/MM/YYYY");
      return;
    }

    try {
      if (!token) {
        Alert.alert("Error", "Autentikasi gagal. Silakan login ulang.");
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "LoginRegisterScreen" }] }));
        return;
      }

      const parseBirthdateToISO = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/");
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      };

      const profileData = {
        height: parseFloat(height),
        weight: parseFloat(weight),
        last_menstrual_period: parseBirthdateToISO(hpht),
        activity: activity!,
        photoOption: photoOption.id || null,
        birthdate: parseBirthdateToISO(birthdate),
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

  // Tombol lanjut dinonaktifkan jika belum lengkap
  const isButtonDisabled = !height || !weight || !hpht || !activity || !healthHistory || !birthdate;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Isi Data Diri</Text>
      </View>

      {/* Foto profil */}
      <View style={styles.profileImage}>
        <Image source={photoOption?.source || require("../../assets/avatar/default-avatar.png")} style={styles.image} />
        <TouchableOpacity onPress={() => setShowPhotoModal(true)}>
          <Text style={styles.imageText}>Tambahkan foto profile</Text>
        </TouchableOpacity>
      </View>

      {/* Input tinggi dan berat */}
      <View style={styles.row}>
        <TextInput placeholder="Tinggi Badan (cm) *" style={styles.inputHalf} keyboardType="numeric" value={height} onChangeText={setHeight} />
        <TextInput placeholder="Berat Badan (kg) *" style={styles.inputHalf} keyboardType="numeric" value={weight} onChangeText={setWeight} />
      </View>

      {/* Input tanggal lahir */}
      <TextInput
        placeholder="Tanggal Lahir (DD/MM/YYYY) *"
        style={styles.inputFull}
        keyboardType="numeric"
        maxLength={10}
        value={birthdate || ""}
        onChangeText={(text) => {
          const formatted = formatDateInput(text);
          setBirthdate(formatted);
          setBirthdateError("");
        }}
        onBlur={() => {
          if (birthdate && !isValidDate(birthdate)) {
            setBirthdateError("Format tanggal tidak valid (contoh: 31/12/2000)");
          }
        }}
      />
      {birthdateError ? <Text style={{ color: "red", marginBottom: 12 }}>{birthdateError}</Text> : null}

      {/* Modal untuk input lain */}
      <TouchableOpacity style={styles.select} onPress={() => setShowActivityModal(true)}>
        <Text style={[styles.selectText, { color: activity ? "#333" : "#777" }]}>{activity || "Aktivitas*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      {/* Input Hari Pertama Haid Terakhir */}
      <TextInput
        placeholder="Hari Pertama Haid Terakhir (DD/MM/YYYY) *"
        style={styles.inputFull}
        keyboardType="numeric"
        maxLength={10}
        value={hpht || ""}
        onChangeText={(text) => {
          const formatted = formatDateInput(text);
          setHpht(formatted);
          setHphtError("");
        }}
        onBlur={() => {
          if (hpht && !isValidDate(hpht)) {
            setHphtError("Format tanggal tidak valid (contoh: 31/12/2000)");
          }
        }}
      />
      {hphtError ? <Text style={{ color: "red", marginBottom: 12 }}>{hphtError}</Text> : null}

      <TouchableOpacity style={styles.select} onPress={() => setShowHealthHistoryModal(true)}>
        <Text style={[styles.selectText, { color: healthHistory ? "#333" : "#777" }]}>{healthHistory || "Riwayat Kesehatan*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      {/* Tombol submit */}
      <TouchableOpacity style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]} onPress={handleSubmit} disabled={isButtonDisabled}>
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>

      {/* Modal Avatar */}
      <AvatarModal visible={modalVisible} selectedAvatar={selectedAvatar} onSelect={handleSelectAvatar} onClose={handleCloseModal} onConfirm={handleConfirmAvatar} avatarList={avatarList} currentAvatar={currentAvatar} />

      {/* BottomSheet: Foto profil */}
      <BottomSheet
        visible={showPhotoModal}
        title="Foto profile"
        options={[
          { id: "avatar", label: "Pilih dari avatar yang tersedia" },
          { id: "gallery", label: "Pilih dari galeri" },
          { id: "camera", label: "Ambil foto" },
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

      {/* BottomSheet: Aktivitas */}
      <BottomSheet
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
      />

      {/* BottomSheet: Usia Kehamilan */}
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

      {/* BottomSheet: Riwayat Kesehatan */}
      <BottomSheet
        visible={showHealthHistoryModal}
        title="Riwayat Kesehatan"
        options={[
          { id: "Anemia", label: "Anemia" },
          { id: "Diabetes", label: "Diabetes" },
          { id: "Hipertensi", label: "Hipertensi" },
          { id: "TBC", label: "TBC" },
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
    padding: 24,
    backgroundColor: "#fff",
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
  profileImage: {
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F3F3",
  },
  imageText: {
    marginTop: 8,
    color: "#777",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputHalf: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#F3F3F3",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  inputFull: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#F3F3F3",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#F3F3F3",
    borderWidth: 1,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
  },
  selectText: {
    color: "#777",
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#297872",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
