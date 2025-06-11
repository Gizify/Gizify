import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../components/modals/BottomSheet";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { completeUserProfile } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { AvatarType } from "../utils/avatars";
import { avatarList } from "../utils/avatars";
import AvatarModal from "../components/modals/AvatarModal";

const VerifyDataScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.auth);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [pregnancyMonth, setPregnancyMonth] = useState("");
  const [pregnancyDay, setPregnancyDay] = useState("");
  const [activity, setActivity] = useState<string | null>(null);
  const [healthHistory, setHealthHistory] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [photoOption, setPhotoOption] = useState<AvatarType | null>(null);

  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showHealthHistoryModal, setShowHealthHistoryModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPregnancyModal, setShowPregnancyModal] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<AvatarType | null>(null);

  const [tempActivity, setTempActivity] = useState<string | null>(null);
  const [tempHealthHistory, setTempHealthHistory] = useState<string | null>(null);
  const [tempBirthdate, setTempBirthdate] = useState<string | null>(null);
  const [tempPhotoOption, setTempPhotoOption] = useState<string | null>(null);

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

  const handleSelectPhotoOption = (value: string) => {
    if (value === "avatar") {
      setModalVisible(true);
    } else if (value === "hapus") {
      setPhotoOption(null);
      setCurrentAvatar(null);
      setSelectedAvatar(null);
    }
  };

  const handleSubmit = async () => {
    if (
      !height ||
      !weight ||
      !pregnancyMonth ||
      !pregnancyDay ||
      !activity ||
      !healthHistory ||
      !birthdate
    ) {
      Alert.alert("Error", "Mohon lengkapi semua data terlebih dahulu");
      return;
    }

    try {
      if (!token) {
        Alert.alert("Error", "Autentikasi gagal. Silakan login ulang.");
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "LoginRegisterScreen" }],
          })
        );
        return;
      }

      const profileData = {
        height: parseFloat(height),
        weight: parseFloat(weight),
        pregnancyMonth: parseInt(pregnancyMonth),
        pregnancyDay: parseInt(pregnancyDay),
        activity,
        healthHistory,
        birthdate,
        photoOption: photoOption?.id || null,
      };

      await dispatch(completeUserProfile(profileData) as any);

      Alert.alert("Sukses", "Profil berhasil disimpan!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        })
      );
    } catch (error) {
      console.error("Error submit profile:", error);
      Alert.alert("Gagal", "Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  const isButtonDisabled =
    !height ||
    !weight ||
    !pregnancyMonth ||
    !pregnancyDay ||
    !activity ||
    !healthHistory ||
    !birthdate ||
    !photoOption;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Isi Data Diri</Text>
      </View>

      <View style={styles.profileImage}>
        <Image
          source={
            photoOption?.source ||
            require("../../assets/avatar/default-avatar.png")
          }
          style={styles.image}
        />
        <TouchableOpacity onPress={() => setShowPhotoModal(true)}>
          <Text style={styles.imageText}>Tambahkan foto profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TextInput
          placeholder="Tinggi Badan (cm) *"
          style={styles.inputHalf}
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />
        <TextInput
          placeholder="Berat Badan (kg) *"
          style={styles.inputHalf}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <TouchableOpacity style={styles.select} onPress={() => setShowDateModal(true)}>
        <Text style={styles.selectText}>{birthdate || "Usia*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.select} onPress={() => setShowActivityModal(true)}>
        <Text style={styles.selectText}>{activity || "Aktivitas*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.select} onPress={() => setShowPregnancyModal(true)}>
        <Text style={styles.selectText}>
          {pregnancyMonth && pregnancyDay
            ? `${pregnancyMonth} Bulan ${pregnancyDay} Hari`
            : "Usia Kehamilan*"}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.select}
        onPress={() => setShowHealthHistoryModal(true)}
      >
        <Text style={styles.selectText}>{healthHistory || "Riwayat Kesehatan*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { opacity: isButtonDisabled ? 0.5 : 1 }]}
        onPress={handleSubmit}
        disabled={isButtonDisabled}
      >
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>

      {/* Avatar Modal */}
      <AvatarModal
        visible={modalVisible}
        selectedAvatar={selectedAvatar}
        onSelect={handleSelectAvatar}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAvatar}
        avatarList={avatarList}
        currentAvatar={currentAvatar}
      />

      {/* Bottom Sheets */}
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
        showContinueButton={true}
        onContinue={() => {
          if (tempPhotoOption) handleSelectPhotoOption(tempPhotoOption);
          setShowPhotoModal(false);
        }}
      />

      <BottomSheet
        visible={showDateModal}
        title="Usia"
        options={[]}
        selectedOption={tempBirthdate || birthdate}
        onSelect={setTempBirthdate}
        onClose={() => setShowDateModal(false)}
        type="date"
        showContinueButton={true}
        onContinue={() => {
          if (tempBirthdate) setBirthdate(tempBirthdate);
          setShowDateModal(false);
        }}
      />

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
        showContinueButton={true}
        onContinue={() => {
          if (tempActivity) setActivity(tempActivity);
          setShowActivityModal(false);
        }}
      />

      <BottomSheet
        visible={showPregnancyModal}
        title="Usia Kehamilan"
        type="custom"
        options={[]}
        selectedOption={null}
        onSelect={() => { }}
        onClose={() => setShowPregnancyModal(false)}
        showContinueButton={true}
        onContinue={() => setShowPregnancyModal(false)}
      >
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={{ marginBottom: 8 }}>Masukkan Bulan</Text>
          <TextInput
            placeholder="Misalnya: 1 - 9"
            keyboardType="numeric"
            style={styles.inputHalf}
            value={pregnancyMonth}
            onChangeText={setPregnancyMonth}
          />
          <Text style={{ marginVertical: 8 }}>Masukkan Hari</Text>
          <TextInput
            placeholder="Misalnya: 1 - 30"
            keyboardType="numeric"
            style={styles.inputHalf}
            value={pregnancyDay}
            onChangeText={setPregnancyDay}
          />
        </View>
      </BottomSheet>

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
        showContinueButton={true}
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