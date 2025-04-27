import React, { useState } from "react";
import { View } from "react-native";
import AvatarModal from "../components/modals/AvatarModal";
import Button from "../components/form/Button";
import { avatarList, AvatarType } from "../utils/avatars"; // Mengimpor avatarList

const ExampleScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<AvatarType | null>(null); // Avatar yang sedang aktif

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    if (selectedAvatar) {
      console.log("Avatar dipilih:", selectedAvatar);
      setCurrentAvatar(selectedAvatar); // Update avatar yang sedang aktif
      setModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pilih Avatar" onPress={handleOpenModal} />

      <AvatarModal
        visible={modalVisible}
        selectedAvatar={selectedAvatar}
        onSelect={setSelectedAvatar}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        avatarList={avatarList}
        currentAvatar={currentAvatar} // Kirim currentAvatar ke modal
      />
    </View>
  );
};

export default ExampleScreen;