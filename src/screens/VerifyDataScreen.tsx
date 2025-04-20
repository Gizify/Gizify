import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "../components/modals/BottomSheet";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { completeUserProfile } from "../redux/actions/authAction";

const VerifyDataScreen = () => {
  const navigation = useNavigation();

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [gender, setGender] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [birthdate, setBirthdate] = useState<string | null>(null);
  const [photoOption, setPhotoOption] = useState<string | null>(null);

  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const genderOptions = [
    { id: "Laki-Laki", label: "Laki-Laki" },
    { id: "Perempuan", label: "Perempuan" },
  ];

  const activityOptions = [
    { id: "Ringan", label: "Ringan" },
    { id: "Sedang", label: "Sedang" },
    { id: "Berat", label: "Berat" },
  ];

  const goalOptions = [
    { id: "Menjaga Berat Badan", label: "Menjaga Berat Badan" },
    { id: "Membangun massa otot", label: "Membangun massa otot" },
  ];

  const photoOptions = [
    { id: "avatar", label: "Pilih dari avatar yang tersedia" },
    { id: "gallery", label: "Pilih dari galeri" },
    { id: "camera", label: "Ambil foto" },
    { id: "hapus", label: "Hapus gambar saat ini" },
  ];

  const handleSubmit = async () => {
    if (!height || !weight || !gender || !activity || !goal || !birthdate) {
      Alert.alert("Error", "Mohon lengkapi semua data terlebih dahulu");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("authToken");

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
        gender,
        activity,
        goal: "maintain",
        birthdate,
        photoOption,
      };

      const response = await completeUserProfile(profileData);

      console.log("Profile berhasil dikirim:", response);

      Alert.alert("Sukses", "Profil berhasil disimpan!");
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Beranda" }],
        })
      );
    } catch (error) {
      console.error("Error submit profile:", error);
      Alert.alert("Gagal", "Gagal menyimpan data. Silakan coba lagi.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Isi Data Diri</Text>
      </View>

      <TouchableOpacity style={styles.profileImage} onPress={() => setShowPhotoModal(true)}>
        <Image source={require("../../assets/avatar/avatar1.png")} style={styles.image} />
        <Text style={styles.imageText}>Tambahkan foto profile</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TextInput placeholder="Tinggi Badan (cm) *" style={styles.inputHalf} keyboardType="numeric" value={height} onChangeText={setHeight} />
        <TextInput placeholder="Berat Badan (kg) *" style={styles.inputHalf} keyboardType="numeric" value={weight} onChangeText={setWeight} />
      </View>

      <TouchableOpacity style={styles.select} onPress={() => setShowActivityModal(true)}>
        <Text style={styles.selectText}>{activity || "Aktivitas*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.select} onPress={() => setShowGenderModal(true)}>
        <Text style={styles.selectText}>{gender || "Jenis Kelamin*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.select} onPress={() => setShowDateModal(true)}>
        <Text style={styles.selectText}>{birthdate || "Usia*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.select} onPress={() => setShowGoalModal(true)}>
        <Text style={styles.selectText}>{goal || "Tujuan*"}</Text>
        <Ionicons name="chevron-forward" size={20} color="#777" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Lanjut</Text>
      </TouchableOpacity>

      {/* BottomSheet Modals */}
      <BottomSheet
        visible={showGenderModal}
        title="Jenis kelamin"
        options={genderOptions}
        selectedOption={gender}
        onSelect={(value) => {
          setGender(value);
          setShowGenderModal(false);
        }}
        onClose={() => setShowGenderModal(false)}
        type="option"
      />

      <BottomSheet
        visible={showActivityModal}
        title="Aktivitas"
        options={activityOptions}
        selectedOption={activity}
        onSelect={(value) => {
          setActivity(value);
          setShowActivityModal(false);
        }}
        onClose={() => setShowActivityModal(false)}
        type="option"
      />

      <BottomSheet
        visible={showGoalModal}
        title="Tujuan"
        options={goalOptions}
        selectedOption={goal}
        onSelect={(value) => {
          setGoal(value);
          setShowGoalModal(false);
        }}
        onClose={() => setShowGoalModal(false)}
        type="option"
      />

      <BottomSheet
        visible={showDateModal}
        title="Usia"
        options={[]}
        selectedOption={birthdate}
        onSelect={(value) => {
          setBirthdate(value);
          setShowDateModal(false);
        }}
        onClose={() => setShowDateModal(false)}
        type="date"
      />

      <BottomSheet
        visible={showPhotoModal}
        title="Foto profile"
        options={photoOptions}
        selectedOption={photoOption}
        onSelect={(value) => {
          setPhotoOption(value);
          setShowPhotoModal(false);
        }}
        onClose={() => setShowPhotoModal(false)}
        type="option"
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
