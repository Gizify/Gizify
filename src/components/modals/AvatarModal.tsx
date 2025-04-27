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
        setCanConfirm(selectedAvatar !== null && selectedAvatar !== currentAvatar);
    }, [selectedAvatar, currentAvatar]);

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Pilih Avatar</Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeText}>X Kembali</Text>
                        </Pressable>
                    </View>

                    {/* Avatar List */}
                    <FlatList
                        data={avatarList}
                        numColumns={3}
                        keyExtractor={(_, index) => index.toString()}
                        contentContainerStyle={styles.avatarGrid}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.avatarWrapper}
                                onPress={() => onSelect(item)}
                                activeOpacity={0.8}
                            >
                                <AvatarOption
                                    image={item}
                                    selected={selectedAvatar === item}
                                    onPress={() => onSelect(item)}
                                />
                                {selectedAvatar === item && (
                                    <View style={styles.checkmarkOverlay}>
                                        <Ionicons name="checkmark-circle" size={36} color="#2C7A7B" />
                                    </View>
                                )}
                            </TouchableOpacity>
                        )}
                    />

                    {/* Button Pilih */}
                    <TouchableOpacity
                        style={[styles.selectButton, !canConfirm && styles.selectButtonDisabled]}
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
        padding: 8,
    },
    closeText: {
        fontSize: 16,
        color: "#666",
    },
    avatarGrid: {
        alignItems: "center",
        paddingBottom: 24,
    },
    avatarWrapper: {
        position: "relative",
        margin: 8,
    },
    checkmarkOverlay: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -18 }, { translateY: -18 }],
        zIndex: 1,
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