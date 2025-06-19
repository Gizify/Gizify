import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { deleteAccount } from "../redux/actions/authAction";

const DeleteAccountScreen = () => {
  const [confirmationText, setConfirmationText] = useState("");
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const navigation = useNavigation();
  const token = useSelector((state: any) => state.auth.token);

  const dispatch = useDispatch();

  // Cek apakah teks yang dimasukkan sesuai dengan kalimat konfirmasi
  const handleTextChange = (text: any) => {
    setConfirmationText(text);
    if (text === "Saya ingin menghapus akun saya") {
      setIsConfirmEnabled(true);
    } else {
      setIsConfirmEnabled(false);
    }
  };

  const handleDeleteAccount = () => {
    if (confirmationText !== "Saya ingin menghapus akun saya") {
      Alert.alert("Error", "Teks konfirmasi tidak sesuai.");
      return;
    }

    Alert.alert("Konfirmasi Penghapusan Akun", "Apakah Anda yakin ingin menghapus akun Anda? Tindakan ini tidak dapat dibatalkan.", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus Akun",
        onPress: async () => {
          try {
            await dispatch(deleteAccount(token) as any);
            navigation.reset({
              index: 0,
              routes: [{ name: "AuthStack" }] as any,
            });
          } catch (err) {
            Alert.alert("Gagal", "Gagal menambahkan konsumsi harian.");
          }
        },
      },
    ]);
  };

  const openPrivacyPolicy = () => {
    Linking.openURL("https://kebijakan-privasi-gizify.vercel.app/");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kelola Akun</Text>
      </View>
      <View style={styles.containerIn}>
        <Text style={styles.headerText}>Hapus Akun Anda</Text>
        <Text style={styles.description}>Menghapus akun Anda akan menghapus semua data pribadi Anda dari aplikasi. Pastikan Anda yakin sebelum melanjutkan.</Text>
        <Text style={styles.description}>Ketik 'Saya ingin menghapus akun saya' untuk mengonfirmasi</Text>

        <TextInput style={styles.input} value={confirmationText} onChangeText={handleTextChange} />
        <Button title="Hapus Akun" onPress={handleDeleteAccount} disabled={!isConfirmEnabled} color="red" />
        <Text style={styles.link} onPress={openPrivacyPolicy}>
          Baca kebijakan privasi kami
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  containerIn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 36,
    gap: 10,
    paddingVertical: 22,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#555",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    width: "80%",
    marginBottom: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});

export default DeleteAccountScreen;
