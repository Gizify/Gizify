import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import AvatarModal from "../components/modals/AvatarModal";
import Button from "../components/form/Button";
import { avatarList, AvatarType } from "../utils/avatars";

const ExampleScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarType | null>(null);
  const [currentAvatar, setCurrentAvatar] = useState<AvatarType | null>(null);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedAvatar(currentAvatar); // Reset selectedAvatar ke yang sedang aktif
  };

  const handleSelectAvatar = (avatar: AvatarType) => {
    setSelectedAvatar(avatar);
  };

  const handleConfirm = () => {
    if (selectedAvatar) {
      console.log("Avatar dipilih:", selectedAvatar);
      setCurrentAvatar(selectedAvatar);
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Pilih Avatar" onPress={handleOpenModal} />

      <AvatarModal
        visible={modalVisible}
        selectedAvatar={selectedAvatar}
        onSelect={handleSelectAvatar}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        avatarList={avatarList}
        currentAvatar={currentAvatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ExampleScreen;
