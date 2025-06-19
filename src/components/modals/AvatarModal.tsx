import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Pressable,
} from "react-native";
import AvatarOption from "../common/AvatarOption";
import { AvatarType } from "../../utils/avatars";
import { Ionicons } from "@expo/vector-icons";

type AvatarModalProps = {
    visible: boolean;
    selectedAvatar: AvatarType | null;
    onSelect: (avatar: AvatarType) => void;
    onClose: () => void;
    onConfirm: () => void;
    avatarList: AvatarType[];
    currentAvatar: AvatarType | null;
};

const AvatarModal: React.FC<AvatarModalProps> = ({
    visible,
    selectedAvatar,
    onSelect,
    onClose,
    onConfirm,
    avatarList,
    currentAvatar,
}) => {
    const [canConfirm, setCanConfirm] = useState(false);

    useEffect(() => {
        setCanConfirm(
            selectedAvatar !== null &&
            selectedAvatar.id !== currentAvatar?.id
        );
    }, [selectedAvatar, currentAvatar]);

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Pilih Avatar</Text>
                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [
                                styles.closeButton,
                                pressed && styles.closeButtonPressed,
                            ]}
                        >
                            <Ionicons name="close" size={20} color="#333" style={styles.icon} />
                            <Text style={styles.closeText}>Kembali</Text>
                        </Pressable>
                    </View>

                    {/* Garis pemisah */}
                    <View style={styles.separator} />

                    {/* Daftar avatar */}
                    <FlatList
                        data={avatarList}
                        numColumns={3}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.avatarGrid}
                        columnWrapperStyle={{ justifyContent: "space-between" }}
                        renderItem={({ item }) => (
                            <AvatarOption
                                image={item.source}
                                selected={selectedAvatar?.id === item.id}
                                onPress={() => onSelect(item)}
                            />
                        )}
                    />

                    {/* Tombol konfirmasi */}
                    <TouchableOpacity
                        style={[
                            styles.selectButton,
                            !canConfirm && styles.selectButtonDisabled,
                        ]}
                        onPress={onConfirm}
                        disabled={!canConfirm}
                    >
                        <Text style={styles.selectButtonText}>Pilih</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "#00000088",
    },
    modalContainer: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 16,
        paddingBottom: 32,
        paddingHorizontal: 24,
        maxHeight: "90%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    closeButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        justifyContent: "center",
    },
    closeButtonPressed: {
        borderColor: "green",
        backgroundColor: "#e6f5ea",
    },
    icon: {
        marginRight: 4,
    },
    closeText: {
        fontSize: 16,
        color: "#666",
    },
    separator: {
        height: 1,
        backgroundColor: "#ddd",
        marginVertical: 5,
    },
    avatarGrid: {
        justifyContent: "center",
        paddingVertical: 8,
        paddingBottom: 16,
    },
    selectButton: {
        backgroundColor: "#2C7A7B",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 8,
    },
    selectButtonDisabled: {
        backgroundColor: "#B2B2B2",
    },
    selectButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AvatarModal;