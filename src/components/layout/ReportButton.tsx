import React, { useState } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, Alert } from "react-native";
import colors from "../../styles/colors";
import * as MailComposer from "expo-mail-composer";

export default function ReportButton({ reportedItem }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    if (!reason.trim()) {
      Alert.alert("Oops", "Alasan laporan tidak boleh kosong.");
      return;
    }

    try {
      await MailComposer.composeAsync({
        recipients: ["gizify.report@gmail.com"],
        subject: "Laporan Konten dari Aplikasi Gizify",
        body: `Item yang dilaporkan: ${reportedItem || "Tidak ditentukan"}\n\nAlasan: ${reason}`,
      });

      Alert.alert("Terima kasih", "Laporan kamu telah dikirim.");
      setModalVisible(false);
      setReason("");
    } catch (error) {
      Alert.alert("Gagal mengirim", "Terjadi kesalahan saat mengirim email.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.reportButton}>
        <Text style={styles.reportText}>Laporkan Konten</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Laporkan Konten</Text>
            <TextInput placeholder="Jelaskan alasan laporan..." multiline value={reason} onChangeText={setReason} style={styles.input} />
            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Kirim</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Batal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  reportButton: {
    padding: 10,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    alignItems: "center",
  },
  reportText: { color: "#fff", fontWeight: "bold" },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000aa",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  submitText: { color: "#fff", fontWeight: "bold" },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
  },
  cancelText: { fontWeight: "bold" },
});
