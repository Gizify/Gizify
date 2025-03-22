import React from "react";
import { View, Text, Modal, TouchableOpacity, Image, StyleSheet } from "react-native";

interface PopupModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon: any;
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
}

const PopupModal: React.FC<PopupModalProps> = ({
  visible,
  onClose,
  onConfirm,
  icon,
  title,
  message,
  cancelText = "Batal",
  confirmText = "Ya",
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Ikon */}
          <Image source={icon} style={styles.icon} />
          
          {/* Judul */}
          <Text style={styles.title}>{title}</Text>
          
          {/* Pesan */}
          <Text style={styles.message}>{message}</Text>
          
          {/* Tombol */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  message: {
    textAlign: "center",
    color: "#666",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  confirmButton: {
    backgroundColor: "#008080",
  },
  cancelText: {
    color: "#666",
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default PopupModal;


// Contoh Penggunaan

// const ExampleScreen = () => {
//   const [modalType, setModalType] = useState<"logout" | "confirm" | "delete" | null>(null);

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Button title="Logout" onPress={() => setModalType("logout")} />
//       <Button title="Konfirmasi" onPress={() => setModalType("confirm")} />
//       <Button title="Hapus" onPress={() => setModalType("delete")} />

//       {/* Logout Popup */}
//       <PopupModal
//         visible={modalType === "logout"}
//         onClose={() => setModalType(null)}
//         onConfirm={() => console.log("Keluar dari aplikasi")}
//         icon={Icons.logout}
//         title="Keluar"
//         message="Apakah Anda ingin keluar dari aplikasi?"
//         cancelText="Tidak"
//         confirmText="Ya"
//       />

//       {/* Konfirmasi Popup */}
//       <PopupModal
//         visible={modalType === "confirm"}
//         onClose={() => setModalType(null)}
//         onConfirm={() => console.log("Data dikonfirmasi")}
//         icon={Icons.warning}
//         title="Konfirmasi"
//         message="Apakah data yang Anda masukkan sudah benar?"
//         cancelText="Periksa lagi"
//         confirmText="Ya, benar"
//       />

//       {/* Hapus Popup */}
//       <PopupModal
//         visible={modalType === "delete"}
//         onClose={() => setModalType(null)}
//         onConfirm={() => console.log("Anggota dihapus")}
//         icon={Icons.delete}
//         title="Hapus"
//         message="Apakah Anda ingin menghapus anggota?"
//         cancelText="Tidak"
//         confirmText="Ya"
//       />
//     </View>
//   );
// };

// export default ExampleScreen;